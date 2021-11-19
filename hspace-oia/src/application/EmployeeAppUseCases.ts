import { Account } from "../domain/models/Account";
import { Employee } from "../domain/models/Employee";
import { BadRequestError } from "../infrastructure/error";
import { plainToClass } from "class-transformer";
import ErrorCode from "../infrastructure/config/constants/errorCode";
import { IAccountManager, IBaseRepository, IEmployeeRepository } from "../domain/services/contract";
import {
  EmployeeChangeBasicInfoSerializer,
  EmployeeQuery,
  EmployeeSerializer
} from "../interfaces/serializers/EmployeeSerializer";
import { EmployeeQueryGenerator } from "./utils/EmployeeQueryGenerator";
import { ILike } from "typeorm";

export default class EmployeeAppUseCases {
  public static async get(id: number, beans: {
    employeeRepository: IEmployeeRepository,
  }): Promise<any> {
    return await beans.employeeRepository.findOneOrFail({
      where: { id },
      relations: [
        "department",
        "manager",
        "status",
        "title",
        "createdBy",
        "updatedBy",
        "employeeLimits",
        "employeeRegions",
        "employeeLimits.type",
        "employeeRegions.city",
        "employeeRegions.district",
        "employeeLimits.createdBy",
        "employeeLimits.updatedBy",
        "employeeRegions.createdBy",
        "employeeRegions.updatedBy",
      ],
    });
  }

  public static async validate(payload: any, beans: {
    employeeRepository: IEmployeeRepository,
  }): Promise<void> {
    if (payload.managerId) {
      await beans.employeeRepository.findOneOrFail({
        where: { id: payload.managerId },
      });
    }

    const uniqueStrFields = [
      {
        "name": "code",
        "errCode": ErrorCode.Employee.CodeExist,
      },
      {
        "name": "email",
        "errCode": ErrorCode.Employee.EmailExist,
      },
    ];
    for (const field of uniqueStrFields) {
      const fieldName = field["name"];
      const errCode = field["errCode"];
      if (!payload[fieldName]) {
        continue;
      }
      const where = {} as any;
      where[fieldName] = ILike(payload[fieldName]);
      const exist = await beans.employeeRepository.findOne({ where });
      if (exist) {
        if (payload.id === undefined || (payload.id && exist.id !== payload.id)) {
          throw new BadRequestError(`The employee ${fieldName} is exist.`, errCode);
        }
      }
    }
  }

  public static async create(payload: any, currentAccount: Account, beans: {
    employeeRepository: IEmployeeRepository,
    accountManager: IAccountManager,
  }): Promise<any> {
    await this.validate(payload, beans);
    const employee = Employee.createByAccount(payload, currentAccount);
    employee.checkRelationItems();
    const result = await beans.employeeRepository.save(employee);
    await beans.accountManager.createAccountByEmployee(result, currentAccount);
    return this.get(result.id, beans);
  }

  public static async update(payload: any, account: Account, beans: {
    employeeRepository: IEmployeeRepository,
    employeeLimitRepository: IBaseRepository,
    employeeRegionRepository: IBaseRepository,
    accountManager: IAccountManager,
  }): Promise<any> {
    await this.validate(payload, beans);
    const beforeUpdate = await this.get(payload.id, beans);
    const employee: Employee = plainToClass(Employee, payload);
    employee.updateByAccount(account, beforeUpdate);
    employee.checkRelationItems();
    const result = await beans.employeeRepository.save(employee);
    await beans.employeeLimitRepository.delete({ employeeId: null });
    await beans.employeeRegionRepository.delete({ employeeId: null });
    const updated = await this.get(result.id, beans);
    await beans.accountManager.updateAccountNameByEmployee(beforeUpdate, updated);
    return updated;
  }

  public static async getAll(queryOptions: EmployeeQuery, beans: {
    employeeRepository: IEmployeeRepository,
  }): Promise<any> {

    const queryBuilder: any = EmployeeQueryGenerator.generateSearchQuery(beans.employeeRepository, queryOptions);
    const totalCount = await queryBuilder.getCount();
    const resultQuery = await queryBuilder
      .take(queryOptions.take)
      .skip(queryOptions.skip)
      .orderBy(`e.${queryOptions.orderField}`, queryOptions.order)
      .getMany();

    const items = plainToClass(EmployeeSerializer, resultQuery, {excludeExtraneousValues: true});

    return {
      data: items,
      total: totalCount
    };
  }

  private static async getEmployeeWithCredentialInfo(id: number, account: Account, beans: {
    employeeRepository: IEmployeeRepository,
    accountManager: IAccountManager,
  }): Promise<any> {
    const currentEmp = await this.get(id, beans);
    const extraAccountInfo = await beans.accountManager.getBasicCredentialInfo(account);
    return {...currentEmp, ...extraAccountInfo};
  }

  public static async getCurrentEmployee(account: Account, beans: {
    employeeRepository: IEmployeeRepository,
    accountManager: IAccountManager,
  }): Promise<any> {
    if(!account.employeeId){
      throw new BadRequestError("The account is not mapping employee.", ErrorCode.EntityNotFound);
    }
    return this.getEmployeeWithCredentialInfo(account.employeeId, account, beans);
  }

  public static async changeBasicInfo(data: EmployeeChangeBasicInfoSerializer, account: Account, beans: {
    employeeRepository: IEmployeeRepository,
    accountManager: IAccountManager,
  }): Promise<any> {
    if(!account.employeeId){
      throw new BadRequestError("The account is not mapping employee.", ErrorCode.EntityNotFound);
    }
    let employee: Employee = await this.get(account.employeeId, beans);
    employee = Employee.updateBasicInfo(employee, data.birthday);
    Account.updateAuditInfo(employee, account.id);
    await beans.employeeRepository.save(employee);
    return this.getEmployeeWithCredentialInfo(account.employeeId, account, beans);
  }
}
