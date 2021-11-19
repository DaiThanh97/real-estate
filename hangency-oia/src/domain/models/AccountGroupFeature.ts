import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { IAccountGroupFeature } from "@halato/user";
import { Feature } from "./Feature";

export class AccountGroupFeature extends BaseDomainModel implements IDomainModel, IAccountGroupFeature {
  id: string;
  featureId: string;
  accountGroupId: string;

  feature?: Feature;

  constructor(
    input: Pick<AccountGroupFeature, "id" | "createdAt" | "updatedAt"> & AccountGroupFeatureBulkUpdatableField,
  ) {
    super(input);
    this.featureId = input.featureId;
    this.accountGroupId = input.accountGroupId;
    this.feature = input.feature;
  }

  static create = (id: string, input: AccountGroupFeatureBulkUpdatableField, now: Date): AccountGroupFeature => {
    return new AccountGroupFeature({
      id,
      createdAt: now,
      updatedAt: now,
      featureId: input.featureId,
      accountGroupId: input.accountGroupId,
      feature: input.feature,
    });
  };

  update = (input: AccountGroupFeatureBulkUpdatableField): void => {
    this.featureId = input.featureId;
    this.accountGroupId = input.accountGroupId;
    this.feature = input.feature;
  };

  equals(entity: AccountGroupFeature) {
    if (!(entity instanceof AccountGroupFeature)) return false;
    return this.id === entity.id;
  }
}

export type AccountGroupFeatureBulkUpdatableField = Pick<
  AccountGroupFeature,
  "featureId" | "accountGroupId" | "feature"
>;
