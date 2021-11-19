import "reflect-metadata";

import { mock } from "jest-mock-extended";
import { IAccountRepository, ISessionRepository, ITokenManager } from "../../src/domain/services/contract";
import { TokenManager } from "../../src/domain/services/TokenManager";

describe("TokenManager", () => {
  let mAccountRepository: IAccountRepository;
  let mSessionRepository: ISessionRepository;
  let mTokenManager: ITokenManager;

  beforeAll(() => {
    mAccountRepository = mock<IAccountRepository>();
    mSessionRepository = mock<ISessionRepository>();
    mTokenManager = new TokenManager(mAccountRepository, mSessionRepository);
  });

  describe("validate", () => {
    let mockAccountRepositoryFineOne: jest.Mock;
    let mockSessionRepositoryFineOne: jest.Mock;

    beforeAll(() => {
      mockAccountRepositoryFineOne = jest.fn();
      mockSessionRepositoryFineOne = jest.fn();
      mAccountRepository.findOne = mockAccountRepositoryFineOne;
      mSessionRepository.findOne = mockSessionRepositoryFineOne;
    });

    test("validate decoded with invalid account", async () => {
      const decoded = { sub: 1 };
      const rv = await mTokenManager.validate(decoded, true);
      expect(rv.isValid).toEqual(false);
      expect(rv.account).toBeUndefined();
    });

    test("validate decoded with exist account and invalid session", async () => {
      const decoded = { sub: 1 };
      mockAccountRepositoryFineOne.mockReturnValue({ id: 1 });
      const rv = await mTokenManager.validate(decoded, true);
      expect(rv.isValid).toEqual(false);
      expect(rv.account).toBeUndefined();
    });

    test("validate decoded with exist account and valid session", async () => {
      const decoded = { sub: 1 };
      mockAccountRepositoryFineOne.mockReturnValue({ id: 1, accountAccountGroups:[]});
      mockSessionRepositoryFineOne.mockReturnValue({ id: 1 });
      const rv = await mTokenManager.validate(decoded, true);
      expect(rv.isValid).toEqual(true);
      expect(rv.account).toBeDefined();
      expect(rv.account.id).toEqual(decoded.sub);
    });
  });
});
