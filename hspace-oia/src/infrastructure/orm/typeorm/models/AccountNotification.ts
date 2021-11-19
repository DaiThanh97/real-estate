import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { INotification } from "./Notification";


export interface IAccountNotification {
  id: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  notificationId: number;
  accountId: number;
  markAsRead: boolean;
  notification: INotification;
  account: IAccount;
}

export const AccountNotification = new EntitySchema<IAccountNotification>({
  name: "account_notification",
  tableName: "account_notifications",
  columns: {
    ...BaseColumnSchemaPart,
    notificationId: {
      name: "notification_id",
      type: Number,
      nullable: true,
    },
    accountId: {
      name: "account_id",
      type: Number,
      nullable: true,
    },
    markAsRead: {
      name: "mark_as_read",
      type: Boolean,
      default: false,
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    notification: {
      type: "many-to-one",
      target: "notification",
      joinColumn: { name: "notification_id", referencedColumnName: "id" },
    },
    account: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "account_id", referencedColumnName: "id" },
    },
  }
});
