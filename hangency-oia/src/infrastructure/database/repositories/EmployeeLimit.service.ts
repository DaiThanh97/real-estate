import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { TransformEmployeeLimit } from "./transforms/employeeLimit/TransformEmployeeLimit";
import { IEmployeeLimitRepository } from "../../../domain/repositories/IEmployeeLimitRepository";
import { EmployeeLimit } from "../../../domain/models/EmployeeLimit";
import { EmployeeLimitEntity } from "../../orm/typeorm/models/EmployeeLimitEntity";
import { TYPES } from "../../IoC/types";
import { Repository as TypeORMRepo } from "typeorm/repository/Repository";
import { dBConnectionHolder } from "../../IoC/typeDi.config";

@Service({ id: TYPES.employeeLimitRepository })
export class EmployeeLimitRepository
  extends BaseRepository<EmployeeLimit, EmployeeLimitEntity>
  implements IEmployeeLimitRepository
{
  constructor() {
    super();
  }
  async findById(id: string): Promise<EmployeeLimit | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        id,
      },
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  transformUpdateEntityFromDomain(d: EmployeeLimit): Partial<EmployeeLimitEntity> {
    return TransformEmployeeLimit.transformUpdateEntityFromDomain(d);
  }
  transformEntityToDomain(e: EmployeeLimitEntity): EmployeeLimit {
    return TransformEmployeeLimit.transformEntityToDomain(e);
  }
  transformCreateEntityFromDomain(d: EmployeeLimit): EmployeeLimitEntity {
    return TransformEmployeeLimit.transformCreateEntityFromDomain(d);
  }

  getTypeORMRepository(): TypeORMRepo<EmployeeLimitEntity> {
    const db = dBConnectionHolder.getInstance();
    return db.getRepository(EmployeeLimitEntity);
  }
}
