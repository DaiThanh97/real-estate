import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { IGroupValue } from "@halato/user";
import { Account } from "./Account";

export class GroupValue extends BaseDomainModel implements IDomainModel, IGroupValue {
  id: number;
  code: string;
  name: string;
  parentId: number;
  isActive: boolean;
  parent?: GroupValue;

  createdBy?: Account;
  updatedBy?: Account;

  constructor(input: Pick<GroupValue, "id" | "createdAt" | "updatedAt"> & GroupValueBulkUpdatableField) {
    super(input);
    this.code = input.code;
    this.name = input.name;
    this.parentId = input.parentId;
    this.parent = input.parent;
    this.isActive = input.isActive;
  }

  static create = (id: number, input: GroupValueBulkUpdatableField, now: Date): GroupValue => {
    return new GroupValue({
      id,
      createdAt: now,
      updatedAt: now,
      code: input.code,
      name: input.name,
      parentId: input.parentId,
      parent: input.parent,
      isActive: input.isActive,
      createdBy: input.createdBy,
      updatedBy: input.updatedBy,
    });
  };

  update = (input: GroupValueBulkUpdatableField): void => {
    this.code = input.code;
    this.name = input.name;
    this.parentId = input.parentId;
    this.parent = input.parent;
    this.isActive = input.isActive;
    this.createdBy = input.createdBy;
    this.updatedBy = input.updatedBy;
  };

  equals(entity: GroupValue) {
    if (!(entity instanceof GroupValue)) return false;

    return this.id === entity.id;
  }
}

export type GroupValueBulkUpdatableField = Pick<
  GroupValue,
  "code" | "name" | "parentId" | "parent" | "isActive" | "createdBy" | "updatedBy"
>;
