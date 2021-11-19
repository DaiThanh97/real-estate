import { GroupValue } from "../domain/models/GroupValue";
import { Account } from "../domain/models/Account";
import { plainToClass } from "class-transformer";
import { BadRequestError } from "../infrastructure/error";
import { ILike, In } from "typeorm";
import { GroupValueSearchSerializer } from "../interfaces/serializers/GroupValueSerializer";
import logger from "../infrastructure/logger";
import ErrorCode from "../infrastructure/config/constants/errorCode";
import { IGroupValueRepository, IMasterValueRepository } from "../domain/services/contract";

export default class GroupValueUseCases {
  public static async create(payload: any, account: Account, beans: {
    groupValueRepository: IGroupValueRepository
  }): Promise<any> {
    const exist = await beans.groupValueRepository.findOne({
      where: {
        code: ILike(payload.code),
        name: ILike(payload.name),
        parentId: payload.parentId
      }
    });
    if (exist) {
      throw new BadRequestError("Group Value with this code and name with parent already existed !", ErrorCode.GroupValue.ExistCodeAndNameWithParent);
    }
    const groupValue = GroupValue.createByAccount(payload, account);
    await beans.groupValueRepository.insert(groupValue);
    return groupValue;
  }

  public static async validateBeforeUpdate(id: number, payload: any, beans: {
    groupValueRepository: IGroupValueRepository,
    masterValueRepository: IMasterValueRepository,
  }): Promise<void> {
    if (payload.code && payload.name) {
      const exist = await beans.groupValueRepository.findOne({
        where: {
          code: ILike(payload.code),
          name: ILike(payload.name),
          parentId: payload.parentId
        }
      });
      if (exist && exist.id.toString() !== id.toString()) {
        throw new BadRequestError("Group Value with this code and name with parent already existed !", ErrorCode.GroupValue.ExistCodeAndNameWithParent);
      }
    }

    const groupValueCurrent: GroupValue = await this.get(id, beans);
    const hasChangeStatus = !payload.isActive && payload.isActive !== groupValueCurrent.isActive;
    if(hasChangeStatus){
      const existInMasterValue = await beans.masterValueRepository.findOne({
        where: {
          groupId: id
        }
      });
      if (existInMasterValue) {
        throw new BadRequestError("Don't DeActive Group Value used in master value!",  ErrorCode.GroupValue.UsedInMasterValue);
      }
    }
  }

  public static async update(id: number, payload: any, account: Account, beans: { groupValueRepository: IGroupValueRepository, masterValueRepository: IMasterValueRepository }): Promise<any> {
    await this.validateBeforeUpdate(id, payload, beans);
    payload.id = id;
    const groupValue: GroupValue = plainToClass(GroupValue, payload);

    groupValue.updateByAccount(account);
    const allGroupValues = await beans.groupValueRepository.find({});
    groupValue.checkParentGroupValueIsChild(allGroupValues);
    await beans.groupValueRepository.save(groupValue);

    return await this.get(id, beans);
  }

  public static async get(id: number, beans: {
    groupValueRepository: IGroupValueRepository,
  }): Promise<any> {
    return await beans.groupValueRepository.findOneOrFail({
      where: { id },
      relations: ["createdBy", "updatedBy", "parent"]
    });
  }

  public static async getByFilterAndPage(searchOptions: GroupValueSearchSerializer, beans: {
    groupValueRepository: IGroupValueRepository,
  }): Promise<any> {
    const order = {} as any;
    order[searchOptions.orderField] = searchOptions.order;
    const [result, total] = await beans.groupValueRepository.findAndCount({
      take: searchOptions.take,
      skip: searchOptions.skip,
      where: {
        ...(searchOptions.code ? { code: ILike(`%${searchOptions.code}%`) } : {}),
        ...(searchOptions.name ? { name: ILike(`%${searchOptions.name}%`) } : {}),
        ...(searchOptions.parentIds.length ? { parentId: In(searchOptions.parentIds) } : {}),
        ...(searchOptions.isActive !== null ? { isActive: searchOptions.isActive } : {})
      },
      order,
      relations: ["createdBy", "updatedBy", "parent"]
    });
    return {
      data: result,
      total
    };
  }

  public static async remove(id: number, beans: {
    groupValueRepository: IGroupValueRepository,
  }): Promise<any> {
    const groupValue = await this.get(id, beans);
    try {
      return await beans.groupValueRepository.remove(groupValue);
    } catch (e) {
      logger.info("Delete group value", e);
      throw new BadRequestError("Can't remove this group value");
    }
  }
}
