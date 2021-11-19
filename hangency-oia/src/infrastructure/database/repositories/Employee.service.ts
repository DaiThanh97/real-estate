import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { TransformEmployee } from "./transforms/employee/TransformEmployee";
import { IEmployeeRepository } from "../../../domain/repositories/IEmployeeRepository";
import { Employee } from "../../../domain/models/Employee";
import { EmployeeEntity } from "../../orm/typeorm/models/EmployeeEntity";
import { TYPES } from "../../IoC/types";
import { Repository as TypeORMRepo } from "typeorm/repository/Repository";
import { dBConnectionHolder } from "../../IoC/typeDi.config";

@Service({ id: TYPES.employeeRepository })
export class EmployeeRepository extends BaseRepository<Employee, EmployeeEntity> implements IEmployeeRepository {
  constructor() {
    super();
  }
  async findById(id: string): Promise<Employee | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        id,
      },
      relations: ["department"],
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  transformUpdateEntityFromDomain(d: Employee): Partial<EmployeeEntity> {
    return TransformEmployee.transformUpdateEntityFromDomain(d);
  }
  transformEntityToDomain(e: EmployeeEntity): Employee {
    return TransformEmployee.transformEntityToDomain(e);
  }
  transformCreateEntityFromDomain(d: Employee): EmployeeEntity {
    return TransformEmployee.transformCreateEntityFromDomain(d);
  }

  getTypeORMRepository(): TypeORMRepo<EmployeeEntity> {
    const db = dBConnectionHolder.getInstance();
    return db.getRepository(EmployeeEntity);
  }
}
