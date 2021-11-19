import { BaseModel } from "./Base";
import { Account } from "./Account";
import { BadRequestError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";

export class GroupValue extends BaseModel {
  public code: string;
  public name: string;
  public parentId: number;
  public parent?: GroupValue;
  public isActive: boolean;

  static createByAccount(groupValue: GroupValue, account: Account): GroupValue {
    groupValue.createdBy = account;
    groupValue.updatedBy = account;
    return groupValue;
  }

  static traceArrayTree(groupValueId: number, allGroupValues: GroupValue[], arrayTree: any[]): void {
    arrayTree.push(groupValueId);
    const childGroupValues: GroupValue[] = allGroupValues.filter(groupValue => {
      return groupValue.parentId?.toString() === groupValueId.toString();
    });
    for (const childGroupValue of childGroupValues) {
      this.traceArrayTree(childGroupValue.id, allGroupValues, arrayTree);
    }
  }

  checkParentGroupValueIsChild(allGroupValues: GroupValue[]): void {
    const arrayTree: any[] = [];
    GroupValue.traceArrayTree(this.id, allGroupValues, arrayTree);
    const result = arrayTree.length && !!this.parentId && arrayTree.indexOf(this.parentId) !== -1;
    if (result) {
      throw new BadRequestError("Parent group can't be a child", ErrorCode.GroupValue.ParentGroupCannotBeChild);
    }
  }

  updateByAccount(account: Account): void {
    this.updatedBy = account;
    this.updatedAt = new Date();
  }
}
