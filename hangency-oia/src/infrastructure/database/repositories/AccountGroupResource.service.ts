import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { TransformAccountGroupResource } from "./transforms/accountGroupResource/TransformAccountGroupResource";
import { IAccountGroupResourceRepository } from "../../../domain/repositories/IAccountGroupResourceRepository";
import { AccountGroupResource } from "../../../domain/models/AccountGroupResource";
import { AccountGroupResourceEntity } from "../../orm/typeorm/models/AccountGroupResourceEntity";
import { TYPES } from "../../IoC/types";
import { Repository as TypeORMRepo } from "typeorm/repository/Repository";
import { dBConnectionHolder } from "../../IoC/typeDi.config";

@Service({ id: TYPES.accountGroupResourceRepository })
export class AccountGroupResourceRepository
  extends BaseRepository<AccountGroupResource, AccountGroupResourceEntity>
  implements IAccountGroupResourceRepository
{
  constructor() {
    super();
  }
  async findById(id: string): Promise<AccountGroupResource | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        id,
      },
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  transformUpdateEntityFromDomain(d: AccountGroupResource): Partial<AccountGroupResourceEntity> {
    return TransformAccountGroupResource.transformUpdateEntityFromDomain(d);
  }
  transformEntityToDomain(e: AccountGroupResourceEntity): AccountGroupResource {
    return TransformAccountGroupResource.transformEntityToDomain(e);
  }
  transformCreateEntityFromDomain(d: AccountGroupResource): AccountGroupResourceEntity {
    return TransformAccountGroupResource.transformCreateEntityFromDomain(d);
  }

  getTypeORMRepository(): TypeORMRepo<AccountGroupResourceEntity> {
    const db = dBConnectionHolder.getInstance();
    return db.getRepository(AccountGroupResourceEntity);
  }
}
