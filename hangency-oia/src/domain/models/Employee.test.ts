import { createEmployeeTest } from "../../testUtils/createDomainModelTest";

describe("Employee", () => {
  test("should update successfully", async () => {
    const created = createEmployeeTest();
    const updated = createEmployeeTest();
    // update data
    created.update(updated);

    expect(created.code).toEqual(updated.code);
    expect(created.fullName).toEqual(updated.fullName);
    expect(created.birthday).toEqual(updated.birthday);
    expect(created.joinedDate).toEqual(updated.joinedDate);
    expect(created.phone).toEqual(updated.phone);
    expect(created.email).toEqual(updated.email);
    expect(created.departmentId).toEqual(updated.departmentId);
    expect(created.titleId).toEqual(updated.titleId);
    expect(created.statusId).toEqual(updated.statusId);
    expect(created.managerId).toEqual(updated.managerId);
  });
});
