import { createAccountGroupFeatureTest } from "../../testUtils/createDomainModelTest";

describe("AccountGroupFeature", () => {
  test("should update successfully", async () => {
    const created = createAccountGroupFeatureTest();
    const updated = createAccountGroupFeatureTest();
    // update data
    created.update(updated);

    expect(created.featureId).toEqual(updated.featureId);
    expect(created.accountGroupId).toEqual(updated.accountGroupId);
  });
});
