import { EntitySchema } from "typeorm";
import { IAccount } from "./Account";
import { BaseColumnSchemaPart } from "./Base";

export interface ISession {
  id: number;
  token: string;
  isActive: boolean;
  account: IAccount;
  updatedAt: Date;
  createdAt: Date;
}

export const Session = new EntitySchema<ISession>({
  name: "session",
  tableName: "sessions",
  columns: {
    ...BaseColumnSchemaPart,
    token: {
      type: String,
      nullable: false,
    },
    isActive: {
      type: Boolean,
      nullable: false,
      default: true,
      name: "is_active",
    },
  },
  relations: {
    account: {
      type: "many-to-one",
      target: "account",
      inverseSide: "account.sessions",
      joinColumn: { name: "account_id" }
    }
  }
});
