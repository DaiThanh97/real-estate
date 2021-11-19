import { Account, EAccountType } from "../models/Account";
import { AccountAccountGroup } from "../models/AccountAccountGroup";
import { IAccountManager } from "./contract/IAccountManager";
import { Employee } from "../models/Employee";
import { Collaborator } from "../models/Collaborator";
import constants from "../../infrastructure/config/constants";
import * as uuid from "uuid";
import { StringUtilities } from "../utils/StringUtilities";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { IEmployeeRepository } from "../../domain/repositories/IEmployeeRepository";
import { ICollaboratorRepository } from "../../domain/repositories/ICollaboratorRepository";
import map from "lodash/map";
import { BadImplementationError } from "../exceptions/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { IAuth } from "../../application/tools/IAuth";

export class AccountManager implements IAccountManager {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly employeeRepository: IEmployeeRepository,
    private readonly collaboratorRepository: ICollaboratorRepository,
    private readonly auth: IAuth,
  ) {}

  private async createAccount(
    type: EAccountType,
    id: string,
    email: string,
    isActive: boolean,
    accountAccountGroups: { accountGroupId: string }[],
    currentAccount: Account,
  ): Promise<void> {
    const newId = uuid.v4();
    const now = new Date();

    const createdPayload = {
      type: type,
      accountAccountGroups:
        accountAccountGroups &&
        map(accountAccountGroups, (el: AccountAccountGroup) =>
          AccountAccountGroup.create(
            uuid.v4(),
            { accountGroupId: el.accountGroupId, accountId: newId },
            currentAccount,
            now,
          ),
        ),
      isActive: isActive,
    };

    const employeeId = type === EAccountType.EMPLOYEE ? id : null;
    const collaboratorId = type === EAccountType.COLLABORATOR ? id : null;

    const { code, displayName, identityName, password, connectedFirebaseAuthId } = await this.generateCredential(
      type,
      employeeId,
      collaboratorId,
      email,
    );

    const newAccount = Account.create(
      newId,
      {
        type,
        employeeId,
        collaboratorId,
        code,
        displayName,
        identityName,
        connectedFirebaseAuthId,
      },
      createdPayload,
      currentAccount,
      now,
    );

    await this.accountRepository.save(newAccount);

    // TODO implement send email for credential
  }

  public async createAccountByCollaborator(
    collaborator: Collaborator,
    accountInput: {
      isActive: boolean;
      accountAccountGroups: { accountGroupId: string }[];
    },
    currentAccount: Account,
  ): Promise<void> {
    this.createAccount(
      EAccountType.COLLABORATOR,
      collaborator.id,
      collaborator.email,
      accountInput.isActive,
      accountInput.accountAccountGroups,
      currentAccount,
    );
  }

  private async generateCredential(
    type: EAccountType,
    employeeId: string | null,
    collaboratorId: string | null,
    email: string,
  ): Promise<{
    code: string;
    identityName: string;
    displayName: string;
    password: string;
    connectedFirebaseAuthId: string;
  }> {
    const { code, identityName, displayName } = await this.generateNameForAccount(type, employeeId, collaboratorId);
    const password = Account.generatePassword();
    const { connectedFirebaseAuthId } = await this.createFirebaseAccount(email, password);
    return {
      code,
      identityName,
      displayName,
      password,
      connectedFirebaseAuthId,
    };
  }

  private async generateNameForAccount(
    type: EAccountType,
    employeeId: string | null,
    collaboratorId: string | null,
  ): Promise<{
    code: string;
    identityName: string;
    displayName: string;
  }> {
    const accountInfo: Collaborator | Employee | any = await this.getAccountInfo(type, employeeId, collaboratorId);
    const fullName: string = accountInfo.fullName;
    const phone: string = accountInfo.phone;
    const code = await this.generateCode(fullName);
    const identityName = type === EAccountType.COLLABORATOR ? phone : code;

    // TODO will update after input companyId in request is required
    // const displayNamePrefix: string =
    //   type === EAccountType.COLLABORATOR
    //     ? accountInfo?.company?.valueCode
    //     : constants.AccountManager.displayNamePrefixForEmployee;
    const displayNamePrefix = constants.AccountManager.displayNamePrefixForEmployee;

    const displayName = displayNamePrefix ? `${displayNamePrefix}-${code}` : null;
    return {
      code,
      identityName,
      displayName,
    };
  }

  private async getAccountInfo(
    type: EAccountType,
    employeeId: string | null,
    collaboratorId: string | null,
  ): Promise<Collaborator | Employee> {
    switch (type) {
      case EAccountType.EMPLOYEE: {
        if (!employeeId) {
          throw new BadImplementationError(`Create not found employee.`, ErrorCode.EntityNotFound);
        }
        return await this.employeeRepository.findById(employeeId);
      }
      case EAccountType.COLLABORATOR: {
        if (!collaboratorId) {
          throw new BadImplementationError(`Create not found collaborator.`, ErrorCode.EntityNotFound);
        }
        return await this.collaboratorRepository.findById(collaboratorId);
      }
    }
  }

  private async generateCode(fullName: string): Promise<string> {
    let code: string;
    const convertedString = StringUtilities.removeAccents(fullName);
    const lowerNameString: string[] = convertedString.split(" ").map((item) => item.toLocaleLowerCase());
    if (lowerNameString.length === 1) {
      code = lowerNameString[0];
    } else {
      const name = lowerNameString.pop();
      const fistCharacterNameString = lowerNameString.map((item) => item.charAt(0)).join("");
      code = [name, fistCharacterNameString].join(".");
    }

    const allExistedCode: Account[] = await this.accountRepository.getByCode(code);
    if (allExistedCode && allExistedCode.length > 0) {
      const latestAccountWithCode = allExistedCode[0];
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
    return code;
  }

  private async createFirebaseAccount(email: string, password: string): Promise<{ connectedFirebaseAuthId: string }> {
    const { uid } = await this.auth.createUser(email, password);
    return {
      connectedFirebaseAuthId: uid,
    };
  }
}
