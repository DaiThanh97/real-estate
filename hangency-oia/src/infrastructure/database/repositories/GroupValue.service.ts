import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { TransformGroupValue } from "./transforms/groupValue/TransformGroupValue";
import { IGroupValueRepository } from "../../../domain/repositories/IGroupValueRepository";
import { GroupValue } from "../../../domain/models/GroupValue";
import { GroupValueEntity } from "../../orm/typeorm/models/GroupValueEntity";
import { TYPES } from "../../IoC/types";
import { Repository as TypeORMRepo } from "typeorm/repository/Repository";
import { dBConnectionHolder } from "../../IoC/typeDi.config";

@Service({ id: TYPES.groupValueRepository })
export class GroupValueRepository
  extends BaseRepository<GroupValue, GroupValueEntity>
  implements IGroupValueRepository
{
  constructor() {
    super();
  }
  async findById(id: string): Promise<GroupValue | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        id,
      },
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  transformUpdateEntityFromDomain(d: GroupValue): Partial<GroupValueEntity> {
    return TransformGroupValue.transformUpdateEntityFromDomain(d);
  }
  transformEntityToDomain(e: GroupValueEntity): GroupValue {
    return TransformGroupValue.transformEntityToDomain(e);
  }
  transformCreateEntityFromDomain(d: GroupValue): GroupValueEntity {
    return TransformGroupValue.transformCreateEntityFromDomain(d);
  }

  getTypeORMRepository(): TypeORMRepo<GroupValueEntity> {
    const db = dBConnectionHolder.getInstance();
    return db.getRepository(GroupValueEntity);
  }
}
