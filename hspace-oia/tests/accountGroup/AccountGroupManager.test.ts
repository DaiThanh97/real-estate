import { IAccountGroupManager, IAccountGroupRepository, IBaseRepository } from "../../src/domain/services/contract";
import { mock } from "jest-mock-extended";
import { AccountGroupManager } from "../../src/domain/services/AccountGroupManager";


describe("AccountGroupManager", () => {
  let mAccountGroupFeatureRepository: IBaseRepository;
  let mAccountGroupRepository: IAccountGroupRepository;
  let mAccountGroupManager: IAccountGroupManager;

  beforeAll(() => {
    mAccountGroupRepository = mock<IAccountGroupRepository>();
    mAccountGroupFeatureRepository = mock<IBaseRepository>();
    mAccountGroupManager = new AccountGroupManager(
      mAccountGroupRepository,
      mAccountGroupFeatureRepository
    );
  });

  describe("checkArrayInArrayOfArray", () => {
    test("should return true, [a, b] in [[a, b]]", async () => {
      const rv = mAccountGroupManager.inList(["a", "b"], [["a", "b"]]);
      expect(rv).toEqual(true);
    });

    test("should return true, , [a, b] in [[b, a]]", async () => {
      const rv = mAccountGroupManager.inList(["a", "b"], [["b", "a"]]);
      expect(rv).toEqual(true);
    });

    test("should return true, , [a, b] in [[b, a], [a]]", async () => {
      const rv = mAccountGroupManager.inList(["a", "b"], [["b", "a"], ["a"]]);
      expect(rv).toEqual(true);
    });

    test("should return true, , [a, b] in [[c], [b, a], [a]]", async () => {
      const rv = mAccountGroupManager.inList(["a", "b"], [["c"], ["b", "a"], ["a"]]);
      expect(rv).toEqual(true);
    });

    test("should return false, , [a, b] in [[c], [b, a, c], [a]]", async () => {
      const rv = mAccountGroupManager.inList(["a", "b"], [["c"], ["b", "a", "c"], ["a"]]);
      expect(rv).toEqual(false);
    });

    test("should return false, , [a, b] in [[a, b, c]]", async () => {
      const rv = mAccountGroupManager.inList(["a", "b"], [["a", "b", "c"]]);
      expect(rv).toEqual(false);
    });

    test("should return false, , [a, b] in []", async () => {
      const rv = mAccountGroupManager.inList(["a", "b"], []);
      expect(rv).toEqual(false);
    });

    test("should return false, , [] in [[a]]", async () => {
      const rv = mAccountGroupManager.inList([], [["a"]]);
      expect(rv).toEqual(false);
    });
  });
});
