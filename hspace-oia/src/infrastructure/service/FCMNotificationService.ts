import {
  FCM_DEFAULT_OPTIONS,
  messaging,
  MessagingNameSpace,
} from "../config/firebase";
import logger from "../logger";
import { IFCMNotificationService } from "./contract/IFCMNotificationService";

export class FCMNotificationService implements IFCMNotificationService {
  public async sendToDevice({
    tokens,
    title,
    message,
    data,
    options = {},
  }: {
    tokens: string | string[];
    title: string;
    message: string;
    data?: any;
    options?: any;
  }): Promise<boolean | MessagingNameSpace.MessagingDevicesResponse> {
    try {
      let payload: MessagingNameSpace.MessagingPayload = {
        notification: {
          title,
          body: message,
        },
      };
      if (data) {
        payload = { ...payload, data };
      }
      return await messaging.sendToDevice(tokens, payload, {
        ...FCM_DEFAULT_OPTIONS,
        ...options,
      });
    } catch (e) {
      logger.error("Halato FCMNotificationService_sendToDevice", { error: e });
    }
    return false;
  }

  public async sendToTopic({
    topic,
    title,
    message,
    data,
    options = {},
  }: {
    topic: string;
    title: string;
    message: string;
    data?: any;
    options?: any;
  }): Promise<boolean | MessagingNameSpace.MessagingTopicResponse> {
    try {
      let payload: MessagingNameSpace.MessagingPayload = {
        notification: {
          title,
          body: message,
        },
      };
      if (data) {
        payload = { ...payload, data };
      }
      return await messaging.sendToTopic(topic, payload, {
        ...FCM_DEFAULT_OPTIONS,
        ...options,
      });
    } catch (e) {
      logger.error("Halato FCMNotificationService_sendToTopic", { error: e });
    }
    return false;
  }
}
