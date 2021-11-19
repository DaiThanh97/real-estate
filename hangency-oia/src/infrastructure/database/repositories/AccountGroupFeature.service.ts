import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { TransformAccountGroupFeature } from "./transforms/accountGroupFeature/TransformAccountGroupFeature";
import { IAccountGroupFeatureRepository } from "../../../domain/repositories/IAccountGroupFeatureRepository";
import { AccountGroupFeature } from "../../../domain/models/AccountGroupFeature";
import { AccountGroupFeatureEntity } from "../../orm/typeorm/models/AccountGroupFeatureEntity";
import { TYPES } from "../../IoC/types";
import { Repository as TypeORMRepo } from "typeorm/repository/Repository";
import { dBConnectionHolder } from "../../IoC/typeDi.config";

@Service({ id: TYPES.accountGroupFeatureRepository })
export class AccountGroupFeatureRepository
  extends BaseRepository<AccountGroupFeature, AccountGroupFeatureEntity>
  implements IAccountGroupFeatureRepository
{
  constructor() {
    super();
  }
  async findById(id: string): Promise<AccountGroupFeature | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        id,
      },
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  transformUpdateEntityFromDomain(d: AccountGroupFeature): Partial<AccountGroupFeatureEntity> {
    return TransformAccountGroupFeature.transformUpdateEntityFromDomain(d);
  }
  transformEntityToDomain(e: AccountGroupFeatureEntity): AccountGroupFeature {
    return TransformAccountGroupFeature.transformEntityToDomain(e);
  }
  transformCreateEntityFromDomain(d: AccountGroupFeature): AccountGroupFeatureEntity {
    return TransformAccountGroupFeature.transformCreateEntityFromDomain(d);
  }

  getTypeORMRepository(): TypeORMRepo<AccountGroupFeatureEntity> {
    const db = dBConnectionHolder.getInstance();
    return db.getRepository(AccountGroupFeatureEntity);
  }
}
