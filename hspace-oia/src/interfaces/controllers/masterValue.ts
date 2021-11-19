import { plainToClass } from "class-transformer";
import MasterValueSerializer, { QueryMasterValueSerializer } from "../serializers/MasterValueSerializer";
import MasterValueAppUseCases from "../../application/MasterValueAppUseCases";
import { BadRequestError } from "../../infrastructure/error";
import { Account } from "../../domain/models/Account";
import { masterValueResponse, masterValuesResponse } from "../schemas/response";
import { masterValueSchema, modifiedMasterValueSchema, queryMasterValueSchema } from "../schemas/masterValue";
import { idSchema } from "../schemas/base";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Get, Post, Put } from "../routing-controllers/decorator/Methods";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { Param } from "../routing-controllers/decorator/Param";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Queries } from "../routing-controllers/decorator/Queries";
import { Payload } from "../routing-controllers/decorator/Payload";
import Beans from "../../infrastructure/config/beans";

@Controller("master_values", ["master_value"])
export default class MasterValueController {

  @Post({
    description: "Create new Master Value record.",
    validateSchemas: {
      payload: masterValueSchema,
    },
    responseSchema: masterValueResponse,
  })
  public async createMasterValue(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: MasterValueSerializer
    }) dto: MasterValueSerializer,
  ): Promise<any> {
    const rv = await MasterValueAppUseCases.create(dto, account, serviceLocator);
    return plainToClass(MasterValueSerializer, rv, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}",
    description: "Update existing Master Value record.",
    validateSchemas: {
      params: idSchema,
      payload: modifiedMasterValueSchema,
    },
    responseSchema: masterValueResponse,
  })
  public async updateMasterValue(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Param("id") id: number,
    @Payload({
      type: MasterValueSerializer
    }) dto: MasterValueSerializer,
  ): Promise<any> {
    if (dto.id !== id) {
      throw new BadRequestError();
    }
    const rv = await MasterValueAppUseCases.update(dto, account, serviceLocator);
    return plainToClass(MasterValueSerializer, rv, { excludeExtraneousValues: true });
  }

  @Get({
    description: "Get Master Values records by Page and Filters.",
    validateSchemas: {
      query: queryMasterValueSchema,
    },
    responseSchema: masterValuesResponse,
  })
  public async getMasterValues(
    @ServiceLocator() serviceLocator: Beans,
    @Queries({
      type: QueryMasterValueSerializer,
    }) queryOptions: QueryMasterValueSerializer,
  ): Promise<any> {
 
    const { data, total } = await MasterValueAppUseCases.getByFilterAndPage(queryOptions, serviceLocator);
    const serialize = plainToClass(MasterValueSerializer, data, { excludeExtraneousValues: true });
    return {
      items: serialize,
      total
    }; 
  }

  @Get({
    route: "/{id}",
    description: "Get Master Value by Id",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: masterValueResponse,
  })
  public async getMasterValue(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {   
    const rv = await MasterValueAppUseCases.get(id, serviceLocator);
    return plainToClass(MasterValueSerializer, rv, { excludeExtraneousValues: true });
  }
}
