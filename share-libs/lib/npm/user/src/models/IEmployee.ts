import { IMasterValue } from "./IMasterValue";

export interface IEmployeeLimit {
  typeId: number | string;
  employee_id: number | string;
  value: number;
  isActive: boolean;

  type: IMasterValue;
}

export interface IEmployeeRegion {
  cityId: number | string;
  districtId: number | string;
  employeeId: number | string;
  isActive: boolean;

  city: IMasterValue;

  district: IMasterValue;
}

export interface IEmployee {
  fullName: string;
  code: string;

  birthday: Date;

  joinedDate: Date;

  phone: string;
  email: string;

  departmentId: number | string;
  titleId: number | string;
  managerId: number | string;
  statusId: number | string;

  employeeLimits: IEmployeeLimit[];

  employeeRegions: IEmployeeRegion[];

  manager: IEmployee;

  title: IMasterValue;

  department: IMasterValue;

  status: IMasterValue;
}
