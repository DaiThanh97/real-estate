import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { TransformAccountGroup } from "./transforms/accountGroup/TransformAccountGroup";
import { IAccountGroupRepository } from "../../../domain/repositories/IAccountGroupRepository";
import { AccountGroup } from "../../../domain/models/AccountGroup";
import { AccountGroupEntity } from "../../orm/typeorm/models/AccountGroupEntity";
import { TYPES } from "../../IoC/types";
import { Repository as TypeORMRepo } from "typeorm/repository/Repository";
import { dBConnectionHolder } from "../../IoC/typeDi.config";
import { In } from "typeorm";
import map from "lodash/map";

@Service({ id: TYPES.accountRepository })
export class AccountGroupRepository
  extends BaseRepository<AccountGroup, AccountGroupEntity>
  implements IAccountGroupRepository
{
  constructor() {
    super();
  }
  async findById(id: string): Promise<AccountGroup | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        id,
      },
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  async getByIds(ids: string[]): Promise<AccountGroup[] | undefined> {
    const repo = this.getTypeORMRepository();
    const results = await repo.find({
      where: {
        id: In(ids),
      },
    });
    return results ? map(results, (el: AccountGroupEntity) => this.transformEntityToDomain(el)) : undefined;
  }

  transformUpdateEntityFromDomain(d: AccountGroup): Partial<AccountGroupEntity> {
    return TransformAccountGroup.transformUpdateEntityFromDomain(d);
  }
  transformEntityToDomain(e: AccountGroupEntity): AccountGroup {
    return TransformAccountGroup.transformEntityToDomain(e);
  }
  transformCreateEntityFromDomain(d: AccountGroup): AccountGroupEntity {
    return TransformAccountGroup.transformCreateEntityFromDomain(d);
  }

  getTypeORMRepository(): TypeORMRepo<AccountGroupEntity> {
    const db = dBConnectionHolder.getInstance();
    return db.getRepository(AccountGroupEntity);
  }
}
