import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { IAccountGroupResource } from "@halato/user";
import { Resource } from "./Resource";

export class AccountGroupResource extends BaseDomainModel implements IDomainModel, IAccountGroupResource {
  id: string;
  resourceId: string;
  accountGroupId: string;

  resource?: Resource;

  constructor(
    input: Pick<AccountGroupResource, "id" | "createdAt" | "updatedAt"> & AccountGroupResourceBulkUpdatableField,
  ) {
    super(input);
    this.resourceId = input.resourceId;
    this.accountGroupId = input.accountGroupId;
    this.resource = input.resource;
  }

  static create = (id: string, input: AccountGroupResourceBulkUpdatableField, now: Date): AccountGroupResource => {
    return new AccountGroupResource({
      id,
      createdAt: now,
      updatedAt: now,
      resourceId: input.resourceId,
      accountGroupId: input.accountGroupId,
      resource: input.resource,
    });
  };

  update = (input: AccountGroupResourceBulkUpdatableField): void => {
    this.resourceId = input.resourceId;
    this.accountGroupId = input.accountGroupId;
    this.resource = input.resource;
  };

  equals(entity: AccountGroupResource) {
    if (!(entity instanceof AccountGroupResource)) return false;
    return this.id === entity.id;
  }
}

export type AccountGroupResourceBulkUpdatableField = Pick<
  AccountGroupResource,
  "resourceId" | "accountGroupId" | "resource"
>;
