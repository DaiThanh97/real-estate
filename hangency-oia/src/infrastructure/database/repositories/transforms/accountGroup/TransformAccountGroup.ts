import { AccountGroupEntity } from "../../../../orm/typeorm/models/AccountGroupEntity";
import { AccountGroup } from "../../../../../domain/models/AccountGroup";
import { TransformAccountGroupResource } from "../accountGroupResource/TransformAccountGroupResource";
import { TransformAccountGroupFeature } from "../accountGroupFeature/TransformAccountGroupFeature";
import map from "lodash/map";

export class TransformAccountGroup {
  static transformEntityToDomain(e: AccountGroupEntity): AccountGroup {
    const result = new AccountGroup({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      name: e.name,
      code: e.code,
      isActive: e.isActive,
      isDeleted: e.isDeleted,
      description: e.description,
      classes: e.classes,
      accountGroupResources: map(e.accountGroupResources, (el) =>
        TransformAccountGroupResource.transformEntityToDomain(el),
      ),
      accountGroupFeatures: map(e.accountGroupFeatures, (el) =>
        TransformAccountGroupFeature.transformEntityToDomain(el),
      ),
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: AccountGroup): AccountGroupEntity {
    return new AccountGroupEntity({
      id: d.id,
      name: d.name,
      code: d.code,
      isActive: d.isActive,
      isDeleted: d.isDeleted,
      description: d.description,
      classes: d.classes,
      accountGroupResources: map(d.accountGroupResources, (el) =>
        TransformAccountGroupResource.transformCreateEntityFromDomain(el),
      ),
      accountGroupFeatures: map(d.accountGroupFeatures, (el) =>
        TransformAccountGroupFeature.transformCreateEntityFromDomain(el),
      ),
    });
  }
  static transformUpdateEntityFromDomain(d: AccountGroup): Partial<AccountGroupEntity> {
    const result: Partial<AccountGroupEntity> = {
      code: d.code,
      isActive: d.isActive,
      isDeleted: d.isDeleted,
      description: d.description,
      classes: d.classes,
      accountGroupResources: map(d.accountGroupResources, (el) =>
        TransformAccountGroupResource.transformCreateEntityFromDomain(el),
      ),
      accountGroupFeatures: map(d.accountGroupFeatures, (el) =>
        TransformAccountGroupFeature.transformCreateEntityFromDomain(el),
      ),
    };
    return result;
  }
}
