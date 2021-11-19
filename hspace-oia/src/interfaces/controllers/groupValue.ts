import GroupValueUseCases from "../../application/GroupValueUseCases";
import { Account } from "../../domain/models/Account";
import { plainToClass } from "class-transformer";
import GroupValueSerializer, { GroupValueSearchSerializer } from "../serializers/GroupValueSerializer";
import { IGroupValue } from "../../infrastructure/orm/typeorm/models/GroupValue";
import { groupValueResponse, groupValuesResponse } from "../schemas/response";
import { addingGroupValueSchema, modifiedGroupValueSchema, searchGroupValueQuerySchema } from "../schemas/groupValue";
import { idSchema } from "../schemas/base";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Delete, Get, Post, Put } from "../routing-controllers/decorator/Methods";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { Param } from "../routing-controllers/decorator/Param";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Queries } from "../routing-controllers/decorator/Queries";
import { Payload } from "../routing-controllers/decorator/Payload";
import Beans from "../../infrastructure/config/beans";

@Controller("group_values", ["group_values"])
export default class GroupValueController {

  @Post({
    description: "Create new Group Value record.",
    validateSchemas: {
      payload: addingGroupValueSchema,
    },
    responseSchema: groupValueResponse,
  })
  public async createGroupValue(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: GroupValueSerializer
    }) dto: GroupValueSerializer,
  ): Promise<any> {
    const rv = await GroupValueUseCases.create(dto, account, serviceLocator);
    return plainToClass(GroupValueSerializer, rv, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}",
    description: "Update existing Group Value record.",
    validateSchemas: {
      params: idSchema,
      payload: modifiedGroupValueSchema,
    },
    responseSchema: groupValueResponse,
  })
  public async updateGroupValue(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Param("id") id: number,
    @Payload({
      type: GroupValueSerializer
    }) dto: GroupValueSerializer,
  ): Promise<any> {
    const rv = await GroupValueUseCases.update(id, dto, account, serviceLocator);
    return plainToClass(GroupValueSerializer, rv, { excludeExtraneousValues: true });
  }

  @Get({
    route: "/{id}",
    description: "Get Group Value by Id",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: groupValueResponse,
  })
  public async getGroupValue(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const rv: IGroupValue = await GroupValueUseCases.get(id, serviceLocator);
    return plainToClass(GroupValueSerializer, rv, { excludeExtraneousValues: true });
  }

  @Get({
    description: "Get Group Values records by Page.",
    validateSchemas: {
      query: searchGroupValueQuerySchema,
    },
    responseSchema: groupValuesResponse,
  })
  public async getGroupValues(
    @ServiceLocator() serviceLocator: Beans,
    @Queries({
      type: GroupValueSearchSerializer,
    }) queryOptions: GroupValueSearchSerializer,
  ): Promise<any> {
    const { data, total } = await GroupValueUseCases.getByFilterAndPage(queryOptions, serviceLocator);
    const serialize = plainToClass(GroupValueSerializer, data, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    }; 
  }

  @Delete({
    route: "/{id}",
    description: "Remove existing Group Value record.",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: groupValueResponse,
  })
  public async removeGroupValue(
    @ServiceLocator() serviceLocator: Beans,
    @Param("id") id: number,
  ): Promise<any> {
    const rv = await GroupValueUseCases.remove(id, serviceLocator);
    return plainToClass(GroupValueSerializer, rv, { excludeExtraneousValues: true });
  }
}
