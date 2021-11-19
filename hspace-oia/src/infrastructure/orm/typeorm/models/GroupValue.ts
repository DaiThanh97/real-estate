import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, ActiveStatusColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";

export interface IGroupValue {
  id: number;
  code: string;
  name: string;
  parentId: number;
  parent: IGroupValue;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  children: IGroupValue[];
}

export const GroupValue = new EntitySchema<IGroupValue>({
  name: "groupValue",
  tableName: "group_values",
  columns: {
    ...BaseColumnSchemaPart,
    code: {
      type: "varchar",
      nullable: false,
      name: "code",
    },
    name: {
      type: "varchar",
      nullable: false,
      name: "name",
    },
    parentId: {
      type: "int",
      name: "parent_id",
      nullable: true,
    },
    ...ActiveStatusColumnSchemaPart,
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    parent: {
      target: "groupValue",
      type: "many-to-one",
      joinColumn: { name: "parent_id", referencedColumnName: "id" },
      treeParent: true,
      nullable: true,
      inverseSide: "children",
    },
    children: {
      target: "groupValue",
      type: "one-to-many",
      joinColumn: { referencedColumnName: "parent_id" },
      inverseSide: "parent",
      nullable: true,
    },
  }
});
