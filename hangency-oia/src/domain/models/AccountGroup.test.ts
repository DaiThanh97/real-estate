import { createAccountGroupTest } from "../../testUtils/createDomainModelTest";

describe("AccountGroup", () => {
  test("should update successfully", async () => {
    const created = createAccountGroupTest();
    const updated = createAccountGroupTest();
    // update data
    created.update(updated);

    expect(created.code).toEqual(updated.code);
    expect(created.name).toEqual(updated.name);
    expect(created.description).toEqual(updated.description);
    expect(created.isActive).toEqual(updated.isActive);
    expect(created.isDeleted).toEqual(updated.isDeleted);
  });
});
