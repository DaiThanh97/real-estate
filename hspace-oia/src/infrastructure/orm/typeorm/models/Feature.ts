import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, ActiveStatusColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IResource } from "./Resource";
import { IAccount } from "./Account";

export interface IFeature {
  id: number;
  action: string;
  name: string;
  description: string;
  resource: IResource;
  isActive: boolean;
  resourceId: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  act: string;
  notificationAction: string;
  groupClass: string;
  seq: number;
}

export const Feature = new EntitySchema<IFeature>({
  name: "feature",
  tableName: "features",
  columns: {
    ...BaseColumnSchemaPart,
    ...ActiveStatusColumnSchemaPart,
    action: {
      type: String,
      name: "action",
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
    resourceId: {
      type: Number,
      name: "resource_id",
      nullable: true,
    },
    act: {
      type: String,
      name: "act",
      nullable: true,
    },
    notificationAction: {
      type: String,
      name: "notification_action",
      nullable: true,
    },
    groupClass: {
      type: String,
      name: "group_class",
      nullable: true,
    },
    seq: {
      type: "int",
      name: "seq",
      nullable: true,
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    resource: {
      type: "many-to-one",
      target: "resource",
      inverseSide: "features",
      joinColumn: { name: "resource_id", referencedColumnName: "id" },
    }
  }
});
