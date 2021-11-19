import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { TransformMasterValue } from "./transforms/masterValue/TransformMasterValue";
import { IMasterValueRepository } from "../../../domain/repositories/IMasterValueRepository";
import { MasterValue } from "../../../domain/models/MasterValue";
import { MasterValueEntity } from "../../orm/typeorm/models/MasterValueEntity";
import { TYPES } from "../../IoC/types";
import { Repository as TypeORMRepo } from "typeorm/repository/Repository";
import { dBConnectionHolder } from "../../IoC/typeDi.config";

@Service({ id: TYPES.masterValueRepository })
export class MasterValueRepository
  extends BaseRepository<MasterValue, MasterValueEntity>
  implements IMasterValueRepository
{
  constructor() {
    super();
  }
  async findById(id: string): Promise<MasterValue | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        id,
      },
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  transformUpdateEntityFromDomain(d: MasterValue): Partial<MasterValueEntity> {
    return TransformMasterValue.transformUpdateEntityFromDomain(d);
  }
  transformEntityToDomain(e: MasterValueEntity): MasterValue {
    return TransformMasterValue.transformEntityToDomain(e);
  }
  transformCreateEntityFromDomain(d: MasterValue): MasterValueEntity {
    return TransformMasterValue.transformCreateEntityFromDomain(d);
  }

  getTypeORMRepository(): TypeORMRepo<MasterValueEntity> {
    const db = dBConnectionHolder.getInstance();
    return db.getRepository(MasterValueEntity);
  }
}
