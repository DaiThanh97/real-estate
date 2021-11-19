import { createEmployeeRegionTest } from "../../testUtils/createDomainModelTest";

describe("EmployeeRegion", () => {
  test("should update successfully", async () => {
    const created = createEmployeeRegionTest();
    const updated = createEmployeeRegionTest();
    // update data
    created.update(updated);

    expect(created.isActive).toEqual(updated.isActive);
    expect(created.cityId).toEqual(updated.cityId);
    expect(created.districtId).toEqual(updated.districtId);
    expect(created.employeeId).toEqual(updated.employeeId);
  });
});
