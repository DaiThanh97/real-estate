import { createAccountMenuTest } from "../../testUtils/createDomainModelTest";

describe("AccountMenu", () => {
  test("should update successfully", async () => {
    const created = createAccountMenuTest();
    const updated = createAccountMenuTest();
    // update data
    created.update(updated);

    expect(created.resourceId).toEqual(updated.resourceId);
    expect(created.name).toEqual(updated.name);
    expect(created.parentId).toEqual(updated.parentId);
    expect(created.resourceId).toEqual(updated.resourceId);
    expect(created.path).toEqual(updated.path);
  });
});
