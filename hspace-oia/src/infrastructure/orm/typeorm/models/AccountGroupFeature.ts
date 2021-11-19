import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { IAccountGroup } from "./AccountGroup";
import { IFeature } from "./Feature";

export interface IAccountGroupFeature {
  id: number,
  featureId: number,
  accountGroupId: number,
  updatedAt: Date,
  createdAt: Date,
  createdBy: IAccount,
  updatedBy: IAccount,
  feature: IFeature,
  accountGroup: IAccountGroup,
}

export const AccountGroupFeature = new EntitySchema<IAccountGroupFeature>({
  name: "account_group_feature",
  tableName: "account_group_features",
  columns: {
    ...BaseColumnSchemaPart,
    featureId: {
      type: Number,
      name: "feature_id",
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
    feature: {
      type: "many-to-one",
      target: "feature",
      joinColumn: { name: "feature_id", referencedColumnName: "id" },
    },
    accountGroup: {
      type: "many-to-one",
      target: "account_group",
      inverseSide: "accountGroupFeatures",
      joinColumn: { name: "account_group_id", referencedColumnName: "id" },
      nullable: true,
    },
  }
});
