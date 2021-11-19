import { createAccountGroupResourceTest } from "../../testUtils/createDomainModelTest";

describe("AccountGroupResource", () => {
  test("should update successfully", async () => {
    const created = createAccountGroupResourceTest();
    const updated = createAccountGroupResourceTest();
    // update data
    created.update(updated);

    expect(created.resourceId).toEqual(updated.resourceId);
    expect(created.accountGroupId).toEqual(updated.accountGroupId);
  });
});
