import { Account, EAccountType } from "../../domain/models/Account";
import { EmployeeRegion } from "../../domain/models/Employee";
import constants from "../../infrastructure/config/constants";
import {
  Between,
  getManager,
  ILike,
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Raw
} from "typeorm";
import { IQuerySerializer } from "../../interfaces/serializers/QuerySerializer";
import MasterValueSerializer from "../../interfaces/serializers/MasterValueSerializer";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";

export class Utilities {

  public static async currentTime(): Promise<Date> {
    return new Date();
  }

  public static async setStartDate(date: Date): Promise<void> {
    if (date) date.setHours(0, 0, 0);
  }

  public static async setEndDate(date: Date): Promise<void> {
    if (date) date.setHours(23, 59, 59);
  }

  public static async getFirstDayMonth(date: Date): Promise<Date> {
    const dateNew = new Date(date.getFullYear(), date.getMonth(), 1);
    await this.setStartDate(dateNew);
    return dateNew;
  }

  public static async getLastDayMonth(date: Date): Promise<Date> {
    const dateNew = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    await this.setEndDate(dateNew);
    return dateNew;
  }

  public static buildQueryEmployeeRule(
    account: Account,
    propertyAlias: string,
    qb: SelectQueryBuilder<unknown>
  ) {
    if (account.type === EAccountType.EMPLOYEE) {
      const districtCol = propertyAlias ? `${propertyAlias}.district_id` : "district_id";
      const priceCol = propertyAlias ? `${propertyAlias}.price` : "price";

      const districtIds = (account.employee?.employeeRegions || []).filter(obj => obj.isActive).map((el: EmployeeRegion) => el.districtId);
      if (districtIds.length > 0) {
        qb.andWhere(`(CASE WHEN ${districtCol} IS NULL THEN ${districtIds[0]} ELSE ${districtCol} END) IN (:...districtIds)`, { districtIds });
      }
      const employeeLimitPKT = (account.employee?.employeeLimits || []).find(
        el => el.type?.valueCode === constants.EmployeeLimit.PKT && el.isActive,
      );
      if (employeeLimitPKT) {
        qb.andWhere(`(CASE WHEN ${priceCol} IS NULL OR ${priceCol} = 0 THEN :priceFrom ELSE ${priceCol} END) >= :priceFrom`, { priceFrom: employeeLimitPKT.value });
      }

      const employeeLimitPKD = (account.employee?.employeeLimits || []).find(
        el => el.type?.valueCode === constants.EmployeeLimit.PKD && el.isActive,
      );
      if (employeeLimitPKD) {
        qb.andWhere(`(case WHEN ${priceCol} IS NULL OR ${priceCol} = 0 THEN :priceTo ELSE ${priceCol} END) <= :priceTo`, { priceTo: employeeLimitPKD.value });
      }
    }
  }

  public static appendQueryUserPlatform(isUserWeb: boolean) {
    return (isUserWeb ? { type: Not(EAccountType.COLLABORATOR) } : { type: EAccountType.COLLABORATOR });
  }

  public static buildWhereSearchFromAndTo(fromValue: any | null | undefined, toValue: any | null | undefined, colName: string) {
    return {
      ...(fromValue && !toValue ? { [colName]: MoreThanOrEqual(fromValue) } : {}),
      ...(toValue && !fromValue ? { [colName]: LessThanOrEqual(toValue) } : {}),
      ...(fromValue && toValue ? { [colName]: Between(fromValue, toValue) } : {}),
    };
  }

  public static convertRawDataQueryToObject(ret: any): Promise<any> {
    if (ret && ret.length > 0) {
      const prefix = "."; // e.g: createdBy.id, createdBy.displayName will convert to createdBy: { id, 1, displayName: 'xxx' }
      ret.forEach((e: any) => {
        Object.keys(e).forEach(key => {
          if (key.indexOf(prefix) !== -1 && e[key]) {
            const nameStart = key.substring(0, key.indexOf(prefix));
            const nameLast = key.substring(key.indexOf(prefix) + 1, key.length);
            if (!e[nameStart]) {
              e[nameStart] = {};
            }
            e[nameStart][nameLast] = e[key];
            delete e[key];
          }
        });
      });
    }
    return ret;
  }

  public static buildAndWhereSearchDate(
    aliasName: string,
    fieldName: string,
    dateSearch: Date,
    qb: SelectQueryBuilder<unknown>,
  ) {
    const dateOptions = {
      before: new Date(dateSearch),
      after: new Date(dateSearch),
    };
    Utilities.setStartDate(dateOptions.before);
    Utilities.setEndDate(dateOptions.after);
    const nameBeforeSearch = `${fieldName}Before`;
    const nameAfterSearch = `${fieldName}After`;
    qb.andWhere(`${aliasName}.${fieldName} >= :${nameBeforeSearch}`, { [nameBeforeSearch]: dateOptions.before });
    qb.andWhere(`${aliasName}.${fieldName} <= :${nameAfterSearch}`, { [nameAfterSearch]: dateOptions.after });
  }

  public static buildQueryAccountRule(
    account: Account,
    propertyAlias: string,
    draftingStatus: string,
    qb: SelectQueryBuilder<unknown>,
  ) {
    const createdByCol = `${propertyAlias}.created_by`;
    const statusCol = `${propertyAlias}.status`;
    if (account.type === EAccountType.EMPLOYEE) {
      qb.andWhere(`(CASE WHEN ${statusCol} = '${draftingStatus}' THEN ${createdByCol} ELSE ${account.id} END) = :propAccountCreatedBy `, { propAccountCreatedBy: account.id });
    }
  }

  public static async refreshTableView(viewName: string): Promise<void> {
    const manager = getManager();
    await manager.query(`REFRESH MATERIALIZED VIEW ${viewName}`);
  }

  public static buildWhereQuery(queryOptions: IQuerySerializer): any {
    const queryWhere = {} as any;

    if (queryOptions.match && queryOptions.match.length > 0) {
      for (const { field, query } of queryOptions.match) {
        if (query === null) {
          queryWhere[field] = IsNull();
        }

        if (query !== null && query !== undefined) {
          queryWhere[field] = query;
        }
      }
    }

    if (queryOptions.queryString && queryOptions.queryString.length > 0) {
      for (const { field, query } of queryOptions.queryString) {
        if (query && query !== "") {
          queryWhere[field] = ILike(`%${query}%`);
        }
      }
    }

    if (queryOptions.range && queryOptions.range.length > 0) {
      for (const { field, query } of queryOptions.range) {
        if (!query.gt && !query.gte && !query.lt && !query.lte) {
          continue;
        }

        if (query.gt && !query.gte && !query.lt && !query.lte) {
          queryWhere[field] = MoreThan(query.gt);
        } else if (!query.gt && query.gte && !query.lt && !query.lte) {
          queryWhere[field] = MoreThanOrEqual(query.gte);
        } else if (!query.gt && !query.gte && query.lt && !query.lte) {
          queryWhere[field] = LessThan(query.lt);
        } else if (!query.gt && !query.gte && !query.lt && query.lte) {
          queryWhere[field] = LessThanOrEqual(query.lte);
        } else if (query.gte && query.lte) {
          queryWhere[field] = Between(query.gte, query.lte);
        } else if (query.gt && query.lte) {
          queryWhere[field] = Raw(
            (alias: string) => `${alias} <= :lte AND ${alias} > :gt`,
            {
              lte: query.lte,
              gt: query.gt,
            });
        } else if (query.gte && query.lt) {
          queryWhere[field] = Raw(
            (alias: string) => `${alias} < :lt AND ${alias} >= :gte`,
            {
              lt: query.lt,
              gte: query.gte,
            });
        } else if (query.gt && query.lt) {
          queryWhere[field] = Raw(
            (alias: string) => `${alias} < :lt AND ${alias} > :gt`,
            {
              lt: query.lt,
              gt: query.gt,
            });
        }
      }
    }

    return queryWhere;
  }

  public static generateAddress(streetNumber: string, street: MasterValueSerializer, ward: MasterValueSerializer, district: MasterValueSerializer, city: MasterValueSerializer) {
    let addressBuilder = "";
    if (streetNumber) {
      addressBuilder = addressBuilder.concat(`${streetNumber}, `);
    }
    if (street) {
      addressBuilder = addressBuilder.concat(`${street.valueName}, `);
    }
    if (ward) {
      addressBuilder = addressBuilder.concat(`${ward.valueName}, `);
    }
    if (district) {
      addressBuilder = addressBuilder.concat(
        `${district.valueName}, `
      );
    }
    if (city) {
      addressBuilder = addressBuilder.concat(`${city.valueName}, `);
    }
    return addressBuilder.trim();
  }

  public static increasePatchVersion(version: string): string {
    if (!version) {
      return "1.000";
    }
    const versionElements = version.split(".");
    const patch = parseInt(versionElements[1], 10) + 1;
    const pathStr = patch.toString().padStart(3, "0");
    return `${versionElements[0]}.${pathStr}`;
  }

  public static increaseMajorVersion(version: string): string {
    if (!version) {
      return "1.000";
    }
    const versionElements = version.split(".");
    const major = parseInt(versionElements[0], 10) + 1;
    const majorStr = major.toString();
    return `${majorStr}.000`;
  }
}
