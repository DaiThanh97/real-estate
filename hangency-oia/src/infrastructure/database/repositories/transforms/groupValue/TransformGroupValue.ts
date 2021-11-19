import { GroupValueEntity } from "../../../../orm/typeorm/models/GroupValueEntity";
import { GroupValue } from "../../../../../domain/models/GroupValue";
import { TransformAccount } from "../account/TransformAccount";

export class TransformGroupValue {
  static transformEntityToDomain(e: GroupValueEntity): GroupValue {
    const result = new GroupValue({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      code: e.code,
      name: e.name,
      parentId: e.parentId,
      isActive: e.isActive,
      parent: e.parent && this.transformEntityToDomain(e.parent),
      createdBy: e.createdBy && TransformAccount.transformEntityToDomain(e.createdBy),
      updatedBy: e.updatedBy && TransformAccount.transformEntityToDomain(e.updatedBy),
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: GroupValue): GroupValueEntity {
    return new GroupValueEntity({
      id: d.id,
      code: d.code,
      name: d.name,
      parentId: d.parentId,
      isActive: d.isActive,
      parent: d.parent && this.transformCreateEntityFromDomain(d.parent),
      createdBy: d.createdBy && TransformAccount.transformCreateEntityFromDomain(d.createdBy),
      updatedBy: d.updatedBy && TransformAccount.transformCreateEntityFromDomain(d.updatedBy),
    });
  }
  static transformUpdateEntityFromDomain(d: GroupValue): Partial<GroupValueEntity> {
    const result: Partial<GroupValueEntity> = {
      code: d.code,
      name: d.name,
      parentId: d.parentId,
      isActive: d.isActive,
      parent: d.parent && this.transformCreateEntityFromDomain(d.parent),
      createdBy: d.createdBy && TransformAccount.transformCreateEntityFromDomain(d.createdBy),
      updatedBy: d.updatedBy && TransformAccount.transformCreateEntityFromDomain(d.updatedBy),
    };
    return result;
  }
}
