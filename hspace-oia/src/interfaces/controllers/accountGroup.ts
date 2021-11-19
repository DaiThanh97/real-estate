import { Account } from "../../domain/models/Account";
import { plainToClass } from "class-transformer";
import AccountGroupAppUseCases from "../../application/AccountGroupAppUseCases";
import { AccountGroupQuery, AccountGroupSerializer } from "../serializers/AccountGroupSerializer";
import { BadRequestError } from "../../infrastructure/error";
import { ILike } from "typeorm";

import { idSchema } from "../schemas/base";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Get, Post, Put, Delete } from "../routing-controllers/decorator/Methods";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { Param } from "../routing-controllers/decorator/Param";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Payload } from "../routing-controllers/decorator/Payload";
import { Queries } from "../routing-controllers/decorator/Queries";
import { accountGroupResponse, accountGroupsResponse, msgResponse} from "../schemas/response";
import { accountGroupQuerySchema, accountGroupSchema } from "../schemas/accountGroup";
import Beans from "../../infrastructure/config/beans";
import { ACTIONS } from "../../infrastructure/config/constants/actions";

const actions = ACTIONS.NTK;
const resource = "account_group";

@Controller("account_groups", ["account_group"])
export default class AccountGroupController {

  @Post({
    description: "Create new account group",
    validateSchemas: {
      payload: accountGroupSchema,
    },
    responseSchema: accountGroupResponse,
  })
  public async create(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: AccountGroupSerializer
    }) dto: AccountGroupSerializer,
  ): Promise<any> {
    const rv = await AccountGroupAppUseCases.create(dto, account, serviceLocator);
    return plainToClass(AccountGroupSerializer, rv, { excludeExtraneousValues: true });
  }

  @Get({
    description: "Get account group list",
    validateSchemas: {
      query: accountGroupQuerySchema,
    },
    responseSchema: accountGroupsResponse,
  })
  public async getList(
    @ServiceLocator() serviceLocator: Beans,
    @Queries({
      type: AccountGroupQuery,
    }) queryOptions: AccountGroupQuery,
  ): Promise<any> {

    const query = {
      ...(queryOptions.name ? { name: ILike("%" + queryOptions.name + "%") } : {}),
      ...(queryOptions.description ? { description: ILike("%" + queryOptions.description + "%") } : {}),
      ...(queryOptions.code ? { code: ILike("%" + queryOptions.code + "%") } : {}),
      ...(queryOptions.isActive != null ? { isActive: queryOptions.isActive } : {}),
      isDeleted: false,
    } as any;

    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;

    const [result, total] = await serviceLocator.accountGroupRepository.findAndCount({
      where: query,
      take: queryOptions.take,
      skip: queryOptions.skip,
      relations: [
        "accountGroupResources",
        "accountGroupFeatures",
        "createdBy",
        "updatedBy",
        "accountGroupResources.updatedBy",
        "accountGroupResources.createdBy",
        "accountGroupFeatures.updatedBy",
        "accountGroupFeatures.createdBy",
        "accountGroupFeatures.feature",
        "accountGroupResources.resource",
      ],
      order,
    });
    const serialize = plainToClass(AccountGroupSerializer, result, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Get({
    route: "/{id}",
    description: "Get account group by ID",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: accountGroupResponse,
  })
  public async get(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const rv = await AccountGroupAppUseCases.get(id, serviceLocator);
    return plainToClass(AccountGroupSerializer, rv, { excludeExtraneousValues: true, });
  }

  @Put({
    route: "/{id}",
    description: "Update account group by ID",
    validateSchemas: {
      params: idSchema,
      payload: accountGroupSchema,
    },
    responseSchema: accountGroupResponse,
  })
  public async update(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Param("id") id: number,
    @Payload({
      type: AccountGroupSerializer
    }) dto: AccountGroupSerializer,
  ): Promise<any> {
    if (dto.id !== id) {
      throw new BadRequestError();
    }
    const rv = await AccountGroupAppUseCases.update(dto, account, serviceLocator);
    return plainToClass(AccountGroupSerializer, rv, { excludeExtraneousValues: true });
  }

  @Delete({
    route: "/{id}",
    description: "Delete account group by id",
    validateSchemas: {
      params: idSchema
    },
    responseSchema: msgResponse,
    policy: {
      res: resource,
      act: actions.DELETE,
    },
    platforms: ["web"],
    secure: true,
  })
  public async delete(
    @ServiceLocator() serviceLocator: Beans,
    @Param("id") id: number,
    @CurrentAccount() account: Account,
  ): Promise<any> {
    await AccountGroupAppUseCases.delete(id, account, serviceLocator);
    return { msg: "The account group has been deleted.", success: true };
  }
}
