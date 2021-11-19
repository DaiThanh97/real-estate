import { Account } from "./Account";
import { GroupValue } from "./GroupValue";
import { plainToClass, Type } from "class-transformer";
import { BaseModel } from "./Base";
import { ConflictError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";

export class MasterValue extends BaseModel {
  public isUsed?: boolean;
  public groupId?: number;
  public groupCode?: string;
  public groupName?: string;
  public valueCode?: string;
  public valueName?: string;

  @Type(() => GroupValue)
  public groupValue?: GroupValue;

  @Type(() => MasterValue)
  public parent?: MasterValue;

  @Type(() => MasterValue)
  public children?: MasterValue[];

  public parentId: number;
  public isActive: boolean;
  public customData?: any;

  static createdByAccount(payload: any, account: Account): MasterValue {
    const masterValue: MasterValue = plainToClass(MasterValue, payload);
    masterValue.createdBy = account;
    masterValue.updatedBy = account;

    return masterValue;
  }

  updatedByAccount(account: Account) {
    this.updatedBy = account;
    this.updatedAt = new Date();
  }

  checkParent(parentId: number) {
    if (parentId && parentId === this.id) {
      throw new ConflictError("Invalid Parent.", ErrorCode.MasterValue.InvalidParent);
    }
    if (parentId && this.children.length > 0) {
      const found = this.children.some(el => el.id === parentId);
      if (found) throw new ConflictError("Invalid Parent.", ErrorCode.MasterValue.InvalidParent);
    }
  }

  static checkUsedItem(masterValue: MasterValue, usedItems: { id: number; }[]) {
    const found = usedItems.some(el => el.id === masterValue.id);
    masterValue.isUsed = !!found;
    return masterValue;
  }

  static checkUsedItems(masterValues: MasterValue[], usedItems: { id: number; }[]) {
    return masterValues.map(masterValue => {
      return this.checkUsedItem(masterValue, usedItems);
    });
  }
}
