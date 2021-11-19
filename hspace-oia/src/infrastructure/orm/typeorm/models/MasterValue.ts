import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, ActiveStatusColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IGroupValue } from "./GroupValue";
import { IAccount } from "./Account";

export interface IMasterValue {
  id: number
  groupId: number;
  groupValue: IGroupValue;
  parent: IMasterValue;
  groupCode: string;
  groupName: string;
  valueCode: string;
  valueName: string;
  customData: string;
  parentId: number;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  children: IMasterValue[],
}

export const MasterValue = new EntitySchema<IMasterValue>({
  name: "masterValue",
  tableName: "master_values",
  columns: {
    ...BaseColumnSchemaPart,
    groupId: {
      type: Number,
      nullable: true,
      name: "group_id",
    },
    groupCode: {
      type: "varchar",
      nullable: false,
      name: "group_code",
    },
    groupName: {
      type: "varchar",
      nullable: false,
      name: "group_name",
    },
    valueCode: {
      type: "varchar",
      nullable: false,
      name: "value_code",
      default: ""
    },
    valueName: {
      type: "varchar",
      nullable: false,
      name: "value_name",
      default: ""
    },
    customData: {
      type: "json",
      nullable: true,
      name: "custom_data",
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
    groupValue: {
      type: "many-to-one",
      target: "groupValue",
      joinColumn: { name: "group_id", referencedColumnName: "id" },
      nullable: true,
    },
    parent: {
      target: "masterValue",
      type: "many-to-one",
      joinColumn: { name: "parent_id", referencedColumnName: "id" },
      nullable: true,
      inverseSide: "children",
    },
    children: {
      target: "masterValue",
      type: "one-to-many",
      joinColumn: { referencedColumnName: "parent_id" },
      inverseSide: "parent",
      nullable: true,
    },
  }
});
