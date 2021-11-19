import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, ActiveStatusColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { ResetTokenStatus } from "../../../../domain/models/ResetToken";

export interface IResetToken {
  id: number;
  accountId: number,
  email: string,
  identityName: string,
  hash: string,
  expiredAt: Date;
  status: ResetTokenStatus,

  account: IAccount,

  isActive: boolean,
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
}

export const ResetToken = new EntitySchema<IResetToken>({
  name: "reset_token",
  tableName: "reset_tokens",
  columns: {
    ...BaseColumnSchemaPart,
    ...ActiveStatusColumnSchemaPart,
    accountId: {
      type: Number,
      name: "account_id",
      nullable: false,
    },
    email: {
      type: String,
      name: "email",
      nullable: false,
    },
    identityName: {
      type: String,
      name: "identity_name",
      nullable: false,
    },
    hash: {
      type: String,
      name: "hash",
      nullable: false,
    },
    expiredAt: {
      type: Date,
      name: "expired_at",
      nullable: false,
    },
    status: {
      name: "status",
      nullable: false,
      enum: ResetTokenStatus,
      default: ResetTokenStatus.NEW,
      type: "enum",
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    account: {
      type: "many-to-one",
      target: "account",
      joinColumn: {name: "account_id", referencedColumnName: "id"}
    },
  },
});
