import { plainToClass } from "class-transformer";
import ResourceAppUseCases from "../../application/ResourceAppUseCases";
import ResourceSerializer from "../serializers/ResourceSerializer";
import { Account } from "../../domain/models/Account";
import { KeywordSerializer } from "../serializers/KeywordSerializer";
import { ILike } from "typeorm";
import { keywordQuerySchema } from "../schemas/query";
import { resourceResponse, resourcesResponse } from "../schemas/response";
import { resourceSchema } from "../schemas/resource";
import { idSchema } from "../schemas/base";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Get, Post } from "../routing-controllers/decorator/Methods";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { Param } from "../routing-controllers/decorator/Param";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Queries } from "../routing-controllers/decorator/Queries";
import { Payload } from "../routing-controllers/decorator/Payload";
import Beans from "../../infrastructure/config/beans";

@Controller("resources", ["resource"])
export default class ResourceController {

  @Post({
    description: "Create new resource",
    validateSchemas: {
      payload: resourceSchema,
    },
    responseSchema: resourceResponse,
  })
  public async create(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: ResourceSerializer
    }) dto: ResourceSerializer,
  ): Promise<any> {
    const rv = await ResourceAppUseCases.create(dto, account, serviceLocator);
    return plainToClass(ResourceSerializer, rv, { excludeExtraneousValues: true });
  }

  @Get({
    description: "Get resource list by keyword",
    validateSchemas: {
      query: keywordQuerySchema,
    },
    responseSchema: resourcesResponse,
  })
  public async getList(
    @ServiceLocator() serviceLocator: Beans,
    @Queries({
      type: KeywordSerializer,
    }) queryOptions: KeywordSerializer,
  ): Promise<any> {
    const query = {
      ...(queryOptions.keyword ? { name: ILike("%" + queryOptions.keyword + "%") } : {}),
      ...(queryOptions.isActive != null ? { isActive: queryOptions.isActive } : {}),
    } as any;

    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;

    const [result, total] = await serviceLocator.resourceRepository.findAndCount({
      where: query,
      take: queryOptions.take,
      skip: queryOptions.skip,
      relations: ["features", "createdBy", "updatedBy", "features.updatedBy", "features.createdBy"],
      order,
      cache: 60000
    });

    const serialize = plainToClass(ResourceSerializer, result, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    }; 
  }

  @Get({
    route: "/{id}",
    description: "Get a resource by ID",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: resourceResponse,
  })
  public async get(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
   
    const rv = await serviceLocator.resourceRepository.findOneOrFail({
      where: { id },
      relations: ["features", "createdBy", "updatedBy", "features.updatedBy", "features.createdBy"],
    });

    return plainToClass(ResourceSerializer, rv, { excludeExtraneousValues: true });
  }
}
