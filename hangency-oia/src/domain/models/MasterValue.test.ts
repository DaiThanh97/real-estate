import { createMasterValueTest } from "../../testUtils/createDomainModelTest";
describe("MasterValue", () => {
  test("should update successfully", async () => {
    const created = createMasterValueTest();
    const updated = createMasterValueTest();
    // update data
    created.update(updated);

    expect(created.isActive).toEqual(updated.isActive);
    expect(created.groupId).toEqual(updated.groupId);
    expect(created.groupCode).toEqual(updated.groupCode);
    expect(created.groupName).toEqual(updated.groupName);
    expect(created.valueCode).toEqual(updated.valueCode);
    expect(created.parentId).toEqual(updated.parentId);
    expect(created.valueName).toEqual(updated.valueName);
    expect(created.customData).toEqual(updated.customData);
  });
});
