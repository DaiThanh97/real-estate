import { createGroupValueTest } from "../../testUtils/createDomainModelTest";

describe("GroupValue", () => {
  test("should update successfully", async () => {
    const created = createGroupValueTest();
    const updated = createGroupValueTest();
    // update data
    created.update(updated);

    expect(created.isActive).toEqual(updated.isActive);
    expect(created.code).toEqual(updated.code);
    expect(created.name).toEqual(updated.name);
    expect(created.parentId).toEqual(updated.parentId);
  });
});
