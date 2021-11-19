import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { TransformFeature } from "./transforms/feature/TransformFeature";
import { IFeatureRepository } from "../../../domain/repositories/IFeatureRepository";
import { Feature } from "../../../domain/models/Feature";
import { FeatureEntity } from "../../orm/typeorm/models/FeatureEntity";
import { TYPES } from "../../IoC/types";
import { Repository as TypeORMRepo } from "typeorm/repository/Repository";
import { dBConnectionHolder } from "../../IoC/typeDi.config";

@Service({ id: TYPES.featureRepository })
export class FeatureRepository extends BaseRepository<Feature, FeatureEntity> implements IFeatureRepository {
  constructor() {
    super();
  }
  async findById(id: string): Promise<Feature | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        id,
      },
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  transformUpdateEntityFromDomain(d: Feature): Partial<FeatureEntity> {
    return TransformFeature.transformUpdateEntityFromDomain(d);
  }
  transformEntityToDomain(e: FeatureEntity): Feature {
    return TransformFeature.transformEntityToDomain(e);
  }
  transformCreateEntityFromDomain(d: Feature): FeatureEntity {
    return TransformFeature.transformCreateEntityFromDomain(d);
  }

  getTypeORMRepository(): TypeORMRepo<FeatureEntity> {
    const db = dBConnectionHolder.getInstance();
    return db.getRepository(FeatureEntity);
  }
}
