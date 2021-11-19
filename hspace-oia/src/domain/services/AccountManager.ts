import { IPasswordManager } from "../../application/security/IPasswordManager";
import { Account, EAccountType } from "../models/Account";
import { IEmailService } from "../../infrastructure/service/contract/IEmailService";
import { plainToClass } from "class-transformer";
import {
  IAccountManager,
  IAccountRepository,
  IAccountSettingRepository,
  ICollaboratorRepository,
  IDefaultAccountSettingRepository,
  IEmployeeRepository,
  IResetTokenRepository
} from "./contract";
import { Employee } from "../models/Employee";
import { Collaborator } from "../models/Collaborator";
import { Between, ILike, IsNull, Not } from "typeorm";
import constants from "../../infrastructure/config/constants";
import appConstants from "../../infrastructure/config/constants";
import { ResetToken, ResetTokenStatus } from "../models/ResetToken";
import { BadRequestError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import logger from "../../infrastructure/logger";
import { v4 as uuid } from "uuid";
import { EmailTemplateUtilities } from "../utils/EmailTemplateUtilities";
import { StringUtilities } from "../utils/StringUtilities";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";

export class AccountManager implements IAccountManager {
  constructor(
    private passwordManager: IPasswordManager,
    private emailService: IEmailService,
    private employeeRepository: IEmployeeRepository,
    private collaboratorRepository: ICollaboratorRepository,
    private accountRepository: IAccountRepository,
    private resetTokenRepository: IResetTokenRepository,
    private accountSettingRepository: IAccountSettingRepository,
    private defaultAccountSettingRepository: IDefaultAccountSettingRepository,
  ) {
  }

  public async createAccount(type: EAccountType, id: number, currentAccount: Account): Promise<void> {
    let creatingAccount = new Account();
    creatingAccount.type = type;
    creatingAccount.employeeId = type === EAccountType.EMPLOYEE ? id : null;
    creatingAccount.collaboratorId = type === EAccountType.COLLABORATOR ? id : null;
    creatingAccount.isActive = true;
    creatingAccount.createdBy = currentAccount;
    creatingAccount.updatedBy = currentAccount;
    creatingAccount.accountAccountGroups = [];
    creatingAccount = await this.generateCredential(creatingAccount);
    await this.accountRepository.save(creatingAccount);
    await this.sendCredential(creatingAccount);
  }

  public async createAccountByEmployee(employee: Employee, currentAccount: Account): Promise<void> {
    this.createAccount(EAccountType.EMPLOYEE, employee.id, currentAccount);
  }

  public async createAccountByCollaborator(collaborator: Collaborator, currentAccount: Account): Promise<void> {
    this.createAccount(EAccountType.COLLABORATOR, collaborator.id, currentAccount);
  }

  private async getAccountByConditions(conditions: any): Promise<Account> {
    return await this.accountRepository.findOneOrFail({
      where: conditions,
      relations: [
        "accountAccountGroups",
        "employee",
        "collaborator",
        "createdBy",
        "updatedBy",
        "accountAccountGroups.updatedBy",
        "accountAccountGroups.createdBy",
        "accountAccountGroups.accountGroup",
      ],
    });
  }

  public async updateAccountNameByEmployee(beforeUpdateEmployee: Employee, afterUpdatedEmployee: Employee): Promise<void> {
    let updatingAccount: Account = await this.getAccountByConditions({ employeeId: afterUpdatedEmployee.id });
    const identifyName = updatingAccount.identityName;
    if (beforeUpdateEmployee.fullName !== afterUpdatedEmployee.fullName) {
      // update display name, identity name, code
      updatingAccount = await this.generateNameForAccount(updatingAccount);
    }
    if (identifyName !== updatingAccount.identityName) {
      const { html, text, subject } = EmailTemplateUtilities.emailForChangeIdentityName(updatingAccount.identityName);
      await this.emailService.send([afterUpdatedEmployee.email], [], [], {
        html, subject, text
      });
    }
    await this.accountRepository.save(updatingAccount);
  }

  public async updateAccountNameByCollaborator(beforeUpdateCollaborator: Collaborator, afterUpdatedCollaborator: Collaborator): Promise<void> {
    let updatingAccount = await this.getAccountByConditions({ collaboratorId: afterUpdatedCollaborator.id });
    const identifyName = updatingAccount.identityName;
    if (beforeUpdateCollaborator.fullName !== afterUpdatedCollaborator.fullName) {
      // update display name, identity name, code
      updatingAccount = await this.generateNameForAccount(updatingAccount);
    }
    if (beforeUpdateCollaborator.companyId !== afterUpdatedCollaborator.companyId) {
      // only update display name
      const displayNamePrefix: string = afterUpdatedCollaborator?.company?.valueCode;
      updatingAccount.displayName = displayNamePrefix ? `${displayNamePrefix}-${updatingAccount.code}` : null;
    }
    if (beforeUpdateCollaborator.phone !== afterUpdatedCollaborator.phone) {
      // only update identity name
      updatingAccount.identityName = afterUpdatedCollaborator.phone;
    }
    if (identifyName !== updatingAccount.identityName) {
      const { html, text, subject } = EmailTemplateUtilities.emailForChangeIdentityName(updatingAccount.identityName);
      await this.emailService.send([afterUpdatedCollaborator.email], [], [], {
        html, subject, text
      });
    }
    await this.accountRepository.save(updatingAccount);
  }

  public async generateNameForAccount(payload: any): Promise<Account> {
    const parsedAccount: Account = plainToClass(Account, payload);
    const accountInfo: Collaborator | Employee | any = await this.getAccountInfo(parsedAccount);
    const fullName: string = accountInfo.fullName;
    const phone: string = accountInfo.phone;
    parsedAccount.code = await this.generateCode(fullName);
    parsedAccount.identityName = parsedAccount.type === EAccountType.COLLABORATOR ? phone : parsedAccount.code;

    const displayNamePrefix: string = parsedAccount.type === EAccountType.COLLABORATOR ? accountInfo?.company?.valueCode : appConstants.AccountManager.displayNamePrefixForEmployee;
    parsedAccount.displayName = displayNamePrefix ? `${displayNamePrefix}-${parsedAccount.code}` : null;
    return parsedAccount;
  }

  public async findResetTokenByIdentityName(identityName: string): Promise<ResetToken> {
    return await this.resetTokenRepository.findOneOrFail({
      where: { identityName: ILike(identityName), status: ResetTokenStatus.NEW },
      relations: [
        "account",
      ],
    });
  }

  public async generateCredential(payload: any): Promise<Account> {
    const parsedAccount: Account = await this.generateNameForAccount(payload);
    parsedAccount.password = this.passwordManager.generate();
    parsedAccount.hash = await this.passwordManager.hashPassword(parsedAccount.password);

    return parsedAccount;
  }

  public async sendCredential(account: Account) {
    const { email } = await this.getAccountInfo(account);
    if (account.type === EAccountType.EMPLOYEE) {
      const { html, text, subject } = EmailTemplateUtilities.emailForEmployeeAccount(account.identityName, account.password, process.env.SERVER_URL);
      await this.emailService.send([email], [], [], { html, subject, text });
    } else {
      const { html, text, subject } = EmailTemplateUtilities.emailForCollaboratorAccount(account.identityName, account.password);
      await this.emailService.send([email], [], [], { html, subject, text });
    }
  }

  public async findAccountByIdentityName(accountType: EAccountType, identityName: string): Promise<any> {
    const account = await this.accountRepository.findOne({
      relations: ["employee", "collaborator"],
      where: (qb: SelectQueryBuilder<unknown>) => {
        qb.where({
          isActive: true,
          ...{ identityName: ILike(identityName) },
          ...(accountType === EAccountType.EMPLOYEE ? { employeeId: Not(IsNull()) } : {}),
          ...(accountType === EAccountType.COLLABORATOR ? { collaboratorId: Not(IsNull()) } : {})
        });
      },
    }) as Readonly<any>;
    if (!account) {
      throw new BadRequestError("Account is not found.", ErrorCode.Account.AccountForgotPasswordNotFound);
    }
    return account;
  }

  public async checkCurrentPassword(password: string, account: Account) {
    return await this.passwordManager.checkPassword(password, account.hash);
  }

  public async getHashNewPassword(newPassword: string) {
    return await this.passwordManager.hashPassword(newPassword);
  }

  public async getBasicCredentialInfo(account: Account) {
    return {
      identityName: account.identityName,
      displayName: account.displayName,
    };
  }

  public async generateCodeResetToken() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  public async generateSignResetToken() {
    return uuid().replace(/-/g, "");
  }

  public async buildSeedToHashResetToken(code: string, email: string, identityName: string, expiredAt: Date, sign: string) {
    const arr = [email.toLocaleLowerCase(), identityName.toLocaleLowerCase(), code, expiredAt.toISOString(), sign];
    return arr.join("-");
  }

  private async buildHashResetToken(code: string, email: string, identityName: string, expiredAt: Date, sign: string) {
    const seed = await this.buildSeedToHashResetToken(code, email, identityName, expiredAt, sign);
    return await this.passwordManager.hashPassword(seed);
  }

  private async checkSumResetToken(code: string, email: string, identityName: string, expiredAt: Date, sign: string, expectedHash: string) {
    const seed = await this.buildSeedToHashResetToken(code, email, identityName, expiredAt, sign);
    return await this.passwordManager.checkPassword(seed, expectedHash);
  }

  private async getDateNow() {
    return new Date();
  }

  private async generateExpiredAt() {
    const expiredAt = await this.getDateNow();
    expiredAt.setMinutes(expiredAt.getMinutes() + constants.AccountManager.forgotPassExpiredInMinutes);
    return expiredAt;
  }

  private async sendEmailForgotPassword(email: string, code: string) {
    const { html, text, subject } = EmailTemplateUtilities.emailForForgotPassword(code);
    await this.emailService.send([email], [], [], { html, subject, text });
  }

  private async getAccountInfo(account: Account): Promise<Collaborator | Employee> {
    let accountInfo: Collaborator | Employee;
    switch (account.type) {
      case EAccountType.EMPLOYEE: {
        const result = await this.employeeRepository.findOneOrFail({
          where: { id: account.employeeId },
          relations: [
            "department"
          ],
        });
        accountInfo = plainToClass(Employee, result) as Employee;
        break;
      }
      case EAccountType.COLLABORATOR: {
        const result = await this.collaboratorRepository.findOneOrFail({
          where: { id: account.collaboratorId },
          relations: [
            "company"
          ],
        });
        accountInfo = plainToClass(Collaborator, result) as Collaborator;
        break;
      }
      default: {
        const result = await this.employeeRepository.findOneOrFail({
          where: { id: account.employeeId },
          relations: [
            "department"
          ],
        });
        accountInfo = plainToClass(Employee, result) as Employee;
        break;
      }
    }
    return accountInfo;
  }

  public async generateCode(fullName: string): Promise<string> {
    let code: string;
    const convertedString = StringUtilities.removeAccents(fullName);
    const lowerNameString: string[] = convertedString.split(" ").map(item => item.toLocaleLowerCase());
    if (lowerNameString.length === 1) {
      code = lowerNameString[0];
    } else {
      const name = lowerNameString.pop();
      const fistCharacterNameString = lowerNameString.map(item => item.charAt(0)).join("");
      code = [name, fistCharacterNameString].join(".");
    }

    const allExistedCode: any[] = await this.accountRepository.find({
      where: { code: ILike(code + "%") },
      order: {
        createdAt: "DESC"
      }
    });
    if (allExistedCode?.length) {
      const allExistedAccountsWithCode: Account[] = plainToClass(Account, allExistedCode) as Account[];
      let latestAccountWithCode: Account = null;
      if (allExistedAccountsWithCode.length) {
        latestAccountWithCode = allExistedAccountsWithCode[0];
        if (latestAccountWithCode.code.includes(".") && latestAccountWithCode.code.length > 2) {
          const codeArray = latestAccountWithCode.code.split(".");
          let codeNumber: any = codeArray[codeArray.length - 1];
          codeNumber = parseInt(codeNumber, 10);
          if (isNaN(codeNumber)) {
            code = `${code}.01`;
          } else {
            codeNumber = codeNumber + 1;
            code = `${code}.${codeNumber > 9 ? codeNumber : `0${codeNumber}`}`;
          }
        }
      }
    }
    return code;
  }

  private async countResetTokenByEmailInTime(email: string, minutes: number): Promise<number> {
    const createdFrom = await this.getDateNow();
    createdFrom.setMinutes(createdFrom.getMinutes() - minutes);
    const createdTo = await this.getDateNow();
    const query = {
      ...{ email: ILike(email) },
      ...{ createdAt: Between(createdFrom, createdTo) },
    };
    const [_, total] = await this.resetTokenRepository.findAndCount({
      where: query,
    });
    return total;
  }

  private async updateExpiredForgotPassword(email: string): Promise<void> {
    await this.resetTokenRepository.update({
      email: ILike(email),
      status: ResetTokenStatus.NEW
    }, { status: ResetTokenStatus.EXPIRED });
  }

  private async validateLimitCallAPI(email: string): Promise<void> {
    const limitCountCallAPI = constants.AccountManager.forgotPassCheckLimitCountCall;
    const minutesConfig = constants.AccountManager.forgotPassCheckLimitCallInMinutes;
    const numberCallAPI = await this.countResetTokenByEmailInTime(email, minutesConfig);
    if (numberCallAPI >= limitCountCallAPI) {
      logger.info(`Email [${email}] call many times forgot password countCall=${numberCallAPI} - limit=${limitCountCallAPI}`);
      throw new BadRequestError("Account Forgot Password Limit Call API", ErrorCode.Account.AccountForgotPasswordLimitCallAPI);
    }
  }

  private async validateExpired(expiredDate: Date): Promise<void> {
    if (expiredDate < await this.getDateNow()) {
      throw new BadRequestError("Account Forgot Password Expired", ErrorCode.Account.AccountForgotPasswordExpired);
    }
  }

  private async validateChecksum(restTokenData: ResetToken, code: string, sign: string): Promise<void> {
    const checkSum = await this.checkSumResetToken(code, restTokenData.email, restTokenData.identityName, restTokenData.expiredAt, sign, restTokenData.hash);
    if (!checkSum) {
      throw new BadRequestError("Account Forgot Password Invalid Code", ErrorCode.Account.AccountForgotPasswordCodeInvalid);
    }
  }

  public async validateConfirmForgotPassword(resetTokenData: ResetToken, code: string, sign: string): Promise<void> {
    await this.validateExpired(resetTokenData.expiredAt);
    await this.validateLimitCallAPI(resetTokenData.email);
    await this.validateChecksum(resetTokenData, code, sign);
  }

  private async createNewForgotPassword(accountId: number, email: string, identityName: string, hash: string, expiredAt: Date): Promise<void> {
    let resetToken = new ResetToken(accountId, email, identityName, hash, expiredAt);
    resetToken = Account.addAuditInfo(resetToken, accountId);
    await this.resetTokenRepository.save(resetToken);
  }

  public async createForgotPassword(account: Account, email: string, identityName: string) {
    const expiredAt = await this.generateExpiredAt();
    const sign = await this.generateSignResetToken();
    const code = await this.generateCodeResetToken();
    const hash = await this.buildHashResetToken(code, email, identityName, expiredAt, sign);

    await this.validateLimitCallAPI(email);
    await this.updateExpiredForgotPassword(email);
    await this.createNewForgotPassword(account.id, email, identityName, hash, expiredAt);
    this.sendEmailForgotPassword(email, code).then(res => {
      // send email async
    });

    return sign;
  }

  public async confirmForgotPassword(resetTokenData: ResetToken, newPassword: string) {
    const account = resetTokenData.account;
    await this.resetTokenRepository.update(resetTokenData.id, {
      status: ResetTokenStatus.SUCCESS,
      updatedBy: account.id,
    });
    const newPasswordHash = await this.getHashNewPassword(newPassword);
    return await this.accountRepository.update(account.id, {
      hash: newPasswordHash,
      updatedBy: account.id,
    });
  }

  public async createDefaultSettings(accountId: number): Promise<void> {
    const defaultSettings = await this.defaultAccountSettingRepository.find({
      select: ["id", "key", "folder", "isActive", "description", "data"],
      where: {
        isActive: true,
      }
    });

    for (const setting of defaultSettings) {
      await this.accountSettingRepository.save({
        key: setting.key,
        folder: setting.folder,
        isActive: true,
        data: setting.data,
        description: setting.description,
        accountId,
        createdBy: accountId,
        updatedBy: accountId,
      });
    }
  }
}
