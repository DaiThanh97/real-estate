import { Controller } from "../routing-controllers/decorator/Controller";
import { Get, Post } from "../routing-controllers/decorator/Methods";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { getResponseSchema, idSchema } from "../schemas/base";
import { Param } from "../routing-controllers/decorator/Param";
import { pagingQuerySchema } from "../schemas/query";
import { Queries } from "../routing-controllers/decorator/Queries";
import { PagingSerializer } from "../serializers/PagingSerializer";
import { postComment, topicSchema } from "../schemas/topic";
import TopicAppUseCases from "../../application/TopicAppUseCases";
import { plainToClass } from "class-transformer";
import { TopicSerializer } from "../serializers/TopicSerializer";
import { Body } from "../routing-controllers/decorator/Body";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Account } from "../../domain/models/Account";
import Beans from "../../infrastructure/config/beans";

const topicResponse = getResponseSchema(topicSchema, "TopicSchema");


@Controller("topics", ["topic"])
export default class TopicController {
  @Get({
    route: "/{id}/_comments",
    description: "Get comments of topic by ID",
    validateSchemas: {
      params: idSchema,
      query: pagingQuerySchema,
    },
    responseSchema: topicResponse,
    platforms: ["web", "mobile"],
  })
  public async get(
    @ServiceLocator() serviceLocator: Beans,
    @Param("id") id: number,
    @Queries({
      type: PagingSerializer,
    }) pagingOption: PagingSerializer,
  ): Promise<any> {
    const rv = await TopicAppUseCases.get(id, pagingOption, serviceLocator);
    return plainToClass(TopicSerializer, rv, { excludeExtraneousValues: true });
  }

  @Post({
    route: "/{id}/_comments",
    description: "Leave comment for the topic by ID",
    validateSchemas: {
      params: idSchema,
      query: pagingQuerySchema,
      payload: postComment,
    },
    responseSchema: topicResponse,
    platforms: ["web", "mobile"],
  })
  public async leaveComment(
    @ServiceLocator() serviceLocator: Beans,
    @Param("id") id: number,
    @Queries({
      type: PagingSerializer,
    }) pagingOption: PagingSerializer,
    @Body("content") content: string,
    @CurrentAccount() account: Account,
  ): Promise<any> {
    await TopicAppUseCases.createComment(id, content, account, serviceLocator);
    const rv = await TopicAppUseCases.get(id, pagingOption, serviceLocator);
    return plainToClass(TopicSerializer, rv, { excludeExtraneousValues: true });
  }
}
