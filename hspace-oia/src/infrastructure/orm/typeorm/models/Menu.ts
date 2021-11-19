import { AccountLogColumnSchemaPart, ActiveStatusColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { EntitySchema } from "typeorm";
import { IResource } from "./Resource";


export interface IMenu {
  id: number;
  createdAt: Date,
  updatedAt: Date,
  path: string,
  name: string,
  description: string,
  parentId: number,
  parent: IMenu,
  resourceId: number,
  resource: IResource,
  isActive: boolean,
  seq: number,
}

export const Menu = new EntitySchema<IMenu>({
  name: "menu",
  tableName: "menu",
  columns: {
    ...BaseColumnSchemaPart,
    ...ActiveStatusColumnSchemaPart,
    path: {
      type: String,
      name: "path",
      nullable: true,
    },
    name: {
      type: String,
      name: "name",
      nullable: false,
    },
    description: {
      type: String,
      name: "description",
      nullable: true,
      default: "",
    },
    parentId: {
      type: "int",
      name: "parent_id",
      nullable: true,
    },
    resourceId: {
      type: "int",
      name: "resource_id",
      nullable: true,
    },
    seq: {
      type: "int",
      name: "seq",
      nullable: true,
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    parent: {
      target: "menu",
      type: "many-to-one",
      joinColumn: { name: "parent_id", referencedColumnName: "id" },
      nullable: true
    },
    resource: {
      type: "many-to-one",
      target: "resource",
      joinColumn: { name: "resource_id", referencedColumnName: "id" },
      nullable: true,
    },
  }
});
