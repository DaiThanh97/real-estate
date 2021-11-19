import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { Resource } from "./Resource";
import { IAccountMenu } from "@halato/user";

export class AccountMenu extends BaseDomainModel implements IDomainModel, IAccountMenu {
  id: string;
  name: string;
  parentId?: string;
  resourceId?: string;
  children?: IAccountMenu[];
  hasChild?: boolean;
  path?: string;
  resource?: Resource;
  parent?: AccountMenu;

  constructor(input: Pick<AccountMenu, "id" | "createdAt" | "updatedAt"> & AccountMenuBulkUpdatableField) {
    super(input);
    this.name = input.name;
    this.parentId = input.parentId;
    this.resourceId = input.resourceId;
    this.children = input.children;
    this.hasChild = input.hasChild;
    this.path = input.path;
    this.resource = input.resource;
    this.parent = input.parent;
  }

  static create = (id: string, input: AccountMenuBulkUpdatableField, now: Date): AccountMenu => {
    return new AccountMenu({
      id,
      createdAt: now,
      updatedAt: now,
      name: input.name,
      parentId: input.parentId,
      resourceId: input.resourceId,
      children: input.children,
      hasChild: input.hasChild,
      path: input.path,
      resource: input.resource,
      parent: input.parent,
    });
  };

  update = (input: AccountMenuBulkUpdatableField): void => {
    this.name = input.name;
    this.parentId = input.parentId;
    this.resourceId = input.resourceId;
    this.children = input.children;
    this.hasChild = input.hasChild;
    this.path = input.path;
    this.resource = input.resource;
    this.parent = input.parent;
  };

  equals(entity: AccountMenu) {
    if (!(entity instanceof AccountMenu)) return false;
    return this.id === entity.id;
  }
}

export type AccountMenuBulkUpdatableField = Pick<
  AccountMenu,
  "name" | "parentId" | "resourceId" | "children" | "hasChild" | "path" | "resource" | "parent"
>;
