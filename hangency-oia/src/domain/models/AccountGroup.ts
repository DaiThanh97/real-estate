import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { IAccountGroup } from "@halato/user";
import { AccountGroupResource } from "./AccountGroupResource";
import { AccountGroupFeature } from "./AccountGroupFeature";

export class AccountGroup extends BaseDomainModel implements IDomainModel, IAccountGroup {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  description?: string;
  classes?: string[];

  accountGroupResources: AccountGroupResource[];
  accountGroupFeatures: AccountGroupFeature[];

  constructor(input: Pick<AccountGroup, "id" | "createdAt" | "updatedAt"> & AccountGroupBulkUpdatableField) {
    super(input);
    this.name = input.name;
    this.code = input.code;
    this.isActive = input.isActive;
    this.isDeleted = input.isDeleted;
    this.description = input.description;
    this.classes = input.classes;
    this.accountGroupResources = input.accountGroupResources;
    this.accountGroupFeatures = input.accountGroupFeatures;
  }

  static create = (id: string, input: AccountGroupBulkUpdatableField, now: Date): AccountGroup => {
    return new AccountGroup({
      id,
      createdAt: now,
      updatedAt: now,
      name: input.name,
      code: input.code,
      isActive: input.isActive,
      isDeleted: input.isDeleted,
      description: input.description,
      classes: input.classes,
      accountGroupResources: input.accountGroupResources,
      accountGroupFeatures: input.accountGroupFeatures,
    });
  };

  update = (input: AccountGroupBulkUpdatableField): void => {
    this.name = input.name;
    this.code = input.code;
    this.isActive = input.isActive;
    this.isDeleted = input.isDeleted;
    this.description = input.description;
    this.classes = input.classes;
    this.accountGroupResources = input.accountGroupResources;
    this.accountGroupFeatures = input.accountGroupFeatures;
  };

  equals(entity: AccountGroup) {
    if (!(entity instanceof AccountGroup)) return false;
    return this.id === entity.id;
  }
}

export type AccountGroupBulkUpdatableField = Pick<
  AccountGroup,
  | "code"
  | "name"
  | "isActive"
  | "isDeleted"
  | "description"
  | "classes"
  | "accountGroupResources"
  | "accountGroupFeatures"
>;
