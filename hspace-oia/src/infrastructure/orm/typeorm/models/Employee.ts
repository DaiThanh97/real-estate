import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { IMasterValue } from "./MasterValue";
import { IEmployeeLimit } from "./EmployeeLimit";
import { IEmployeeRegion } from "./EmployeeRegion";


export interface IEmployee {
  id: number;
  employeeLimitId: number;

  code: string;
  fullName: string;
  birthday: Date;
  joinedDate: Date;
  phone: string;
  email: string;
  departmentId: number;
  titleId: number;
  managerId: number;
  statusId: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  department: IMasterValue;
  title: IMasterValue;
  manager: IEmployee;
  status: IMasterValue;
  employeeLimits: IEmployeeLimit[];
  employeeRegions: IEmployeeRegion[];
}

export const Employee = new EntitySchema<IEmployee>({
  name: "employee",
  tableName: "employees",
  columns: {
    ...BaseColumnSchemaPart,
    code: {
      type: "varchar",
      name: "code",
      nullable: false,
      unique: true,
    },
    fullName: {
      type: String,
      name: "full_name",
      nullable: false,
    },
    birthday: {
      type: "date",
      name: "birthday",
      nullable: false,
    },
    joinedDate: {
      type: "date",
      name: "joined_date",
      nullable: false,
    },
    phone: {
      type: String,
      name: "phone",
      default: "",
    },
    email: {
      type: String,
      name: "email",
      default: "",
    },
    departmentId: {
      type: Number,
      name: "department_id",
      nullable: true,
    },
    titleId: {
      type: Number,
      name: "title_id",
      nullable: true,
    },
    managerId: {
      type: Number,
      name: "manager_id",
      nullable: true,
    },
    statusId: {
      type: Number,
      name: "status_id",
      nullable: true,
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    department: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "department_id", referencedColumnName: "id" },
    },
    title: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "title_id", referencedColumnName: "id" },
    },
    manager: {
      type: "many-to-one",
      target: "employee",
      joinColumn: { name: "manager_id", referencedColumnName: "id" },
      nullable: true,
    },
    status: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "status_id", referencedColumnName: "id" },
    },
    employeeLimits: {
      type: "one-to-many",
      target: "employee_limit",
      inverseSide: "employee",
      cascade: true,
      joinTable: true,
    },
    employeeRegions: {
      type: "one-to-many",
      target: "employee_region",
      inverseSide: "employee",
      cascade: true,
      joinTable: true,
    }
  },
  uniques: [
    {
      name: "UNIQUE_EMPLOYEE",
      columns: [
        "code",
      ]
    }
  ],
});
