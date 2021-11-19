import { AccountGroupFeatureEntity } from "../../../../orm/typeorm/models/AccountGroupFeatureEntity";
import { AccountGroupFeature } from "../../../../../domain/models/AccountGroupFeature";
import { TransformFeature } from "../feature/TransformFeature";
import { TransformAccountGroup } from "../accountGroup/TransformAccountGroup";

export class TransformAccountGroupFeature {
  static transformEntityToDomain(e: AccountGroupFeatureEntity): AccountGroupFeature {
    const result = new AccountGroupFeature({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      featureId: e.featureId,
      accountGroupId: e.accountGroupId,
      feature: e.feature && TransformFeature.transformEntityToDomain(e.feature),
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: AccountGroupFeature): AccountGroupFeatureEntity {
    return new AccountGroupFeatureEntity({
      id: d.id,
      featureId: d.featureId,
      accountGroupId: d.accountGroupId,
      accountGroup: undefined,
      feature: d.feature && TransformFeature.transformCreateEntityFromDomain(d.feature),
    });
  }
  static transformUpdateEntityFromDomain(d: AccountGroupFeature): Partial<AccountGroupFeatureEntity> {
    const result: Partial<AccountGroupFeatureEntity> = {
      featureId: d.featureId,
      accountGroupId: d.accountGroupId,
      feature: d.feature && TransformFeature.transformCreateEntityFromDomain(d.feature),
    };
    return result;
  }
}
