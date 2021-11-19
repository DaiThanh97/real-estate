import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { TransformProperty } from "./transforms/property/TransformProperty";
import { IPropertyRepository } from "../../../domain/repositories/IPropertyRepository";
import { Property } from "../../../domain/models/Property";
import { PropertyEntity } from "../../orm/typeorm/models/PropertyEntity";
import { TYPES } from "../../IoC/types";
import { Repository as TypeORMRepo } from "typeorm/repository/Repository";
import { dBConnectionHolder } from "../../IoC/typeDi.config";

@Service({ id: TYPES.propertyRepository })
export class PropertyRepository extends BaseRepository<Property, PropertyEntity> implements IPropertyRepository {
  constructor() {
    super();
  }
  async findById(id: string): Promise<Property | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        id,
      },
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  transformUpdateEntityFromDomain(d: Property): Partial<PropertyEntity> {
    return TransformProperty.transformUpdateEntityFromDomain(d);
  }
  transformEntityToDomain(e: PropertyEntity): Property {
    return TransformProperty.transformEntityToDomain(e);
  }
  transformCreateEntityFromDomain(d: Property): PropertyEntity {
    return TransformProperty.transformCreateEntityFromDomain(d);
  }

  getTypeORMRepository(): TypeORMRepo<PropertyEntity> {
    const db = dBConnectionHolder.getInstance();
    return db.getRepository(PropertyEntity);
  }
}
