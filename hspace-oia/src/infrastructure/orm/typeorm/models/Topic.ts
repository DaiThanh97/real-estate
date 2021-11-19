import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";

export interface ITopic {
  id: number;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
}

export const Topic = new EntitySchema<ITopic>({
  name: "topic",
  tableName: "topics",
  columns: {
    ...BaseColumnSchemaPart,
    isActive: {
      type: Boolean,
      nullable: false,
      default: true,
      name: "is_active",
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
  }
});
