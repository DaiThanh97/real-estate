import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";

export class Property extends BaseDomainModel implements IDomainModel {
  id: string;
  name: string | null;

  constructor(input: Pick<Property, "id" | "createdAt" | "updatedAt"> & PropertyBulkUpdatableField) {
    super(input);
    this.name = input.name;
  }

  static create = (id: string, input: PropertyBulkUpdatableField, now: Date): Property => {
    return new Property({
      id,
      createdAt: now,
      updatedAt: now,
      name: input.name,
    });
  };

  update = (input: PropertyBulkUpdatableField): void => {
    this.name = input.name;
  };

  equals(entity: Property) {
    if (!(entity instanceof Property)) return false;

    return this.id === entity.id;
  }
}

export type PropertyBulkUpdatableField = Pick<Property, "name">;
