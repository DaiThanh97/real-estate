import { createPropertyTest } from "../testUtils/createDomainModelTest";
import { mock } from "jest-mock-extended";
import { IPropertyRepository } from "../../domain/repositories/IPropertyRepository";
import { CreateProperty } from "./CreateProperty";

describe("CreateProperty", () => {
  const property = createPropertyTest();
  const propertyRepository = mock<IPropertyRepository>();
  test("should create successfully", async () => {
    const usecase = new CreateProperty(propertyRepository);
    propertyRepository.findById.mockResolvedValue(property);
    await usecase.execute({ name: property.name });
    expect(propertyRepository.create.mock.calls[0][0].name).toEqual(property.name);
  });
});
