import { createAccountAccountGroupTest } from "../../testUtils/createDomainModelTest";

describe("AccountAccountGroup", () => {
  test("should update successfully", async () => {
    const created = createAccountAccountGroupTest();
    const updated = createAccountAccountGroupTest();
    // update data
    created.update(updated);

    expect(created.accountGroupId).toEqual(updated.accountGroupId);
    expect(created.accountId).toEqual(updated.accountId);
  });
});
