import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccountGroup } from "./AccountGroup";
import { IAccount } from "./Account";

export interface IAccountAccountGroup {
  id: number
  accountGroupId: number,
  accountGroup: IAccountGroup,
  accountId: number,
  account: IAccount,
  updatedAt: Date,
  createdAt: Date,
  createdBy: IAccount,
  updatedBy: IAccount,
}

export const AccountAccountGroup = new EntitySchema<IAccountAccountGroup>({
  name: "account_account_group",
  tableName: "account_account_groups",
  columns: {
    ...BaseColumnSchemaPart,
    accountGroupId: {
      type: Number,
      name: "account_group_id",
      nullable: true,
    },
    accountId: {
      type: Number,
      name: "account_id",
      nullable: true,
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    account: {
      type: "many-to-one",
      target: "account",
      inverseSide: "accountAccountGroups",
      joinColumn: {name: "account_id", referencedColumnName: "id"},
      nullable: true,
    },
    accountGroup: {
      type: "many-to-one",
      target: "account_group",
      joinColumn: {name: "account_group_id", referencedColumnName: "id"}
    },
  }
});
