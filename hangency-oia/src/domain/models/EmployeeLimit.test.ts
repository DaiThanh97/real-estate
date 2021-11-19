import { createEmployeeLimitTest } from "../../testUtils/createDomainModelTest";

describe("EmployeeLimit", () => {
  test("should update successfully", async () => {
    const created = createEmployeeLimitTest();
    const updated = createEmployeeLimitTest();
    // update data
    created.update(updated);

    expect(created.isActive).toEqual(updated.isActive);
    expect(created.typeId).toEqual(updated.typeId);
    expect(created.employee_id).toEqual(updated.employee_id);
    expect(created.value).toEqual(updated.value);
    expect(created.type).toEqual(updated.type);
  });
});
