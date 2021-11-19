import { IAccount } from "./Account";
import { EntitySchema, EntitySchemaColumnOptions } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";

export const AccountSettingTypes = {
  STRING: "string",
  BOOL: "boolean",
  NUMBER: "number",
} as const;

export interface IAccountSetting {
  id: number
  accountId: number;
  key: string;
  data: {
    value: any,
    type: string;
  };
  description: string;
  folder: string;
  updatedAt: Date,
  createdAt: Date,
  createdBy: IAccount,
  updatedBy: IAccount,
  account: IAccount;
  isActive: boolean;
}

export interface IDefaultAccountSetting {
  id: number
  key: string;
  data: {
    value: any,
    type: string;
  };
  description: string;
  folder: string;
  updatedAt: Date,
  createdAt: Date,
  isActive: boolean;
}

const BaseAccountSettingColumns = {
  key: {
    name: "key",
    type: "varchar",
    length: 64,
    nullable: false,
  } as EntitySchemaColumnOptions,
  data: {
    name: "data",
    nullable: false,
    type: "jsonb",
  } as EntitySchemaColumnOptions,
  description: {
    name: "description",
    nullable: true,
    type: String,
  } as EntitySchemaColumnOptions,
  folder: {
    name: "folder",
    type: "varchar",
    length: 64,
    nullable: false,
  } as EntitySchemaColumnOptions,
  isActive: {
    name: "is_active",
    type: Boolean,
    default: true
  } as EntitySchemaColumnOptions,
};

export const AccountSetting = new EntitySchema<IAccountSetting>({
  name: "account_setting",
  tableName: "account_settings",
  columns: {
    ...BaseColumnSchemaPart,
    accountId: {
      type: Number,
      name: "account_id",
      nullable: false,
    },
    ...BaseAccountSettingColumns,
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    account: {
      type: "many-to-one",
      target: "account",
      inverseSide: "settings",
      joinColumn: { name: "account_id", referencedColumnName: "id" },
    }
  },
  uniques: [
    {
      name: "UNIQUE_ACCOUNT_SETTING",
      columns: [
        "folder",
        "key",
        "accountId",
      ]
    }
  ],
});

export const DefaultAccountSetting = new EntitySchema<IDefaultAccountSetting>({
  name: "default_account_setting",
  tableName: "default_account_settings",
  columns: {
    ...BaseColumnSchemaPart,
    ...BaseAccountSettingColumns,
  },
  uniques: [
    {
      name: "UNIQUE_DEFAULT_ACCOUNT_SETTING",
      columns: [
        "folder",
        "key",
      ]
    }
  ],
});
