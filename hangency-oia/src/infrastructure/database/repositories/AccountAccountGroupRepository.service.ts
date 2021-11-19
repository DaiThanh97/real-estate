import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { TransformAccountAccountGroup } from "./transforms/accountAccountGroup/TransformAccountAccountGroup";
import { IAccountAccountGroupRepository } from "../../../domain/repositories/IAccountAccountGroupRepository";
import { AccountAccountGroup } from "../../../domain/models/AccountAccountGroup";
import { AccountAccountGroupEntity } from "../../orm/typeorm/models/AccountAccountGroupEntity";
import { TYPES } from "../../IoC/types";
import { Repository as TypeORMRepo } from "typeorm/repository/Repository";
import { dBConnectionHolder } from "../../IoC/typeDi.config";

@Service({ id: TYPES.accountAccountGroupRepository })
export class AccountAccountGroupRepository
  extends BaseRepository<AccountAccountGroup, AccountAccountGroupEntity>
  implements IAccountAccountGroupRepository
{
  constructor() {
    super();
  }
  async findById(id: string): Promise<AccountAccountGroup | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        id,
      },
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  transformUpdateEntityFromDomain(d: AccountAccountGroup): Partial<AccountAccountGroupEntity> {
    return TransformAccountAccountGroup.transformUpdateEntityFromDomain(d);
  }
  transformEntityToDomain(e: AccountAccountGroupEntity): AccountAccountGroup {
    return TransformAccountAccountGroup.transformEntityToDomain(e);
  }
  transformCreateEntityFromDomain(d: AccountAccountGroup): AccountAccountGroupEntity {
    return TransformAccountAccountGroup.transformCreateEntityFromDomain(d);
  }

  getTypeORMRepository(): TypeORMRepo<AccountAccountGroupEntity> {
    const db = dBConnectionHolder.getInstance();
    return db.getRepository(AccountAccountGroupEntity);
  }
}
