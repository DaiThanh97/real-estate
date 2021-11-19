import { Account } from "../../domain/models/Account";
import CollaboratorAppUseCases from "../../application/CollaboratorAppUseCases";
import { plainToClass } from "class-transformer";
import {
  CollaboratorChangeBasicInfoSerializer,
  CollaboratorCurrentSerializer,
  CollaboratorGroupQuery,
  CollaboratorSerializer
} from "../serializers/CollaboratorSerializer";

import { ILike } from "typeorm";
import { BadRequestError } from "../../infrastructure/error";
import { collaboratorCurrentResponse, collaboratorResponse, collaboratorsResponse } from "../schemas/response";
import {
  addingCollaboratorSchema,
  collaboratorChangeBasicInfoSchema,
  collaboratorQuerySchema,
  collaboratorSchema
} from "../schemas/collaborator";
import { idSchema } from "../schemas/base";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Get, Post, Put } from "../routing-controllers/decorator/Methods";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { Param } from "../routing-controllers/decorator/Param";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Payload } from "../routing-controllers/decorator/Payload";
import { Queries } from "../routing-controllers/decorator/Queries";
import Beans from "../../infrastructure/config/beans";

@Controller("collaborators", ["collaborator"])
export default class CollaboratorController {
  
  @Post({
    description: "Create new a collaborator",
    validateSchemas: {
      payload: addingCollaboratorSchema,
    },
    responseSchema: collaboratorResponse,
  })
  public async create(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: CollaboratorSerializer
    }) dto: CollaboratorSerializer,
  ): Promise<any> {
    const rv = await CollaboratorAppUseCases.create(dto, account, serviceLocator);
    return plainToClass(CollaboratorSerializer, rv, { excludeExtraneousValues: true });
  }

  @Get({
    route: "/{id}",
    description: "Get collaborator by ID",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: collaboratorResponse,
  })
  public async get(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const rv = await CollaboratorAppUseCases.get(id, serviceLocator);
    return plainToClass(CollaboratorSerializer, rv, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}",
    description: "Update a collaborator",
    validateSchemas: {
      params: idSchema,
      payload: collaboratorSchema,
    },
    responseSchema: collaboratorResponse,
  })
  public async update(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Param("id") id: number,
    @Payload({
      type: CollaboratorSerializer
    }) dto: CollaboratorSerializer,
  ): Promise<any> {
    if (dto.id !== id) {
      throw new BadRequestError();
    }
    const rv = await CollaboratorAppUseCases.update(dto, account, serviceLocator);
    return plainToClass(CollaboratorSerializer, rv, { excludeExtraneousValues: true });
  }

  @Get({
    description:  "Get collaborators list",
    validateSchemas: {
      query: collaboratorQuerySchema,
    },
    responseSchema: collaboratorsResponse,
  })
  public async getList(
    @ServiceLocator() serviceLocator: Beans,
    @Queries({
      type: CollaboratorGroupQuery,
    }) queryOptions: CollaboratorGroupQuery,
  ): Promise<any> {
    const query = {
      ...(queryOptions.fullName ? {fullName: ILike("%" + queryOptions.fullName + "%")} : {}),
      ...(queryOptions.email ? {email: ILike("%" + queryOptions.email + "%")} : {}),
      ...(queryOptions.phone ? {phone: ILike("%" + queryOptions.phone + "%")} : {}),
      ...(queryOptions.companyId ? {companyId: queryOptions.companyId} : {}),
      ...(queryOptions.collaboratorTypeId ? {collaboratorTypeId: queryOptions.collaboratorTypeId} : {})
    } as any;

    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;

    const [result, total] = await serviceLocator.collaboratorRepository.findAndCount({
      where: query,
      take: queryOptions.take,
      skip: queryOptions.skip,
      relations: [
        "company",
        "collaboratorType",
        "createdBy",
        "updatedBy",
      ],
      order,
    });
    const serialize = plainToClass(CollaboratorSerializer, result, {excludeExtraneousValues: true});

    return {
      items: serialize,
      total
    }; 
  }

  @Get({
    route: "/me",
    description: "Get current collaborator information",
    responseSchema: collaboratorCurrentResponse,
  })
  public async getCurrentCollaborator(
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const rv = await CollaboratorAppUseCases.getCurrentCollaborator(account, serviceLocator);
    return plainToClass(CollaboratorCurrentSerializer, rv, { excludeExtraneousValues: true });
  }

  @Post({
    route: "/changeBasicInfo",
    description: "Change current collaborator update basic info (birthday...)",
    validateSchemas: {
      payload: collaboratorChangeBasicInfoSchema,
    },
    responseSchema: collaboratorCurrentResponse,
  })
  public async changeBasicInfo(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: CollaboratorChangeBasicInfoSerializer
    }) dto: CollaboratorChangeBasicInfoSerializer,
  ): Promise<any> {
    const rv = await CollaboratorAppUseCases.changeBasicInfo(dto, account, serviceLocator);
    return plainToClass(CollaboratorCurrentSerializer, rv, { excludeExtraneousValues: true });
  }
}
