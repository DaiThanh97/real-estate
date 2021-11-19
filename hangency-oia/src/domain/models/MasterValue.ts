import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { IMasterValue } from "@halato/user";
import { GroupValue } from "./GroupValue";
import { Account } from "./Account";

export class MasterValue extends BaseDomainModel implements IDomainModel, IMasterValue {
  public id: number;
  public isUsed?: boolean;
  public groupId?: number;
  public groupCode?: string;
  public groupName?: string;
  public valueCode?: string;
  public valueName?: string;
  public parentId: number;
  public isActive: boolean;
  public customData?: any;

  public groupValue?: GroupValue;
  public parent?: MasterValue;
  public children?: MasterValue[];

  createdBy?: Account;
  updatedBy?: Account;

  constructor(input: Pick<MasterValue, "id" | "createdAt" | "updatedAt"> & MasterValueBulkUpdatableField) {
    super(input);
    this.isUsed = input.isUsed;
    this.groupId = input.groupId;
    this.groupCode = input.groupCode;
    this.groupName = input.groupName;
    this.valueCode = input.valueCode;
    this.valueName = input.valueName;
    this.groupValue = input.groupValue;
    this.parent = input.parent;
    this.children = input.children;
    this.parentId = input.parentId;
    this.isActive = input.isActive;
    this.valueCode = input.valueCode;
    this.customData = input.customData;
    this.createdBy = input.createdBy;
    this.updatedBy = input.updatedBy;
  }

  static create = (id: number, input: MasterValueBulkUpdatableField, now: Date): MasterValue => {
    return new MasterValue({
      id,
      createdAt: now,
      updatedAt: now,
      isUsed: input.isUsed,
      groupId: input.groupId,
      groupCode: input.groupCode,
      valueCode: input.valueCode,
      valueName: input.valueName,
      groupValue: input.groupValue,
      parent: input.parent,
      children: input.children,
      parentId: input.parentId,
      isActive: input.isActive,
      customData: input.customData,
      createdBy: input.createdBy,
      updatedBy: input.updatedBy,
    });
  };

  update = (input: MasterValueBulkUpdatableField): void => {
    this.isUsed = input.isUsed;
    this.groupId = input.groupId;
    this.groupCode = input.groupCode;
    this.groupName = input.groupName;
    this.valueCode = input.valueCode;
    this.valueName = input.valueName;
    this.groupValue = input.groupValue;
    this.parent = input.parent;
    this.children = input.children;
    this.parentId = input.parentId;
    this.isActive = input.isActive;
    this.valueCode = input.valueCode;
    this.customData = input.customData;
    this.createdBy = input.createdBy;
    this.updatedBy = input.updatedBy;
  };

  equals(entity: MasterValue) {
    if (!(entity instanceof MasterValue)) return false;

    return this.id === entity.id;
  }
}

export type MasterValueBulkUpdatableField = Pick<
  MasterValue,
  | "isUsed"
  | "groupId"
  | "groupCode"
  | "groupName"
  | "valueCode"
  | "valueCode"
  | "valueName"
  | "groupValue"
  | "parent"
  | "children"
  | "parentId"
  | "isActive"
  | "customData"
  | "createdBy"
  | "updatedBy"
>;
