import { EntitySchema } from "typeorm";
import { ICollaborator } from "./Collaborator";
import { IEmployee } from "./Employee";
import { ISession } from "./Session";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { EAccountType } from "../../../../domain/models/Account";
import { IAccountAccountGroup } from "./AccountAccountGroup";
import { IAccountSetting } from "./AccountSetting";

export interface IAccount {
  id: number
  employeeId: number,
  collaboratorId: number,
  collaborator: ICollaborator,
  type: EAccountType,
  employee: IEmployee,
  identityName: string,
  hash: string,
  isActive: boolean,
  code: string,
  lastLoginAt: Date,
  displayName: string,
  sessions: ISession[],
  accountAccountGroups: IAccountAccountGroup[];
  updatedAt: Date,
  createdAt: Date,
  createdBy: IAccount,
  updatedBy: IAccount,
  settings: IAccountSetting[],
}

export const Account = new EntitySchema<IAccount>({
  name: "account",
  tableName: "accounts",
  columns: {
    ...BaseColumnSchemaPart,
    employeeId: {
      type: Number,
      nullable: true,
      name: "employee_id",
    },
    collaboratorId: {
      type: Number,
      nullable: true,
      name: "collaborator_id",
    },
    type: {
      name: "type",
      nullable: false,
      default: EAccountType.COLLABORATOR,
      enum: EAccountType,
      type: "enum",
    },
    identityName: {
      name: "identity_name",
      type: String,
      nullable: false,
      unique: true,
    },
    hash: {
      name: "hash",
      type: String,
      nullable: true,
    },
    isActive: {
      name: "is_active",
      type: Boolean,
      default: true,
      nullable: false,
    },
    code: {
      name: "code",
      type: String,
      nullable: true,
    },
    lastLoginAt: {
      name: "last_login_at",
      type: Date,
      nullable: true,
    },
    displayName: {
      name: "display_name",
      type: String,
      nullable: false,
    }
  },
  uniques: [
    {
      name: "UNIQUE_ACCOUNT",
      columns: [
        "identityName",
      ]
    }
  ],
  relations: {
    ...AccountLogColumnSchemaPart,
    collaborator: {
      type: "one-to-one",
      target: "collaborator",
      joinColumn: { name: "collaborator_id" },
      nullable: true,
    },
    employee: {
      type: "one-to-one",
      target: "employee",
      joinColumn: { name: "employee_id" },
      nullable: true,
    },
    sessions: {
      type: "one-to-many",
      target: "session",
      inverseSide: "session.account",
    },
    accountAccountGroups: {
      type: "one-to-many",
      target: "account_account_group",
      inverseSide: "account",
      cascade: true,
      joinColumn: { referencedColumnName: "account_group_id" },
    },
    settings: {
      type: "one-to-many",
      target: "account_setting",
      inverseSide: "account",
      joinColumn: { referencedColumnName: "account_id" },
    }
  }
});
