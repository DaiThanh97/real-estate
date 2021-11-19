import { EmployeeQuery } from "../../interfaces/serializers/EmployeeSerializer";
import { AccountQueryGenerator } from "./AccountQueryGenerator";
import { IEmployeeRepository } from "../../domain/services/contract";

export class EmployeeQueryGenerator {
  public static generateQuerySearchInfo(alias: string, queryBuilder: any, queryOptions: any) {
    if (queryOptions.titleId) queryBuilder.andWhere(`${alias}.titleId = :titleId`, {titleId: queryOptions.titleId});
    if (queryOptions.departmentId) queryBuilder.andWhere(`${alias}.departmentId = :departmentId`, {departmentId: queryOptions.departmentId});
    if (queryOptions.statusId) queryBuilder.andWhere(`${alias}.statusId = :statusId`, {statusId: queryOptions.statusId});
    if (queryOptions.managerId) queryBuilder.andWhere(`${alias}.managerId = :managerId`, {managerId: queryOptions.managerId});
    if (queryOptions.description) queryBuilder.andWhere(`LOWER(${alias}.description) like :description`, {description: `%${queryOptions.description.toLowerCase()}%`});
  }

  public static generateSearchQuery(employeeRepository: IEmployeeRepository, queryOptions: EmployeeQuery) {
    const employeeAlias = "e";
    const accountAlias = "a";
    const queryBuilder = employeeRepository.createQueryBuilder(employeeAlias)
      .leftJoinAndSelect(`${employeeAlias}.department`, "department")
      .leftJoinAndSelect(`${employeeAlias}.manager`, "manager")
      .leftJoinAndSelect(`${employeeAlias}.status`, "status")
      .leftJoinAndSelect(`${employeeAlias}.title`, "title")
      .leftJoinAndSelect(`${employeeAlias}.createdBy`, "createdBy")
      .leftJoinAndSelect(`${employeeAlias}.updatedBy`, "updatedBy")
      .leftJoinAndSelect(`${employeeAlias}.employeeLimits`, "employeeLimit")
      .leftJoinAndSelect(`${employeeAlias}.employeeRegions`, "employeeRegion");
    if (queryOptions.isActive != null) {
      queryBuilder.andWhere(`${employeeAlias}.isActive = :isActive`, {isActive: queryOptions.isActive});
    }
    AccountQueryGenerator.generateSearchGeneralInfo(employeeAlias, queryBuilder, queryOptions);
    this.generateQuerySearchInfo(employeeAlias, queryBuilder, queryOptions);
    if (queryOptions.accountId !== undefined) {
      queryBuilder.leftJoin("account", "a", `${employeeAlias}.id = ${accountAlias}.employeeId`);
      if (queryOptions.accountId === null) queryBuilder.andWhere(`${accountAlias}.id IS NULL`);
      else queryBuilder.andWhere(`${accountAlias}.id = :accountId`, {accountId: queryOptions.accountId});
    }
    if (queryOptions.code) queryBuilder.andWhere(`LOWER(${employeeAlias}.code) like :code`, {code: `%${queryOptions.code.toLowerCase()}%`});
    return queryBuilder;
  }
}
