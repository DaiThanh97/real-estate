import { Account } from "../../domain/models/Account";
import ConversationAppUseCases from "../../application/ConversationAppUseCases";
import { plainToClass } from "class-transformer";
import { ConversationSerializer, QueryParticipantSerializer } from "../serializers/ConversationSerializer";
import { PagingSerializer } from "../serializers/PagingSerializer";

import { addingConversationSchema, queryConversationSchema } from "../schemas/conversation";
import { conversationListResponse, conversationResponse } from "../schemas/response";
import { idSchema } from "../schemas/base";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Get, Post } from "../routing-controllers/decorator/Methods";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { Param } from "../routing-controllers/decorator/Param";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Queries } from "../routing-controllers/decorator/Queries";
import { Body } from "../routing-controllers/decorator/Body";
import { pagingQuerySchema } from "../schemas/query";
import Beans from "../../infrastructure/config/beans";

@Controller("conversations", ["conversation"])
export default class ConversationController {
  @Post({
    description: "Get or create conversation",
    validateSchemas: {
      payload: addingConversationSchema,
    },
    responseSchema: conversationResponse,
  })
  public async createConversation(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Body("accountId") accountId: number,
  ): Promise<any> {
    const rv = await ConversationAppUseCases.getOrCreate(accountId, account, serviceLocator);
    return plainToClass(ConversationSerializer, rv, { excludeExtraneousValues: true });
  }

  @Get({
    route: "/{id}/_messages",
    description: "Get conversation information with messages",
    validateSchemas: {
      params: idSchema,
      query: pagingQuerySchema,
    },
    responseSchema: conversationResponse,
  })
  public async getConversation(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @Queries({
      type: PagingSerializer,
    }) dto: PagingSerializer,
  ): Promise<any> {
    const rv = await ConversationAppUseCases.get(id, dto, serviceLocator);
    return plainToClass(ConversationSerializer, rv, { excludeExtraneousValues: true });
  }

  @Get({
    description: "Get conversations",
    validateSchemas: {
      query: queryConversationSchema,
    },
    responseSchema: conversationListResponse,
  })
  public async getAll(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Queries({
      type: QueryParticipantSerializer,
    }) dto: QueryParticipantSerializer,
  ): Promise<any> {
    const { data, total } = await ConversationAppUseCases.getAll(dto, account, serviceLocator);
    const serialize = plainToClass(ConversationSerializer, data, { excludeExtraneousValues: true });
    return {
      items: serialize,
      total
    }; 
  }
}
