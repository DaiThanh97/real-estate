import { ResourceEntity } from "../../../../orm/typeorm/models/ResourceEntity";
import { Resource } from "../../../../../domain/models/Resource";
import { TransformFeature } from "../feature/TransformFeature";
import { TransformAccount } from "../account/TransformAccount";
import map from "lodash/map";

export class TransformResource {
  static transformEntityToDomain(e: ResourceEntity): Resource {
    const result = new Resource({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      path: e.path,
      name: e.name,
      group: e.group,
      api: e.api,
      seq: e.seq,
      model: e.model,
      description: e.description,
      isActive: e.isActive,
      features: undefined,
      createdBy: e.createdBy && TransformAccount.transformEntityToDomain(e.createdBy),
      updatedBy: e.updatedBy && TransformAccount.transformEntityToDomain(e.updatedBy),
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: Resource): ResourceEntity {
    return new ResourceEntity({
      id: d.id,
      name: d.name,
      group: d.group,
      api: d.api,
      seq: d.seq,
      model: d.model,
      path: d.path,
      description: d.description,
      isActive: d.isActive,
      features: map(d.features, (el) => TransformFeature.transformCreateEntityFromDomain(el)),
    });
  }
  static transformUpdateEntityFromDomain(d: Resource): Partial<ResourceEntity> {
    const result: Partial<ResourceEntity> = {
      name: d.name,
      group: d.group,
      api: d.api,
      seq: d.seq,
      model: d.model,
      path: d.path,
      description: d.description,
      isActive: d.isActive,
      features: map(d.features, (el) => TransformFeature.transformCreateEntityFromDomain(el)),
    };
    return result;
  }
}
