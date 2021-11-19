import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { IAccountAccountGroup } from "@halato/user";
import { AccountGroup } from "./AccountGroup";
import { Account } from "./Account";

export class AccountAccountGroup extends BaseDomainModel implements IDomainModel, IAccountAccountGroup {
  id: string;
  accountId: string;
  accountGroupId: string;

  accountGroup?: AccountGroup;
  account?: Account;

  createdBy: Account;
  updatedBy: Account;

  constructor(
    input: Pick<
      AccountAccountGroup,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "accountId"
      | "accountGroupId"
      | "accountGroup"
      | "account"
      | "createdBy"
      | "updatedBy"
    > &
      AccountAccountGroupBulkUpdatableField,
  ) {
    super(input);
    this.accountId = input.accountId;
    this.accountGroupId = input.accountGroupId;
    this.accountGroup = input.accountGroup;
    this.account = input.account;
    this.createdBy = input.createdBy;
    this.updatedBy = input.updatedBy;
  }

  static create = (
    id: string,
    input: AccountAccountGroupBulkUpdatableField,
    createdBy: Account,
    now: Date,
  ): AccountAccountGroup => {
    return new AccountAccountGroup({
      id,
      createdAt: now,
      updatedAt: now,
      accountGroupId: input.accountGroupId,
      accountId: input.accountId,
      createdBy: createdBy,
      updatedBy: createdBy,

      accountGroup: null,
      account: null,
    });
  };

  update = (input: AccountAccountGroupBulkUpdatableField): void => {
    this.accountGroupId = input.accountGroupId;
  };

  equals(entity: AccountAccountGroup) {
    if (!(entity instanceof AccountAccountGroup)) return false;

    return this.id === entity.id;
  }
}

export type AccountAccountGroupBulkUpdatableField = Pick<AccountAccountGroup, "accountId" | "accountGroupId">;
