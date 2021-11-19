import { MasterValue } from "../domain/models/MasterValue";
import { Account } from "../domain/models/Account";
import { QueryMasterValueSerializer } from "../interfaces/serializers/MasterValueSerializer";
import { plainToClass } from "class-transformer";
import { BadRequestError } from "../infrastructure/error";
import ErrorCode from "../infrastructure/config/constants/errorCode";
import { IMasterValueRepository } from "../domain/services/contract";
import { ILike } from "typeorm";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";

export default class MasterValueAppUseCases {
  public static async validate(payload: any, beans: {
    masterValueRepository: IMasterValueRepository,
  }): Promise<void> {
    if (payload.parentId) {
      await beans.masterValueRepository.findOneOrFail(payload.parentId);
    }
    const exist = await beans.masterValueRepository.findOne({
      where: {
        groupId: payload.groupId,
        valueCode: ILike(payload.valueCode),
        parentId: payload.parentId,
      }
    });
    if (exist) {
      if (payload.id === undefined || (payload.id && exist.id !== payload.id)) {
        throw new BadRequestError(
          "The master value information with parent already existed.",
          ErrorCode.MasterValue.Exist,
        );
      }
    }
  }

  public static async create(payload: any, account: Account, beans: {
    masterValueRepository: IMasterValueRepository,
  }): Promise<any> {
    await this.validate(payload, beans);
    const masterValue = MasterValue.createdByAccount(payload, account);
    const result = await beans.masterValueRepository.save(masterValue);

    return this.get(result.id, beans);
  }

  public static async update(payload: any, account: Account, beans: {
    masterValueRepository: IMasterValueRepository
  }): Promise<any> {
    await this.validate(payload, beans);
    const currentMasterValue = plainToClass(MasterValue, await this.get(payload.id, beans));
    if (payload.parentId) {
      currentMasterValue.checkParent(payload.parentId);
    }

    const masterValue: MasterValue = plainToClass(MasterValue, payload);
    masterValue.updatedByAccount(account);
    const result = await beans.masterValueRepository.save(masterValue);

    return this.get(result.id, beans);
  }

  public static async getByFilterAndPage(queryOptions: QueryMasterValueSerializer, beans: {
    masterValueRepository: IMasterValueRepository,
  }): Promise<any> {
    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;
    const [result, total] = await beans.masterValueRepository.findAndCount({
      take: queryOptions.take,
      skip: queryOptions.skip,
      order,
      relations: ["groupValue", "parent", "createdBy", "updatedBy"],
      join: {
        alias: "masterValue",
        leftJoinAndSelect: { 
          groupValue: "masterValue.groupValue",
          parent: "masterValue.parent",
        }
      },
      where: (qb: SelectQueryBuilder<unknown>) => {
        qb.where({
          ...(queryOptions.isActive !== null && queryOptions.isActive !== undefined ? { isActive: queryOptions.isActive } : {}),
          ...(queryOptions.groupId ? { groupId: queryOptions.groupId } : {}),
          ...(queryOptions.valueCode ? { valueCode: ILike(queryOptions.valueCode) } : {}),
          ...(queryOptions.valueName ? { valueName: ILike(queryOptions.valueName) } : {}),
          ...(queryOptions.parentId ? { parentId: queryOptions.parentId } : {}),
        });
        if (queryOptions.groupCode) {
          qb.andWhere("LOWER(groupValue.code) LIKE :groupCode", { groupCode: `%${queryOptions.groupCode.toLowerCase()}%` });
        }
        if (queryOptions.groupName) {
          qb.andWhere("LOWER(groupValue.name) LIKE :groupName", {groupName: `%${queryOptions.groupName.toLowerCase()}%`,
          });
        }
        if (queryOptions.parentValueName) {
          qb.andWhere("LOWER(parent.valueName) LIKE :parentValueName", {parentValueName: `%${queryOptions.parentValueName.toLowerCase()}%`});
        }
        if (queryOptions.parentValueCode) {
          qb.andWhere("LOWER(parent.valueCode) LIKE :parentValueName", {parentValueCode: `%${queryOptions.parentValueCode.toLowerCase()}%`});
        }
      },
    });
    let data: MasterValue[] = result;
    if (total > 0) {
      const usedItems = await beans.masterValueRepository.findUsedItems();
      data = MasterValue.checkUsedItems(data, usedItems);
    }
    return { data, total };
  }

  public static async get(id: number, beans: {
    masterValueRepository: IMasterValueRepository,
  }): Promise<any> {
    const masterValue = await beans.masterValueRepository.findOneOrFail({
      where: { id },
      relations: ["groupValue", "createdBy", "updatedBy", "parent", "children"]
    });

    const usedItems = await beans.masterValueRepository.findUsedItems();
    return MasterValue.checkUsedItem(masterValue, usedItems);
  }
}
