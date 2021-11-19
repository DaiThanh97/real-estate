import { EmployeeLimitEntity } from "../../../../orm/typeorm/models/EmployeeLimitEntity";
import { EmployeeLimit } from "../../../../../domain/models/EmployeeLimit";
import { TransformMasterValue } from "../masterValue/TransformMasterValue";

export class TransformEmployeeLimit {
  static transformEntityToDomain(e: EmployeeLimitEntity): EmployeeLimit {
    const result = new EmployeeLimit({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      typeId: e.typeId,
      employee_id: e.employeeId,
      value: e.value,
      isActive: e.isActive,
      type: e.type && TransformMasterValue.transformEntityToDomain(e.type),
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: EmployeeLimit): EmployeeLimitEntity {
    return new EmployeeLimitEntity({
      id: d.id,
      typeId: d.typeId,
      employeeId: d.employee_id,
      employee: undefined,
      value: d.value,
      isActive: d.isActive,
      type: d.type && TransformMasterValue.transformCreateEntityFromDomain(d.type),
    });
  }
  static transformUpdateEntityFromDomain(d: EmployeeLimit): Partial<EmployeeLimitEntity> {
    const result: Partial<EmployeeLimitEntity> = {
      typeId: d.typeId,
      employeeId: d.employee_id,
      value: d.value,
      isActive: d.isActive,
      type: d.type && TransformMasterValue.transformCreateEntityFromDomain(d.type),
    };
    return result;
  }
}
