import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { IAccount } from "@halato/user";
import { Employee } from "./Employee";
import { Collaborator } from "./Collaborator";
import { AccountAccountGroup } from "./AccountAccountGroup";
import { StringUtilities } from "../utils/StringUtilities";

export enum EAccountType {
  ADMIN = "Admin",
  EMPLOYEE = "Employee",
  COLLABORATOR = "Collaborator",
}

export class Account extends BaseDomainModel implements IDomainModel, IAccount {
  id: string;
  type: EAccountType;
  identityName: string;
  employeeId: string | null;

  collaboratorId: string | null;
  isActive: boolean;
  code: string;
  hash: string | null;
  password: string | null;
  lastLoginAt?: Date;
  displayName: string;
  classes: string[] = [];

  createdBy?: Account;
  updatedBy?: Account;

  employee: Employee;
  collaborator: Collaborator;
  accountAccountGroups: AccountAccountGroup[];

  connectedFirebaseAuthId: string;

  constructor(
    input: Pick<
      Account,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "type"
      | "employee"
      | "collaborator"
      | "employeeId"
      | "collaboratorId"
      | "identityName"
      | "code"
      | "hash"
      | "password"
      | "lastLoginAt"
      | "displayName"
      | "classes"
      | "connectedFirebaseAuthId"
      | "createdBy"
      | "updatedBy"
    > &
      AccountBulkUpdatableField,
  ) {
    super(input);
    this.type = input.type;
    this.identityName = input.identityName;
    this.employeeId = input.employeeId;
    this.employee = input.employee;
    this.collaboratorId = input.collaboratorId;
    this.collaborator = input.collaborator;
    this.isActive = input.isActive;
    this.code = input.code;
    this.hash = input.hash;
    this.password = input.password;
    this.lastLoginAt = input.lastLoginAt;
    this.displayName = input.displayName;
    this.classes = input.classes;
    this.accountAccountGroups = input.accountAccountGroups;
    this.connectedFirebaseAuthId = input.connectedFirebaseAuthId;
    this.createdBy = input.createdBy;
    this.updatedBy = input.updatedBy;
  }

  static create = (
    id: string,
    dependencyInput: {
      type: EAccountType;
      employeeId: string | null;
      collaboratorId: string | null;
      code: string;
      lastLoginAt?: Date;
      displayName: string;
      identityName: string;
      connectedFirebaseAuthId: string;
    },
    input: AccountBulkUpdatableField,
    createdBy: Account,
    now: Date,
  ): Account => {
    return new Account({
      id,
      createdAt: now,
      updatedAt: now,
      createdBy: createdBy,
      updatedBy: createdBy,
      isActive: input.isActive,
      accountAccountGroups: input.accountAccountGroups,
      type: dependencyInput.type,
      employeeId: dependencyInput.employeeId,
      collaboratorId: dependencyInput.collaboratorId,
      identityName: dependencyInput.identityName,
      code: dependencyInput.code,
      displayName: dependencyInput.displayName,
      classes: [],
      connectedFirebaseAuthId: dependencyInput.connectedFirebaseAuthId,
      hash: null,
      password: null,

      employee: null,
      collaborator: null,
    });
  };

  update = (input: AccountBulkUpdatableField): void => {
    this.isActive = input.isActive;
    this.accountAccountGroups = input.accountAccountGroups;
  };

  equals(entity: Account) {
    if (!(entity instanceof Account)) return false;

    return this.id === entity.id;
  }

  static generatePassword(): string {
    return `${StringUtilities.randomString(5)}${StringUtilities.randomInteger(0, 9)}`;
  }
}

export type AccountBulkUpdatableField = Pick<Account, "isActive" | "accountAccountGroups">;
