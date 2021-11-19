import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { IResource } from "./Resource";
import { IAccountGroup } from "./AccountGroup";
import { IFeature } from "./Feature";

export interface IAccountGroupResource {
  id: number,
  resourceId: number,
  accountGroupId: number,
  updatedAt: Date,
  createdAt: Date,
  createdBy: IAccount,
  updatedBy: IAccount,
  resource: IResource,
  feature: IFeature,
  accountGroup: IAccountGroup,
}

export const AccountGroupResource = new EntitySchema<IAccountGroupResource>({
  name: "account_group_resource",
  tableName: "account_group_resources",
  columns: {
    ...BaseColumnSchemaPart,
    resourceId: {
      type: Number,
      name: "resource_id",
      nullable: false,
    },
    accountGroupId: {
      type: Number,
      name: "account_group_id",
      nullable: true,
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    resource: {
      type: "many-to-one",
      target: "resource",
      joinColumn: { name: "resource_id", referencedColumnName: "id" },
    },
    accountGroup: {
      type: "many-to-one",
      target: "account_group",
      inverseSide: "accountGroupResources",
      joinColumn: { name: "account_group_id", referencedColumnName: "id" },
      nullable: true,
    },
  }
});
