import { BaseSerializer } from "./Base";
import { Expose, Transform, Type } from "class-transformer";
import { PagingSerializer } from "./PagingSerializer";


export class NotificationSerializer extends BaseSerializer {
  @Expose()
  content: string;

  @Expose()
  url: string;

  @Expose()
  group: string;

  @Expose()
  refId: number;

  @Expose()
  refCode: string;

  @Expose()
  action: string;

  @Expose()
  propertyId: number;
}


export class AccountNotificationSerializer extends BaseSerializer {
  @Expose()
  @Type(() => NotificationSerializer)
  notification: NotificationSerializer;

  @Expose()
  notificationId: number;

  @Expose()
  markAsRead: boolean;
}

export class QueryNotificationSerializer extends PagingSerializer {
  @Expose()
  @Transform(({ value }: any) => {
    if (value === "" || value === undefined) {
      return null;
    }
    return value;
  })
  unread: boolean | undefined;
}
