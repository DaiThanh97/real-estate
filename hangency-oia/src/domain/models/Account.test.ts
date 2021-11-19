import { createAccountTest } from "../../testUtils/createDomainModelTest";

describe("Account", () => {
  test("should update successfully", async () => {
    const created = createAccountTest();
    const updated = createAccountTest();
    // update data
    created.update(updated);

    expect(created.isActive).toEqual(updated.isActive);
    expect(created.accountAccountGroups).toEqual(updated.accountAccountGroups);
  });
});
