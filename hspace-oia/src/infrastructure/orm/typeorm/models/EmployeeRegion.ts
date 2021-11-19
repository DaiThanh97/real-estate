import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, ActiveStatusColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { IMasterValue } from "./MasterValue";
import { IEmployee } from "./Employee";


export interface IEmployeeRegion {
  id: number;
  cityId: number;
  districtId: number;
  wardId: number;
  employeeId: number;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  city: IMasterValue;
  district: IMasterValue;
  ward: IMasterValue;
  employee: IEmployee;
}

export const EmployeeRegion = new EntitySchema<IEmployeeRegion>({
  name: "employee_region",
  tableName: "employee_regions",
  columns: {
    ...BaseColumnSchemaPart,
    ...ActiveStatusColumnSchemaPart,
    cityId: {
      type: Number,
      name: "city_id",
      nullable: true,
    },
    wardId: {
      type: Number,
      name: "ward_id",
      nullable: true,
    },
    districtId: {
      type: Number,
      name: "district_id",
      nullable: true,
    },
    employeeId: {
      type: Number,
      name: "employee_id",
      nullable: true,
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    city: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "city_id", referencedColumnName: "id" },
    },
    district: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "district_id", referencedColumnName: "id" },
    },
    ward: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "ward_id", referencedColumnName: "id" },
    },
    employee: {
      type: "many-to-one",
      target: "employee",
      inverseSide: "employeeRegions",
      joinColumn: { name: "employee_id", referencedColumnName: "id" },
      nullable: true,
    }
  },
});
