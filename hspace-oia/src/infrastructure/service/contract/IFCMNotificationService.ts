import { MessagingNameSpace } from "../../config/firebase";

export interface IFCMNotificationService {
  sendToDevice({
    tokens,
    title,
    message,
    data,
    options,
  }: {
    tokens: string | string[];
    title: string;
    message: string;
    data?: any;
    options?: any;
  }): Promise<boolean | MessagingNameSpace.MessagingDevicesResponse>;
  sendToTopic({
    topic,
    title,
    message,
    data,
    options,
  }: {
    topic: string;
    title: string;
    message: string;
    data?: any;
    options?: any;
  }): Promise<boolean | MessagingNameSpace.MessagingTopicResponse>;
}
