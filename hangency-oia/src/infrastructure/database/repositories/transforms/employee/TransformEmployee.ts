import { EmployeeEntity } from "../../../../orm/typeorm/models/EmployeeEntity";
import { Employee } from "../../../../../domain/models/Employee";
import { TransformMasterValue } from "../masterValue/TransformMasterValue";
import { TransformEmployeeLimit } from "../employeeLimit/TransformEmployeeLimit";
import { TransformEmployeeRegion } from "../employeeRegion/TransformEmployeeRegion";
import { TransformAccount } from "../account/TransformAccount";
import map from "lodash/map";

export class TransformEmployee {
  static transformEntityToDomain(e: EmployeeEntity): Employee {
    const result = new Employee({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      fullName: e.fullName,
      code: e.code,
      birthday: e.birthday,
      joinedDate: e.joinedDate,
      phone: e.phone,
      email: e.email,
      departmentId: e.departmentId,
      titleId: e.titleId,
      managerId: e.managerId,
      statusId: e.statusId,

      employeeLimits: map(e.employeeLimits, (el) => TransformEmployeeLimit.transformEntityToDomain(el)),
      employeeRegions: map(e.employeeRegions, (el) => TransformEmployeeRegion.transformEntityToDomain(el)),
      manager: e.manager && this.transformEntityToDomain(e.manager),
      title: e.title && TransformMasterValue.transformEntityToDomain(e.title),
      department: e.department && TransformMasterValue.transformEntityToDomain(e.department),
      status: e.status && TransformMasterValue.transformEntityToDomain(e.status),
      createdBy: e.createdBy && TransformAccount.transformEntityToDomain(e.createdBy),
      updatedBy: e.updatedBy && TransformAccount.transformEntityToDomain(e.updatedBy),
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: Employee): EmployeeEntity {
    return new EmployeeEntity({
      id: d.id,
      fullName: d.fullName,
      code: d.code,
      birthday: d.birthday,
      joinedDate: d.joinedDate,
      phone: d.phone,
      email: d.email,
      departmentId: d.departmentId,
      titleId: d.titleId,
      managerId: d.managerId,
      statusId: d.statusId,

      employeeLimits: map(d.employeeLimits, (el) => TransformEmployeeLimit.transformCreateEntityFromDomain(el)),
      employeeRegions: map(d.employeeRegions, (el) => TransformEmployeeRegion.transformCreateEntityFromDomain(el)),
      manager: d.manager && this.transformCreateEntityFromDomain(d.manager),
      title: d.title && TransformMasterValue.transformCreateEntityFromDomain(d.title),
      department: d.department && TransformMasterValue.transformCreateEntityFromDomain(d.department),
      status: d.status && TransformMasterValue.transformCreateEntityFromDomain(d.status),
      createdBy: d.createdBy && TransformAccount.transformCreateEntityFromDomain(d.createdBy),
      updatedBy: d.updatedBy && TransformAccount.transformCreateEntityFromDomain(d.updatedBy),
    });
  }
  static transformUpdateEntityFromDomain(d: Employee): Partial<EmployeeEntity> {
    const result: Partial<EmployeeEntity> = {
      fullName: d.fullName,
      code: d.code,
      birthday: d.birthday,
      joinedDate: d.joinedDate,
      phone: d.phone,
      email: d.email,
      departmentId: d.departmentId,
      titleId: d.titleId,
      managerId: d.managerId,
      statusId: d.statusId,

      employeeLimits: map(d.employeeLimits, (el) => TransformEmployeeLimit.transformCreateEntityFromDomain(el)),
      employeeRegions: map(d.employeeRegions, (el) => TransformEmployeeRegion.transformCreateEntityFromDomain(el)),
      manager: d.manager && this.transformCreateEntityFromDomain(d.manager),
      title: d.title && TransformMasterValue.transformCreateEntityFromDomain(d.title),
      department: d.department && TransformMasterValue.transformCreateEntityFromDomain(d.department),
      status: d.status && TransformMasterValue.transformCreateEntityFromDomain(d.status),
      createdBy: d.createdBy && TransformAccount.transformCreateEntityFromDomain(d.createdBy),
      updatedBy: d.updatedBy && TransformAccount.transformCreateEntityFromDomain(d.updatedBy),
    };
    return result;
  }
}
