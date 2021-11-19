import { AccountGroupResourceEntity } from "../../../../orm/typeorm/models/AccountGroupResourceEntity";
import { AccountGroupResource } from "../../../../../domain/models/AccountGroupResource";
import { TransformResource } from "../resource/TransformResource";

export class TransformAccountGroupResource {
  static transformEntityToDomain(e: AccountGroupResourceEntity): AccountGroupResource {
    const result = new AccountGroupResource({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      resourceId: e.resourceId,
      accountGroupId: e.accountGroupId,
      resource: e.resource && TransformResource.transformEntityToDomain(e.resource),
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: AccountGroupResource): AccountGroupResourceEntity {
    return new AccountGroupResourceEntity({
      id: d.id,
      resourceId: d.resourceId,
      accountGroupId: d.accountGroupId,
      accountGroup: undefined,
      resource: d.resource && TransformResource.transformCreateEntityFromDomain(d.resource),
    });
  }
  static transformUpdateEntityFromDomain(d: AccountGroupResource): Partial<AccountGroupResourceEntity> {
    const result: Partial<AccountGroupResourceEntity> = {
      resourceId: d.resourceId,
      accountGroupId: d.accountGroupId,
      resource: d.resource && TransformResource.transformCreateEntityFromDomain(d.resource),
    };
    return result;
  }
}
