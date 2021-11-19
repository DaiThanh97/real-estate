import Beans from "../../../infrastructure/config/beans";
import logger from "../../../infrastructure/logger";
import events from "../events";
import { plainToClass } from "class-transformer";
import { AccountNotificationSerializer } from "../../serializers/NotificationSerializer";
import { EAccountType } from "../../../domain/models/Account";
import _ from "lodash";

export class NotificationController {
  private io: any;
  private beans: Beans;

  constructor(io: any, beans: Beans) {
    this.io = io;
    this.beans = beans;
  }

  public sendNotification = async (req: any) => {
    if (!req.notificationId) {
      logger.error("The request data is not valid.");
      return;
    }
    const notification = await this.beans.notificationRepository.findOneOrFail(req.notificationId);
    logger.info(`Found the notification: ${notification.id}`);

    const accountNotifications = await this.beans.accountNotificationRepository.find({
      where: {
        notificationId: notification.id,
      },
      relations: ["account", "notification"]
    });
    const accountNotificationsForWeb = _.filter(accountNotifications, (ac) => ac.account.type !== EAccountType.COLLABORATOR);
    const accountNotificationsForMobile = _.filter(accountNotifications, (ac) => ac.account.type === EAccountType.COLLABORATOR);
    const requestsForWeb = await this.requestsForWeb(notification.id, accountNotificationsForWeb);
    const requestsForMobile = await this.requestsForMobile(notification.id, accountNotificationsForMobile);
    const requests = _.union(requestsForWeb, requestsForMobile);
    return Promise.all(requests).then(() => {
      logger.info(`The notification '${notification.id}' has been sent!`);
    });
  };

  private requestsForWeb = async (notificationId: number, accountNotifications: any) => {
    const requests: Promise<void>[] = accountNotifications.map(async (accountNotification: { account: { identityName: string }; }) => {
      return new Promise<void>((resolve, _) => {
        const result = plainToClass(AccountNotificationSerializer, accountNotification, {
          excludeExtraneousValues: true,
        });
        const identityName = accountNotification.account.identityName;
        logger.info(`Send notification '${notificationId}' to account: '${identityName}'.'`);
        this.io.to(identityName).emit(events.Notification, result);
        return resolve();
      });
    });
    return requests;
  }

  private requestsForMobile = async (notificationId: number, accountNotifications: any) => {
    const requests: Promise<void>[] = [];
    if (_.size(accountNotifications) === 0) {
      return requests;
    }
    const accountCollaboratorIds: number[] = _.map(accountNotifications, (el) => el.account.id);
    const deviceTokens: string[] = await this.beans.accountDeviceTokenManager.getTokesFromAccountIds(accountCollaboratorIds);
    if (_.size(deviceTokens) === 0) {
      logger.info(`The notification '${notificationId}' for mobile not found device tokens!`);
      return requests;
    }
    const result = plainToClass(AccountNotificationSerializer, accountNotifications[0], {
      excludeExtraneousValues: true,
    });
    const contentData = await this.buildContentSendMobile(result, deviceTokens);
    const req = new Promise<void>((resolve, _) => {
      logger.info(`Send notification '${notificationId}' for mobile to device tokens: '${deviceTokens}'.`);
      this.beans.fcmNotificationService.sendToDevice({...contentData});
      return resolve();
    });
    requests.push(req);
    return requests;
  };

  private buildContentSendMobile = async (accountNotification: AccountNotificationSerializer, deviceTokens: string[]) => {
     const title = accountNotification.notification.group;
     const message = accountNotification.notification.content;
     // Note: firebase not accept value is int -> convert to string value
     const data = _.mapValues(accountNotification.notification, (_value) => `${_value}`);
    return {
      tokens: deviceTokens,
      title,
      message,
      data
    };
  }

}
