import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, ActiveStatusColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { IAccountGroupResource } from "./AccountGroupResource";
import { IAccountGroupFeature } from "./AccountGroupFeature";

export interface IAccountGroup {
  id: number,
  isActive: boolean,
  code: string,
  name: string,
  description: string,
  updatedAt: Date,
  createdAt: Date,
  createdBy: IAccount,
  updatedBy: IAccount,
  accountGroupResources: IAccountGroupResource[];
  accountGroupFeatures: IAccountGroupFeature[];
  classes: string[];
  isDeleted: boolean;
}

export const AccountGroup = new EntitySchema<IAccountGroup>({
  name: "account_group",
  tableName: "account_groups",
  columns: {
    ...BaseColumnSchemaPart,
    ...ActiveStatusColumnSchemaPart,
    code: {
      type: String,
      name: "code",
      nullable: false,
    },
    name: {
      type: String,
      name: "name",
      nullable: false,
    },
    description: {
      type: String,
      name: "description",
      nullable: true,
      default: "",
    },
    classes: {
      type: "jsonb",
      name: "classes",
      nullable: true,
    },
    isDeleted: {
      type: Boolean,
      name: "is_deleted",
      default: false,
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    accountGroupResources: {
      type: "one-to-many",
      target: "account_group_resource",
      inverseSide: "accountGroup",
      cascade: true,
      joinColumn: { referencedColumnName: "resource_id" },
    },
    accountGroupFeatures: {
      type: "one-to-many",
      target: "account_group_feature",
      inverseSide: "accountGroup",
      cascade: true,
      joinColumn: { referencedColumnName: "feature_id" },
    }
  },
  uniques: [
    {
      name: "UNIQUE_ACCOUNT_GROUP",
      columns: [
        "code",
      ]
    }
  ],
});
