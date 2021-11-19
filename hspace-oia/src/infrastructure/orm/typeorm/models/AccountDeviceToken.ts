import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";

export const DeviceType = {
  ANDROID: "Android",
  IOS: "IOS",
};

export interface IAccountDeviceToken {
  id: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  accountId: number;
  isActive: boolean;

  deviceToken: string;
  deviceType: string;
  deviceName: string;

  account: IAccount;
}

export const AccountDeviceToken = new EntitySchema<IAccountDeviceToken>({
  name: "account_device_token",
  tableName: "account_device_tokens",
  columns: {
    ...BaseColumnSchemaPart,
    accountId: {
      name: "account_id",
      type: Number,
      nullable: true,
    },
    deviceToken: {
      type: "varchar",
      name: "device_token",
      length: 255,
      nullable: false,
      unique: true,
    },
    deviceType: {
      type: "varchar",
      name: "device_type",
      length: 20,
      nullable: true,
    },
    deviceName: {
      type: "varchar",
      name: "device_name",
      length: 255,
      nullable: true,
    },
    isActive: {
      name: "is_active",
      type: Boolean,
      default: true,
      nullable: false,
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    account: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "account_id", referencedColumnName: "id" },
    },
  }
});
