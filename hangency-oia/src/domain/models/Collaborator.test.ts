import { createCollaboratorTest } from "../../testUtils/createDomainModelTest";

describe("Collaborator", () => {
  test("should update successfully", async () => {
    const created = createCollaboratorTest();
    const updated = createCollaboratorTest();
    // update data
    created.update(updated);

    expect(created.fullName).toEqual(updated.fullName);
    expect(created.birthday).toEqual(updated.birthday);
    expect(created.joinedDate).toEqual(updated.joinedDate);
    expect(created.phone).toEqual(updated.phone);
    expect(created.email).toEqual(updated.email);
    expect(created.companyId).toEqual(updated.companyId);
    expect(created.collaboratorTypeId).toEqual(updated.collaboratorTypeId);
  });
});
