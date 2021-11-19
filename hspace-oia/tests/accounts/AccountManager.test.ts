import "reflect-metadata";

import * as data from "./data.json";
import {
  IAccountRepository,
  IAccountSettingRepository,
  ICollaboratorRepository,
  IDefaultAccountSettingRepository,
  IEmployeeRepository,
  IResetTokenRepository
} from "../../src/domain/services/contract";
import { mock } from "jest-mock-extended";
import { Account } from "../../src/domain/models/Account";
import { plainToClass } from "class-transformer";
import { AccountManager } from "../../src/domain/services/AccountManager";
import PasswordManager from "../../src/infrastructure/security/PasswordManager";
import { IEmailService } from "../../src/infrastructure/service/contract/IEmailService";
import constants from "../../src/infrastructure/config/constants";
import { ResetToken } from "../../src/domain/models/ResetToken";
import { BadRequestError } from "../../src/infrastructure/error";
import { Employee } from "../../src/domain/models/Employee";

describe("AccountManager", () => {
  let mAccountRepository: IAccountRepository;
  let mEmailService: IEmailService;
  let mCollaboratorRepository: ICollaboratorRepository;
  let mEmployeeRepository: IEmployeeRepository;
  let mAccountManager: AccountManager;
  let mPasswordManager: PasswordManager;
  let mResetTokenRepository: IResetTokenRepository;
  let mAccountSettingRepository: IAccountSettingRepository;
  let mDefaultAccountSettingRepository: IDefaultAccountSettingRepository;

  beforeAll(() => {
    mAccountRepository = mock<IAccountRepository>();
    mResetTokenRepository = mock<IResetTokenRepository>();
    mCollaboratorRepository = mock<ICollaboratorRepository>();
    mEmployeeRepository = mock<IEmployeeRepository>();
    mPasswordManager = new PasswordManager();
    mEmailService = mock<IEmailService>();
    mAccountSettingRepository = mock<IAccountSettingRepository>();
    mDefaultAccountSettingRepository = mock<IDefaultAccountSettingRepository>();
    mAccountManager = new AccountManager(
      mPasswordManager, mEmailService, mEmployeeRepository,
      mCollaboratorRepository, mAccountRepository, mResetTokenRepository,
      mAccountSettingRepository, mDefaultAccountSettingRepository
    );
  });

  describe("generateCredential", () => {
    let mockGenerateNameForAccount: jest.Mock;
    beforeAll(() => {
      mockGenerateNameForAccount = jest.fn();
      mAccountManager.generateNameForAccount = mockGenerateNameForAccount;
    });

    test("should return ", async () => {
      mockGenerateNameForAccount.mockReturnValue({
        "employeeId": 1,
        "isActive": true,
        "collaboratorId": null,
        "type": "Employee"
      });

      const rv = await mAccountManager.generateCredential({
        "employeeId": 1,
        "isActive": true,
        "collaboratorId": null,
        "type": "Employee"
      });
      expect(rv.password).toBeDefined();
      expect(rv.hash).toBeDefined();

      const match = await mAccountManager.checkCurrentPassword(rv.password, rv);
      expect(match).toBe(true);

      const notMatch = await mAccountManager.checkCurrentPassword("abcxyz", rv);
      expect(notMatch).toBe(false);
    });
  });

  describe("generateCode", () => {
    let dto: Account;
    let mockAccountRepositoryFind: jest.Mock;
    let fullname: string;

    beforeAll(() => {
      dto = plainToClass(Account, data.accounts[0]);
      mockAccountRepositoryFind = jest.fn();
      mAccountRepository.find = mockAccountRepositoryFind;
      fullname = "Nguyễn Xuân Vĩnh";
    });

    test("should return a valid account code", async () => {
      mockAccountRepositoryFind.mockReturnValue(null);
      const rv = await mAccountManager.generateCode(fullname);
      expect(rv).toEqual("vinh.nx");
    });

    test("should return a valid account code with exist full name", async () => {
      mockAccountRepositoryFind.mockReturnValue([
        {
          id: 1,
          code: "vinh.nx"
        }
      ]);
      const rv = await mAccountManager.generateCode(fullname);
      expect(rv).toEqual("vinh.nx.01");
    });

    test("should return a valid account code with exist other full name", async () => {
      mockAccountRepositoryFind.mockReturnValue([
        {
          id: 2,
          code: "vinh.nx.01"
        },
        {
          id: 1,
          code: "vinh.nx"
        },
      ]);
      const rv = await mAccountManager.generateCode(fullname);
      expect(rv).toEqual("vinh.nx.02");
    });
  });

  describe("checkCurrentPassword", () => {
    let dto: Account;
    let mockPasswordManagerCheckPassword: jest.Mock;

    beforeAll(() => {
      dto = plainToClass(Account, data.accounts[0]);
      mockPasswordManagerCheckPassword = jest.fn();
      mPasswordManager.checkPassword = mockPasswordManagerCheckPassword;
    });

    test("should invalid current password", async () => {
      mockPasswordManagerCheckPassword.mockReturnValue(false);
      const password = "123456";
      const rv = await mAccountManager.checkCurrentPassword(password, dto);
      expect(rv).toEqual(false);
    });

    test("should valid current password", async () => {
      mockPasswordManagerCheckPassword.mockReturnValue(true);
      const password = "Pa$$Word";
      const rv = await mAccountManager.checkCurrentPassword(password, dto);
      expect(rv).toEqual(true);
    });
  });

  describe("getHashNewPassword", () => {
    let dto: Account;
    let mockPasswordManagerHashPassword: jest.Mock;

    beforeAll(() => {
      dto = plainToClass(Account, data.accounts[0]);
      mockPasswordManagerHashPassword = jest.fn();
      mPasswordManager.hashPassword = mockPasswordManagerHashPassword;
    });

    test("should return new hash", async () => {
      mockPasswordManagerHashPassword.mockReturnValue("$10$et004WSj2abGMt/4NZJZXegJXlu3KjpbEgZ6dsxezp0fqcSgnUHkK");
      const newPassword = "123456";
      const rv = await mAccountManager.getHashNewPassword(newPassword);
      expect(rv).toEqual(dto.hash);
    });

    test("should wrong pattern with new password format is numbers", async () => {
      const newPassword = "123456";
      expect(constants.AccountManager.regExpPassword.test(newPassword)).toEqual(false);
    });

    test("should wrong pattern with new password format is characters", async () => {
      const newPassword = "abcdfgg";
      expect(constants.AccountManager.regExpPassword.test(newPassword)).toEqual(false);
    });

    test("should bypass with new password is format characters and numbers", async () => {
      const newPassword = "12345abc";
      expect(constants.AccountManager.regExpPassword.test(newPassword)).toEqual(true);
    });

  });

  describe("getBasicCredentialInfo", () => {
    let dto: Account;

    beforeAll(() => {
      dto = plainToClass(Account, data.accounts[0]);
    });

    test("should bypass return identityName", async () => {
      const rv = await mAccountManager.getBasicCredentialInfo(dto);
      expect(rv.identityName).toEqual(dto.identityName);
    });

    test("should bypass return displayName", async () => {
      const rv = await mAccountManager.getBasicCredentialInfo(dto);
      expect(rv.displayName).toEqual(dto.displayName);
    });

  });

  describe("findAccountByEmail", () => {
    let dto: Account;
    let mockAccountRepositoryFindOne: jest.Mock;
    beforeAll(() => {
      dto = plainToClass(Account, data.accounts[0]);
      mockAccountRepositoryFindOne = jest.fn();
      mAccountRepository.findOne = mockAccountRepositoryFindOne;
    });

    test("should have call query findAccountByIdentityName", async () => {
      mockAccountRepositoryFindOne.mockReturnValue(dto);
      await mAccountManager.findAccountByIdentityName(null, "");
      expect(mockAccountRepositoryFindOne).toHaveBeenCalledTimes(1);
    });

  });

  describe("findResetTokenByEmail", () => {
    let mockResetTokenRepositoryFindOneOrFail: jest.Mock;
    beforeAll(() => {
      mockResetTokenRepositoryFindOneOrFail = jest.fn();
      mResetTokenRepository.findOneOrFail = mockResetTokenRepositoryFindOneOrFail;
    });

    test("should  have call query findOneOrFail", async () => {
      mockResetTokenRepositoryFindOneOrFail.mockReturnValue([]);
      await mAccountManager.findResetTokenByIdentityName("");
      expect(mockResetTokenRepositoryFindOneOrFail).toHaveBeenCalledTimes(1);
    });

  });

  describe("validateConfirmForgotPassword", () => {
    let dto: ResetToken;
    let mockPasswordManagerCheckPassword: jest.Mock;
    let mockPasswordManagerHashPassword: jest.Mock;
    let mockResetTokenRepositoryFindAndCount: jest.Mock;
    
    beforeAll(() => {
      dto = plainToClass(ResetToken, data.resetTokens[0]);
      dto.expiredAt = new Date();
      mockPasswordManagerCheckPassword = jest.fn();
      mockPasswordManagerHashPassword = jest.fn();
      mockResetTokenRepositoryFindAndCount = jest.fn();
      mPasswordManager.checkPassword = mockPasswordManagerCheckPassword;
      mPasswordManager.hashPassword = mockPasswordManagerHashPassword;
      mResetTokenRepository.findAndCount = mockResetTokenRepositoryFindAndCount;
      mockPasswordManagerHashPassword.mockReturnValue(dto.hash);
      mockResetTokenRepositoryFindAndCount.mockReturnValue(["true",1]);
    });

    test("should throw invalid expired time", async () => {
      try {
        await mAccountManager.validateConfirmForgotPassword(dto, "", "");
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should throw error invalid checksum", async () => {
      try {
        mockPasswordManagerCheckPassword.mockReturnValue(false);
        await mAccountManager.validateConfirmForgotPassword(dto, "", "");
        mockPasswordManagerHashPassword.mockReturnValue(dto.hash);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should return success checksum", async () => {
      const expiredAt = new Date();
      expiredAt.setMinutes(expiredAt.getMinutes() + 5);
      dto.expiredAt = expiredAt;
      mockPasswordManagerCheckPassword.mockReturnValue(true);
      await mAccountManager.validateConfirmForgotPassword(dto, "", "");
      expect(mockPasswordManagerCheckPassword).toHaveBeenCalled();
    });

  });

  describe("generateCodeForgotPassword", () => {

    test("should generator code success", async () => {
      const rv = await mAccountManager.generateCodeResetToken();
      expect(rv.length).toEqual(6);
    });

  });

  describe("buildSeedToHashForgotPassword", () => {

    test("should build seed to hash success", async () => {
      const rv = await mAccountManager.buildSeedToHashResetToken("code", "email", "name", new Date(), "sign");
      expect(rv.length > 0).toEqual(true);
    });
    
  });

  describe("createForgotPassword", () => {
    let dtoAccount: Account;
    let dto: ResetToken;
    let mockPasswordManagerCheckPassword: jest.Mock;
    let mockPasswordManagerHashPassword: jest.Mock;
    let mockResetTokenRepositoryFindAndCount: jest.Mock;
    let mockResetTokenRepositoryUpdate: jest.Mock;
    let mockResetTokenRepositorySave: jest.Mock;
    let mockEmailServiceSend: jest.Mock;
    
    beforeAll(() => {
      dto = plainToClass(ResetToken, data.resetTokens[0]);
      dto.expiredAt = new Date();
      dtoAccount = plainToClass(Account, data.accounts[0]);
      mockPasswordManagerCheckPassword = jest.fn();
      mockPasswordManagerHashPassword = jest.fn();
      mockResetTokenRepositoryUpdate = jest.fn();
      mockResetTokenRepositorySave = jest.fn();
      mockEmailServiceSend = jest.fn();
      mockResetTokenRepositoryFindAndCount = jest.fn();

      mPasswordManager.checkPassword = mockPasswordManagerCheckPassword;
      mPasswordManager.hashPassword = mockPasswordManagerHashPassword;
      mResetTokenRepository.update = mockResetTokenRepositoryUpdate;
      mResetTokenRepository.save = mockResetTokenRepositorySave;
      mEmailService.send = mockEmailServiceSend;
      mResetTokenRepository.findAndCount = mockResetTokenRepositoryFindAndCount;
      mockPasswordManagerHashPassword.mockReturnValue(dto.hash);
      mockResetTokenRepositoryUpdate.mockReturnValue(true);
      mockResetTokenRepositorySave.mockReturnValue(true);
      mockEmailServiceSend.mockReturnValue(true);
      mockResetTokenRepositoryFindAndCount.mockReturnValue(["true",1]);
    });

    test("should call function updateExpiredForgotPassword, createNewForgotPassword, sendEmailForgotPassword", async () => {
      await mAccountManager.createForgotPassword(dtoAccount, "", "");
      expect(mockResetTokenRepositoryUpdate).toHaveBeenCalledTimes(1);
      expect(mockResetTokenRepositorySave).toHaveBeenCalledTimes(1);
      expect(mockEmailServiceSend).toHaveBeenCalledTimes(1);
    });

  });

  describe("confirmForgotPassword", () => {
    let dto: ResetToken;
    let mockPasswordManagerHashPassword: jest.Mock;
    let mockAccountRepositoryUpdate: jest.Mock;
    let mockResetTokenRepositoryUpdate: jest.Mock;
    let mockResetTokenRepositoryFindAndCount: jest.Mock;
    
    beforeAll(() => {
      dto = plainToClass(ResetToken, data.resetTokens[0]);
      dto.expiredAt = new Date();
      mockPasswordManagerHashPassword = jest.fn();
      mockAccountRepositoryUpdate = jest.fn();
      mockResetTokenRepositoryUpdate = jest.fn();
      mockResetTokenRepositoryFindAndCount = jest.fn();

      mPasswordManager.hashPassword = mockPasswordManagerHashPassword;
      mResetTokenRepository.update = mockResetTokenRepositoryUpdate;
      mResetTokenRepository.findAndCount = mockResetTokenRepositoryFindAndCount;
      mAccountRepository.update = mockAccountRepositoryUpdate;
      mockPasswordManagerHashPassword.mockReturnValue(dto.hash);
      mockAccountRepositoryUpdate.mockReturnValue(true);
      mockResetTokenRepositoryUpdate.mockReturnValue(true);
      mockResetTokenRepositoryFindAndCount.mockReturnValue(["true",1]);
    });

    test("should call function forgotPassword save", async () => {
      await mAccountManager.confirmForgotPassword(dto, "");
      expect(mockResetTokenRepositoryUpdate).toHaveBeenCalledTimes(1);
      expect(mockAccountRepositoryUpdate).toHaveBeenCalledTimes(1);
    });
    
  });

});
