import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { TransformEmployeeRegion } from "./transforms/employeeRegion/TransformEmployeeRegion";
import { IEmployeeRegionRepository } from "../../../domain/repositories/IEmployeeRegionRepository";
import { EmployeeRegion } from "../../../domain/models/EmployeeRegion";
import { EmployeeRegionEntity } from "../../orm/typeorm/models/EmployeeRegionEntity";
import { TYPES } from "../../IoC/types";
import { Repository as TypeORMRepo } from "typeorm/repository/Repository";
import { dBConnectionHolder } from "../../IoC/typeDi.config";

@Service({ id: TYPES.employeeRegionRepository })
export class EmployeeRegionRepository
  extends BaseRepository<EmployeeRegion, EmployeeRegionEntity>
  implements IEmployeeRegionRepository
{
  constructor() {
    super();
  }
  async findById(id: string): Promise<EmployeeRegion | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        id,
      },
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  transformUpdateEntityFromDomain(d: EmployeeRegion): Partial<EmployeeRegionEntity> {
    return TransformEmployeeRegion.transformUpdateEntityFromDomain(d);
  }
  transformEntityToDomain(e: EmployeeRegionEntity): EmployeeRegion {
    return TransformEmployeeRegion.transformEntityToDomain(e);
  }
  transformCreateEntityFromDomain(d: EmployeeRegion): EmployeeRegionEntity {
    return TransformEmployeeRegion.transformCreateEntityFromDomain(d);
  }

  getTypeORMRepository(): TypeORMRepo<EmployeeRegionEntity> {
    const db = dBConnectionHolder.getInstance();
    return db.getRepository(EmployeeRegionEntity);
  }
}
