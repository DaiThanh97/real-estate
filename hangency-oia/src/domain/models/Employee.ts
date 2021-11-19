import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { IEmployee } from "@halato/user";
import { EmployeeLimit } from "./EmployeeLimit";
import { EmployeeRegion } from "./EmployeeRegion";
import { MasterValue } from "./MasterValue";
import { Account } from "./Account";

export class Employee extends BaseDomainModel implements IDomainModel, IEmployee {
  id: string;
  fullName: string;
  code: string;
  birthday: Date;
  joinedDate: Date;
  phone: string;
  email: string;
  departmentId: number;
  titleId: number;
  managerId: string;
  statusId: number;

  employeeLimits: EmployeeLimit[] | null;
  employeeRegions: EmployeeRegion[] | null;

  manager: Employee | null;
  title: MasterValue | null;
  department: MasterValue | null;
  status: MasterValue | null;

  createdBy?: Account;
  updatedBy?: Account;

  constructor(input: Pick<Employee, "id" | "createdAt" | "updatedAt"> & EmployeeBulkUpdatableField) {
    super(input);
    this.fullName = input.fullName;
    this.code = input.code;
    this.birthday = input.birthday;
    this.joinedDate = input.joinedDate;
    this.phone = input.phone;
    this.email = input.email;
    this.departmentId = input.departmentId;
    this.titleId = input.titleId;
    this.managerId = input.managerId;
    this.statusId = input.statusId;
    this.employeeLimits = input.employeeLimits;
    this.employeeRegions = input.employeeRegions;
    this.manager = input.manager;
    this.title = input.title;
    this.department = input.department;
    this.status = input.status;
    this.createdBy = input.createdBy;
    this.updatedBy = input.updatedBy;
  }

  static create = (id: string, input: EmployeeBulkUpdatableField, now: Date): Employee => {
    return new Employee({
      id,
      createdAt: now,
      updatedAt: now,
      fullName: input.fullName,
      code: input.code,
      birthday: input.birthday,
      joinedDate: input.joinedDate,
      phone: input.phone,
      email: input.email,
      departmentId: input.departmentId,
      titleId: input.titleId,
      managerId: input.managerId,
      statusId: input.statusId,
      employeeLimits: input.employeeLimits,
      employeeRegions: input.employeeRegions,
      manager: input.manager,
      title: input.title,
      department: input.department,
      status: input.status,
      createdBy: input.createdBy,
      updatedBy: input.updatedBy,
    });
  };

  update = (input: EmployeeBulkUpdatableField): void => {
    this.fullName = input.fullName;
    this.code = input.code;
    this.birthday = input.birthday;
    this.joinedDate = input.joinedDate;
    this.phone = input.phone;
    this.email = input.email;
    this.departmentId = input.departmentId;
    this.titleId = input.titleId;
    this.managerId = input.managerId;
    this.statusId = input.statusId;
    this.employeeLimits = input.employeeLimits;
    this.employeeRegions = input.employeeRegions;
    this.manager = input.manager;
    this.title = input.title;
    this.department = input.department;
    this.status = input.status;
    this.createdBy = input.createdBy;
    this.updatedBy = input.updatedBy;
  };

  equals(entity: Employee) {
    if (!(entity instanceof Employee)) return false;

    return this.id === entity.id;
  }
}

export type EmployeeBulkUpdatableField = Pick<
  Employee,
  | "fullName"
  | "code"
  | "birthday"
  | "joinedDate"
  | "phone"
  | "email"
  | "departmentId"
  | "titleId"
  | "managerId"
  | "statusId"
  | "employeeLimits"
  | "employeeRegions"
  | "manager"
  | "title"
  | "department"
  | "status"
  | "createdBy"
  | "updatedBy"
>;
