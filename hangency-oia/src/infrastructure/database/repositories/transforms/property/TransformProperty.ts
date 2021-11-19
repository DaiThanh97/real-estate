import { PropertyEntity } from "../../../../orm/typeorm/models/PropertyEntity";
import { Property } from "../../../../../domain/models/Property";

export class TransformProperty {
  static transformEntityToDomain(e: PropertyEntity): Property {
    const result = new Property({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      name: e.name,
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: Property): PropertyEntity {
    return new PropertyEntity({
      id: d.id,
      name: d.name,
    });
  }
  static transformUpdateEntityFromDomain(d: Property): Partial<PropertyEntity> {
    const result: Partial<PropertyEntity> = {
      name: d.name,
    };
    return result;
  }
}
