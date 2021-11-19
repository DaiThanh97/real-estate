import { Resource } from "./Resource";
import * as uuid from "uuid";

import { createResourceTest } from "../../testUtils/createDomainModelTest";

describe("Resource", () => {
  test("should update successfully", async () => {
    const created = createResourceTest();
    const updated = createResourceTest();
    // update data
    created.update(updated);

    expect(created.isActive).toEqual(updated.isActive);
    expect(created.path).toEqual(updated.path);
    expect(created.description).toEqual(updated.description);
  });
});
