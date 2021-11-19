import {
  AccountIdsHasAction,
  AccountIdsHasEvent,
  AccountIdsInObject,
  IAccountIdsGetting,
} from "../../src/domain/models/notifications/AccountIdsGetting";
import { IAccountEventRepository, INotificationManager } from "../../src/domain/services/contract";
import { mock } from "jest-mock-extended";

describe("AccountIdsGetting", () => {
  let mNotificationManager: INotificationManager;
  let mAccountEventRepository: IAccountEventRepository;
  let accountIdsHasAction: IAccountIdsGetting;
  let accountIdsHasEvent: IAccountIdsGetting;

  beforeAll(() => {
    mNotificationManager = mock<INotificationManager>();
    mAccountEventRepository = mock<IAccountEventRepository>();
    accountIdsHasAction = new AccountIdsHasAction("test", mNotificationManager);
    accountIdsHasEvent = new AccountIdsHasEvent(1, "test", "test", mAccountEventRepository);
  });

  describe("AccountIdsHasAction", () => {
    let mockGetAccountIdsByNotificationAction: jest.Mock;

    beforeAll(() => {
      mockGetAccountIdsByNotificationAction = jest.fn();
      mNotificationManager.getAccountIdsByNotificationAction = mockGetAccountIdsByNotificationAction;
    });

    test("Should return [1,2]", async () => {
      mockGetAccountIdsByNotificationAction.mockReturnValue([1, 2]);
      const rv = await accountIdsHasAction.getIds();
      expect(rv).toStrictEqual([1, 2]);
    });

    test("Should return []", async () => {
      mockGetAccountIdsByNotificationAction.mockReturnValue([]);
      const rv = await accountIdsHasAction.getIds();
      expect(rv).toStrictEqual([]);
    });

    test("Should return [], get null from mock", async () => {
      mockGetAccountIdsByNotificationAction.mockReturnValue(null);
      const rv = await accountIdsHasAction.getIds();
      expect(rv).toStrictEqual([]);
    });
  });

  describe("AccountIdsHasEvent", () => {
    let findOne: jest.Mock;

    beforeAll(() => {
      findOne = jest.fn();
      mAccountEventRepository.findOne = findOne;
    });

    test("Should return [1]", async () => {
      findOne.mockReturnValue({ id: 1, accountId: 1 });
      const rv = await accountIdsHasEvent.getIds();
      expect(rv).toStrictEqual([1]);
    });

    test("Should return []", async () => {
      findOne.mockReturnValue(null);
      const rv = await accountIdsHasEvent.getIds();
      expect(rv).toStrictEqual([]);
    });
  });

  describe("AccountIdsInObject", () => {
    test("Should return [1]", async () => {
      const obj = {
        sourceId: 1,
      };
      const accountIdsInObject = new AccountIdsInObject(obj, ["sourceId"]);
      const rv = await accountIdsInObject.getIds();
      expect(rv).toStrictEqual([1]);
    });

    test("Should return [2]", async () => {
      const obj = {
        sourceId: 1,
        approvedBy: {
          id: 2,
        }
      };
      const accountIdsInObject = new AccountIdsInObject(obj, ["approvedBy"]);
      const rv = await accountIdsInObject.getIds();
      expect(rv).toStrictEqual([2]);
    });

    test("Should return []", async () => {
      const obj = {
        sourceId: 1,
        approvedBy: {
          id: 2,
        }
      };
      const accountIdsInObject = new AccountIdsInObject(obj, ["test"]);
      const rv = await accountIdsInObject.getIds();
      expect(rv.length).toStrictEqual(0);
    });
  });
});
