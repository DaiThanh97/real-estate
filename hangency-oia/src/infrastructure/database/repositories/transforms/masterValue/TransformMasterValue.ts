import { MasterValueEntity } from "../../../../orm/typeorm/models/MasterValueEntity";
import { MasterValue } from "../../../../../domain/models/MasterValue";
import { TransformGroupValue } from "../groupValue/TransformGroupValue";
import { TransformAccount } from "../account/TransformAccount";

export class TransformMasterValue {
  static transformEntityToDomain(e: MasterValueEntity): MasterValue {
    const result = new MasterValue({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      isUsed: undefined,
      groupId: e.groupId,
      groupCode: e.groupCode,
      groupName: e.groupName,
      valueCode: e.valueCode,
      valueName: e.valueName,
      parentId: e.parentId,
      isActive: e.isActive,
      customData: e.customData,
      groupValue: e.groupValue && TransformGroupValue.transformEntityToDomain(e.groupValue),
      parent: e.parent && this.transformEntityToDomain(e.parent),
      children: e.children && e.children.map((el) => this.transformEntityToDomain(el)),
      createdBy: e.createdBy && TransformAccount.transformEntityToDomain(e.createdBy),
      updatedBy: e.updatedBy && TransformAccount.transformEntityToDomain(e.updatedBy),
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: MasterValue): MasterValueEntity {
    return new MasterValueEntity({
      id: d.id,
      groupId: d.groupId,
      groupCode: d.groupCode,
      groupName: d.groupName,
      valueCode: d.valueCode,
      valueName: d.valueName,
      parentId: d.parentId,
      isActive: d.isActive,
      customData: d.customData,
      groupValue: d.groupValue && TransformGroupValue.transformCreateEntityFromDomain(d.groupValue),
      parent: d.parent && this.transformCreateEntityFromDomain(d.parent),
      createdBy: d.createdBy && TransformAccount.transformCreateEntityFromDomain(d.createdBy),
      updatedBy: d.updatedBy && TransformAccount.transformCreateEntityFromDomain(d.updatedBy),
    });
  }
  static transformUpdateEntityFromDomain(d: MasterValue): Partial<MasterValueEntity> {
    const result: Partial<MasterValueEntity> = {
      groupId: d.groupId,
      groupCode: d.groupCode,
      groupName: d.groupName,
      valueCode: d.valueCode,
      valueName: d.valueName,
      parentId: d.parentId,
      isActive: d.isActive,
      customData: d.customData,
      groupValue: d.groupValue && TransformGroupValue.transformCreateEntityFromDomain(d.groupValue),
      parent: d.parent && this.transformCreateEntityFromDomain(d.parent),
      createdBy: d.createdBy && TransformAccount.transformCreateEntityFromDomain(d.createdBy),
      updatedBy: d.updatedBy && TransformAccount.transformCreateEntityFromDomain(d.updatedBy),
    };
    return result;
  }
}
