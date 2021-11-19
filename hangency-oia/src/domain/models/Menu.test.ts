import { Menu } from "./Menu";
import * as uuid from "uuid";

import { createMenuTest } from "../../testUtils/createDomainModelTest";

describe("Menu", () => {
  test("should update successfully", async () => {
    const created = createMenuTest();
    const updated = createMenuTest();
    // update data
    created.update(updated);

    expect(created.isActive).toEqual(updated.isActive);
    expect(created.path).toEqual(updated.path);
    expect(created.name).toEqual(updated.name);
    expect(created.description).toEqual(updated.description);
    expect(created.resourceId).toEqual(updated.resourceId);
    expect(created.parentId).toEqual(updated.parentId);
  });
});
