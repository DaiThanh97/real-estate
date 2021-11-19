import { Controller } from "../routing-controllers/decorator/Controller";
import { Get, Post } from "../routing-controllers/decorator/Methods";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { Queries } from "../routing-controllers/decorator/Queries";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Account } from "../../domain/models/Account";
import NotificationAppUseCases from "../../application/NotificationAppUseCases";
import { getResponseSchema, idSchema } from "../schemas/base";
import { Param } from "../routing-controllers/decorator/Param";
import { plainToClass } from "class-transformer";
import { AccountNotificationSerializer, QueryNotificationSerializer } from "../serializers/NotificationSerializer";
import {
  accountNotificationSchema,
  accountNotificationsSchema,
  queryNotificationSchema
} from "../schemas/notification";
import { successResponse } from "../schemas/response";
import Beans from "../../infrastructure/config/beans";


const accountNotificationResponse = getResponseSchema(accountNotificationSchema, "AccountNotificationResponse");
const accountNotificationsResponse = getResponseSchema(accountNotificationsSchema, "AccountNotificationsResponse");


@Controller("notifications", ["notification"])
export default class NotificationController {
  @Get({
    route: "/_account/{id}",
    description: "Get a notifications of the current user by Id",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: accountNotificationResponse,
  })
  public async get(@Param("id") id: number,
                   @CurrentAccount() account: Account,
                   @ServiceLocator() serviceLocator: Beans): Promise<any> {
    const rv = await NotificationAppUseCases.get(id, account, serviceLocator);
    return plainToClass(
      AccountNotificationSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }


  @Get({
    route: "/_account",
    description: "Get notifications of the user",
    validateSchemas: {
      query: queryNotificationSchema,
    },
    responseSchema: accountNotificationsResponse,
  })
  public async getList(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Queries({
      type: QueryNotificationSerializer,
    }) queryOptions: QueryNotificationSerializer,
  ) {
    const { data, total } = await NotificationAppUseCases.getAll(queryOptions, account, serviceLocator);

    const serialize = plainToClass(AccountNotificationSerializer, data, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Post({
    route: "/_account/{id}/mark_as_read",
    description: "Mark as read by notification id",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: accountNotificationResponse,
  })
  public async markAsRead(@Param("id") id: number,
                          @CurrentAccount() account: Account,
                          @ServiceLocator() serviceLocator: Beans): Promise<any> {
    const rv = await NotificationAppUseCases.markAsRead(id, account, serviceLocator);
    return plainToClass(
      AccountNotificationSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Post({
    route: "/_account/mark_as_read_all",
    description: "Mark as read all notification",
    responseSchema: successResponse,
  })
  public async markAsReadAllNotification(
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    await NotificationAppUseCases.markAsReadAllNotification(account, serviceLocator);
    return { success: true };
  }
}
