import { EAccountType } from "../../domain/models/Account";
import { Brackets } from "typeorm";
import { AccountQuery } from "../../interfaces/serializers/AccountSerializer";
import { EmployeeQueryGenerator } from "./EmployeeQueryGenerator";
import { IAccountRepository } from "../../domain/services/contract";

export class AccountQueryGenerator {
  public static generateSearchGeneralInfo(alias: string, queryBuilder: any, queryOptions: any) {
    if (queryOptions.fullName) {
      queryBuilder.andWhere(`LOWER(${alias}.fullName) like :fullName`, {fullName: `%${queryOptions.fullName.toLowerCase()}%`});
    }
    if (queryOptions.phone) {
      queryBuilder.andWhere(`${alias}.phone like :phone`, {phone: `%${queryOptions.phone}%`});
    }
    if (queryOptions.email) {
      queryBuilder.andWhere(`LOWER(${alias}.email) like :email`, {email: `%${queryOptions.email.toLowerCase()}%`});
    }
  }

  public static generateSearchQuery(accountRepository: IAccountRepository, queryOptions: AccountQuery) {
    const employeeAlias = "e";
    const collaboratorAlias = "c";
    const accountAlias = "a";
    const accountAccountGroupAlias = "aag";
    const queryBuilder = accountRepository.createQueryBuilder(accountAlias)
      .leftJoinAndSelect(`${accountAlias}.employee`, "employee")
      .leftJoinAndSelect(`${accountAlias}.collaborator`, "collaborator")
      .leftJoinAndSelect(`${accountAlias}.createdBy`, "createdBy")
      .leftJoinAndSelect(`${accountAlias}.updatedBy`, "updatedBy")
      .leftJoinAndSelect(`${accountAlias}.accountAccountGroups`, "accountAccountGroups");
    queryBuilder.where(`${accountAlias}.type != :admin`, {admin: EAccountType.ADMIN});
    if (queryOptions.isActive != null) {
      queryBuilder.andWhere(`${accountAlias}.isActive = :isActive`, {isActive: queryOptions.isActive});
    }
    if (queryOptions.displayName) {
      queryBuilder.andWhere(`LOWER(${accountAlias}.displayName) like :displayName`, {displayName: `%${queryOptions.displayName.toLowerCase()}%`});
    }
    if (queryOptions.identityName) {
      queryBuilder.andWhere(`LOWER(${accountAlias}.identityName) like :identityName`, {identityName: `%${queryOptions.identityName.toLowerCase()}%`});
    }
    if (queryOptions.code) {
      queryBuilder.andWhere(`LOWER(${accountAlias}.code) like :code`, {code: `%${queryOptions.code.toLowerCase()}%`});
    }
    if (queryOptions.type) {
      queryBuilder.andWhere(`${accountAlias}.type = :type`, {type: queryOptions.type.toString()});
    }
    if (queryOptions.type) {
      if (queryOptions.type === EAccountType.EMPLOYEE) {
        queryBuilder.innerJoin("employees", employeeAlias, `${employeeAlias}.id = ${accountAlias}.employeeId`);
        this.generateSearchGeneralInfo(employeeAlias, queryBuilder, queryOptions);
        EmployeeQueryGenerator.generateQuerySearchInfo(employeeAlias, queryBuilder, queryOptions);
      } else {
        queryBuilder.innerJoin("collaborators", collaboratorAlias, `${collaboratorAlias}.id = ${accountAlias}.collaboratorId`);
        this.generateSearchGeneralInfo(collaboratorAlias, queryBuilder, queryOptions);
        if (queryOptions.companyId) queryBuilder.andWhere(`${collaboratorAlias}.companyId = :companyId`, {companyId: queryOptions.companyId});
        if (queryOptions.collaboratorTypeId) queryBuilder.andWhere(`${collaboratorAlias}.collaboratorTypeId = :collaboratorTypeId`, {collaboratorTypeId: queryOptions.collaboratorTypeId});
      }
    } else {
      queryBuilder
        .leftJoin("employees", employeeAlias, `${employeeAlias}.id = ${accountAlias}.employeeId`)
        .leftJoin("collaborators", collaboratorAlias, `${collaboratorAlias}.id = ${accountAlias}.collaboratorId`);
      if (queryOptions.fullName) {
        queryBuilder.andWhere(new Brackets(qb => {
          qb.where(`LOWER(${employeeAlias}.fullName) like :fullName`, {fullName: `%${queryOptions.fullName.toLowerCase()}%`})
            .orWhere(`LOWER(${collaboratorAlias}.fullName) like :fullName`, {fullName: `%${queryOptions.fullName.toLowerCase()}%`});
        }));
      }
      if (queryOptions.phone) {
        queryBuilder.andWhere(new Brackets(qb => {
          qb.where(`${employeeAlias}.phone like :phone`, {phone: `%${queryOptions.phone}%`})
            .orWhere(`${collaboratorAlias}.phone like :phone`, {phone: `%${queryOptions.phone}%`});
        }));
      }
      if (queryOptions.email) {
        queryBuilder.andWhere(new Brackets(qb => {
          qb.where(`LOWER(${employeeAlias}.email) like :email`, {email: `%${queryOptions.email.toLowerCase()}%`})
            .orWhere(`LOWER(${collaboratorAlias}.email) like :email`, {email: `%${queryOptions.email.toLowerCase()}%`});
        }));
      }
      EmployeeQueryGenerator.generateQuerySearchInfo(employeeAlias, queryBuilder, queryOptions);
      if (queryOptions.companyId) queryBuilder.andWhere(`${collaboratorAlias}.companyId = :companyId`, {companyId: queryOptions.companyId});
      if (queryOptions.collaboratorTypeId) queryBuilder.andWhere(`${collaboratorAlias}.collaboratorTypeId = :collaboratorTypeId`, {collaboratorTypeId: queryOptions.collaboratorTypeId});
    }
    if (queryOptions.accountGroupId) {
      queryBuilder
        .innerJoin("account_account_groups", accountAccountGroupAlias, `${accountAccountGroupAlias}.accountId = ${accountAlias}.id`);
      queryBuilder.andWhere(`${accountAccountGroupAlias}.accountGroupId = :accountGroupId`, {accountGroupId: queryOptions.accountGroupId});
    }
    return queryBuilder;
  }
}
