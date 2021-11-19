import { createFeatureTest } from "../../testUtils/createDomainModelTest";

describe("Feature", () => {
  test("should update successfully", async () => {
    const created = createFeatureTest();
    const updated = createFeatureTest();
    // update data
    created.update(updated);

    expect(created.isActive).toEqual(updated.isActive);
    expect(created.action).toEqual(updated.action);
    expect(created.name).toEqual(updated.name);
    expect(created.description).toEqual(updated.description);
    expect(created.resourceId).toEqual(updated.resourceId);
  });
});
