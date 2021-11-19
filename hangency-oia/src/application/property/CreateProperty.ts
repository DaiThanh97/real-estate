import * as uuid from "uuid";

import { IPropertyRepository } from "../../domain/repositories/IPropertyRepository";
import { Property } from "../../domain/models/Property";

export class CreateProperty {
  constructor(private readonly propertyRepository: IPropertyRepository) {}

  async execute(input: { name: string | null }): Promise<Property> {
    const newId = uuid.v4();
    const now = new Date();
    const newProperty = Property.create(newId, { name: input.name }, now);
    await this.propertyRepository.create(newProperty);
    const created = await this.propertyRepository.findById(newProperty.id);
    return created;
  }
}
