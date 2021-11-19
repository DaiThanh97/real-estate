import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { IMenu } from "@halato/user";
import { Resource } from "./Resource";

export class Menu extends BaseDomainModel implements IDomainModel, IMenu {
  id: string;
  name: string;
  description: string;
  path: string;
  isActive: boolean;
  resourceId: string;
  parentId: string;
  resource: Resource;
  parent?: Menu;

  constructor(input: Pick<Menu, "id" | "createdAt" | "updatedAt"> & MenuBulkUpdatableField) {
    super(input);
    this.name = input.name;
    this.description = input.description;
    this.path = input.path;
    this.isActive = input.isActive;
    this.resourceId = input.resourceId;
    this.parentId = input.parentId;
    this.resource = input.resource;
    this.parent = input.parent;
  }

  static create = (id: string, input: MenuBulkUpdatableField, now: Date): Menu => {
    return new Menu({
      id,
      createdAt: now,
      updatedAt: now,
      name: input.name,
      description: input.description,
      path: input.path,
      isActive: input.isActive,
      resourceId: input.resourceId,
      parentId: input.parentId,
      resource: input.resource,
    });
  };

  update = (input: MenuBulkUpdatableField): void => {
    this.name = input.name;
    this.description = input.description;
    this.path = input.path;
    this.isActive = input.isActive;
    this.resourceId = input.resourceId;
    this.parentId = input.parentId;
    this.resource = input.resource;
    this.parent = input.parent;
  };

  equals(entity: Menu) {
    if (!(entity instanceof Menu)) return false;
    return this.id === entity.id;
  }
}

export type MenuBulkUpdatableField = Pick<
  Menu,
  "name" | "description" | "path" | "isActive" | "resourceId" | "parentId" | "resource" | "parent"
>;
