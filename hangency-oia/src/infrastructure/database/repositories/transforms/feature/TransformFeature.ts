import { FeatureEntity } from "../../../../orm/typeorm/models/FeatureEntity";
import { Feature } from "../../../../../domain/models/Feature";
import { TransformAccount } from "../account/TransformAccount";

export class TransformFeature {
  static transformEntityToDomain(e: FeatureEntity): Feature {
    const result = new Feature({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      name: e.name,
      description: e.description,
      action: e.action,
      isActive: e.isActive,
      resourceId: e.resourceId,
      createdBy: e.createdBy && TransformAccount.transformEntityToDomain(e.createdBy),
      updatedBy: e.updatedBy && TransformAccount.transformEntityToDomain(e.updatedBy),
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: Feature): FeatureEntity {
    return new FeatureEntity({
      id: d.id,
      name: d.name,
      description: d.description,
      action: d.action,
      isActive: d.isActive,
      resourceId: d.resourceId,
      groupClass: null,
      seq: null,
      act: null,
      notificationAction: null,
      resource: null,
    });
  }
  static transformUpdateEntityFromDomain(d: Feature): Partial<FeatureEntity> {
    const result: Partial<FeatureEntity> = {
      name: d.name,
      description: d.description,
      action: d.action,
      isActive: d.isActive,
      resourceId: d.resourceId,
    };
    return result;
  }
}
