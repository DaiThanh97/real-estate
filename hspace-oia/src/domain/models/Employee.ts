import { BaseModel } from "./Base";
import { plainToClass, Type } from "class-transformer";
import { MasterValue } from "./MasterValue";
import { Account } from "./Account";
import { ConflictError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import _ from "lodash";

export class EmployeeLimit extends BaseModel {
  public typeId: number;
  public employee_id: number;
  public value: number;
  public isActive: boolean;

  @Type(() => MasterValue)
  public type: MasterValue;
}

export class EmployeeRegion extends BaseModel {
  cityId: number;
  districtId: number;
  employeeId: number;
  public isActive: boolean;

  @Type(() => MasterValue)
  public city: MasterValue;

  @Type(() => MasterValue)
  public district: MasterValue;
}

export class Employee extends BaseModel {
  public fullName: string;
  public code: string;

  @Type(() => Date)
  public birthday: Date;

  @Type(() => Date)
  public joinedDate: Date;

  public phone: string;
  public email: string;

  public departmentId: number;
  public titleId: number;
  public managerId: number;
  public statusId: number;

  @Type(() => EmployeeLimit)
  public employeeLimits: EmployeeLimit[];

  @Type(() => EmployeeRegion)
  public employeeRegions: EmployeeRegion[];

  @Type(() => Employee)
  public manager: Employee;

  @Type(() => MasterValue)
  public title: MasterValue;

  @Type(() => MasterValue)
  public department: MasterValue;

  @Type(() => MasterValue)
  public status: MasterValue;

  static createByAccount(payload: any, account: Account): Employee {
    const employee: Employee = plainToClass(Employee, payload);
    employee.createdBy = account;
    employee.updatedBy = account;
    employee.updateAccountForList(employee.employeeLimits, account);
    employee.updateAccountForList(employee.employeeRegions, account);

    return employee;
  }

  updateByAccount(account: Account, existEmployee: Employee): Employee {
    this.updatedAt = new Date();
    this.updatedBy = account;
    _.forEach(this.employeeLimits, (item) => {
      if (item.id) {
        const existItem = _.find(
          existEmployee.employeeLimits,
          (i) =>
            i.id === item.id &&
            i.typeId === item.typeId &&
            i.value === item.value &&
            i.isActive === item.isActive
        );
        if (existItem) {
          item.updatedAt = existItem.updatedAt;
        } else {
          item.updatedBy = account;
        }
      } else {
        item.createdBy = account;
        item.updatedBy = account;
      }
    });

    _.forEach(this.employeeRegions, (item) => {
      if (item.id) {
        const existItem = _.find(
          existEmployee.employeeRegions,
          (i) =>
            i.id === item.id &&
            i.cityId === item.cityId &&
            i.districtId === item.districtId &&
            i.isActive === item.isActive
        );
        if (existItem) {
          item.updatedAt = existItem.updatedAt;
        } else {
          item.updatedBy = account;
        }
      } else {
        item.createdBy = account;
        item.updatedBy = account;
      }
    });

    if (this.id === this.managerId) {
      throw new ConflictError(
        "The manager is not valid",
        ErrorCode.Employee.InvalidManager
      );
    }

    return this;
  }

  checkRelationItems() {
    const relations = [
      {
        "name": "limits",
        "key": "employeeLimits",
        "errCode": ErrorCode.MasterValue.InvalidEmployeeLimits,
        "primary": "typeId",
      },
      {
        "name": "regions",
        "key": "employeeRegions",
        "errCode": ErrorCode.MasterValue.InvalidEmployeeRegions,
        "primary": "districtId",
      }
    ];
    const obj = this as any;

    for (const relation of relations) {
      const list = obj[relation["key"]];
      if (list && list.length > 0) {
        const uniqueArr = [...new Set(list.map((data: any) => data[relation["primary"]]))];
        if (uniqueArr.length !== list.length) {
          throw new ConflictError(`The employee ${relation["name"]} is not valid`, relation["errCode"]);
        }
      }
    }
  }

 static updateBasicInfo(employee: Employee, birthday: Date): Employee {
    employee.birthday = birthday;
    return employee;
  }

}
