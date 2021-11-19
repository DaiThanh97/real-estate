import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { IEmployeeLimit } from "@halato/user";
import { MasterValue } from "./MasterValue";

export class EmployeeLimit extends BaseDomainModel implements IDomainModel, IEmployeeLimit {
  id: string;
  typeId: number;
  employee_id: string;
  value: number;
  isActive: boolean;

  type: MasterValue;

  constructor(input: Pick<EmployeeLimit, "id" | "createdAt" | "updatedAt"> & EmployeeLimitBulkUpdatableField) {
    super(input);
    this.typeId = input.typeId;
    this.employee_id = input.employee_id;
    this.value = input.value;
    this.isActive = input.isActive;
    this.type = input.type;
  }

  static create = (id: string, input: EmployeeLimitBulkUpdatableField, now: Date): EmployeeLimit => {
    return new EmployeeLimit({
      id,
      createdAt: now,
      updatedAt: now,
      typeId: input.typeId,
      employee_id: input.employee_id,
      value: input.value,
      isActive: input.isActive,
      type: input.type,
    });
  };

  update = (input: EmployeeLimitBulkUpdatableField): void => {
    this.typeId = input.typeId;
    this.employee_id = input.employee_id;
    this.value = input.value;
    this.isActive = input.isActive;
    this.type = input.type;
  };

  equals(entity: EmployeeLimit) {
    if (!(entity instanceof EmployeeLimit)) return false;

    return this.id === entity.id;
  }
}

export type EmployeeLimitBulkUpdatableField = Pick<
  EmployeeLimit,
  "typeId" | "employee_id" | "value" | "isActive" | "type"
>;
