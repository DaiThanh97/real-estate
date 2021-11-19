import {
  IAccountNotificationRepository,
  INotificationManager,
  INotificationRepository
} from "../domain/services/contract";
import { Account } from "../domain/models/Account";
import { EventEmitterService } from "../infrastructure/config/beans";
import { EVENT } from "../infrastructure/config/constants/event";
import { AccountNotification } from "../infrastructure/orm/typeorm/models/AccountNotification";
import { QueryNotificationSerializer } from "../interfaces/serializers/NotificationSerializer";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";

export default class NotificationAppUseCases {
  public static async get(
    id: number,
    account: Account,
    beans: {
      accountNotificationRepository: IAccountNotificationRepository,
    },
  ): Promise<any> {
    return await beans.accountNotificationRepository.findOneOrFail({
      relations: ["createdBy", "updatedBy"],
      join: {
        alias: "accountNotification",
        leftJoinAndSelect: { notification: "accountNotification.notification" }
      },
      where: (qb: SelectQueryBuilder<unknown>) => {
        qb.where({
          id,
          accountId: account.id,
        });
        qb.andWhere("notification.isActive = :status", { status: true });
      },
    });
  }

  public static async getAll(queryOptions: QueryNotificationSerializer, account: Account, beans: {
    accountNotificationRepository: IAccountNotificationRepository,
  }): Promise<any> {
    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;

    const [result, total] = await beans.accountNotificationRepository.findAndCount({
      take: queryOptions.take,
      skip: queryOptions.skip,
      order,
      relations: ["createdBy", "updatedBy"],
      join: {
        alias: "accountNotification",
        leftJoinAndSelect: { notification: "accountNotification.notification" }
      },
      where: (qb: SelectQueryBuilder<unknown>) => {
        qb.where({
          accountId: account.id,
          ...(queryOptions.unread !== null ? { markAsRead: queryOptions.unread } : {})
        });
        qb.andWhere("notification.isActive = :status", { status: true });
      },
    }) as [Readonly<any[]>, number];

    return {
      data: result,
      total
    };
  }

  public static async create(notification: any,
                             accountId: number,
                             sendMoreAccounts: number[],
                             beans: {
                               notificationRepository: INotificationRepository,
                               accountNotificationRepository: IAccountNotificationRepository,
                               notificationManager: INotificationManager;
                               eventEmitter: EventEmitterService;
                             }): Promise<any> {
    const result = await beans.notificationManager.sendNotification(notification, accountId, sendMoreAccounts);
    beans.eventEmitter.emit(EVENT.SEND_NOTIFICATION, result.id);
    return result;
  }

  public static async markAsRead(id: number,
                                 account: Account,
                                 beans: {
                                   accountNotificationRepository: IAccountNotificationRepository,
                                 }): Promise<any> {
    await beans.accountNotificationRepository.findOneOrFail({
      join: {
        alias: "accountNotification",
        leftJoinAndSelect: { notification: "accountNotification.notification" }
      },
      where: (qb: SelectQueryBuilder<unknown>) => {
        qb.where({
          id,
          accountId: account.id,
        });
        qb.andWhere("notification.isActive = :status", { status: true });
      },
    });

    await beans.accountNotificationRepository.update(id, {
      markAsRead: true,
      updatedBy: account.id,
    });
    return this.get(id, account, beans);
  }

  public static async markAsReadAllNotification(account: Account,
                                                beans: {
                                                  accountNotificationRepository: IAccountNotificationRepository,
                                                }): Promise<any> {
    await beans.accountNotificationRepository
      .createQueryBuilder("accountNotification")
      .update(AccountNotification)
      .set({ markAsRead: true, updatedBy: account.id })
      .where("accountId = :accountId", { accountId: account.id })
      .andWhere("markAsRead = :markAsRead", { markAsRead: false })
      .execute();
  }
}
