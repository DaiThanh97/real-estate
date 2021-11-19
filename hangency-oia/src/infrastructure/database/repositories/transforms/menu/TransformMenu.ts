import { MenuEntity } from "../../../../orm/typeorm/models/MenuEntity";
import { Menu } from "../../../../../domain/models/Menu";
import { TransformResource } from "../resource/TransformResource";

export class TransformMenu {
  static transformEntityToDomain(e: MenuEntity): Menu {
    const result = new Menu({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      name: e.name,
      description: e.description,
      path: e.path,
      isActive: e.isActive,
      resourceId: e.resourceId,
      parentId: e.parentId,
      resource: e.resource && TransformResource.transformEntityToDomain(e.resource),
      parent: e.parent && this.transformEntityToDomain(e.parent),
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: Menu): MenuEntity {
    return new MenuEntity({
      id: d.id,
      name: d.name,
      description: d.description,
      path: d.path,
      isActive: d.isActive,
      seq: undefined,
      resourceId: d.resourceId,
      parentId: d.parentId,
      resource: d.resource && TransformResource.transformCreateEntityFromDomain(d.resource),
      parent: d.parent && this.transformCreateEntityFromDomain(d.parent),
    });
  }
  static transformUpdateEntityFromDomain(d: Menu): Partial<MenuEntity> {
    const result: Partial<MenuEntity> = {
      name: d.name,
      description: d.description,
      path: d.path,
      isActive: d.isActive,
      resourceId: d.resourceId,
      parentId: d.parentId,
      resource: d.resource && TransformResource.transformCreateEntityFromDomain(d.resource),
      parent: d.parent && this.transformCreateEntityFromDomain(d.parent),
    };
    return result;
  }
}
