import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, ActiveStatusColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { IMasterValue } from "./MasterValue";
import { IEmployee } from "./Employee";


export interface IEmployeeLimit {
  id: number;
  employeeId: number;
  typeId: number;
  value: number;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  type: IMasterValue;
  employee: IEmployee;
}

export const EmployeeLimit = new EntitySchema<IEmployeeLimit>({
  name: "employee_limit",
  tableName: "employee_limits",
  columns: {
    ...BaseColumnSchemaPart,
    ...ActiveStatusColumnSchemaPart,
    typeId: {
      type: Number,
      name: "type_id",
      nullable: false,
    },
    employeeId: {
      type: Number,
      name: "employee_id",
      nullable: true,
    },
    value: {
      type: "float",
      name: "value",
      nullable: false
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    type: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "type_id", referencedColumnName: "id" },
    },
    employee: {
      type: "many-to-one",
      target: "employee",
      inverseSide: "employeeLimits",
      joinColumn: { name: "employee_id", referencedColumnName: "id" },
      nullable: true,
    }
  },
});
