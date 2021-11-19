import { BaseModel } from "./Base";
import { plainToClass, Type } from "class-transformer";
import { MasterValue } from "./MasterValue";
import { Account } from "./Account";


export class Collaborator extends BaseModel {
  public fullName: string;

  @Type(() => Date)
  public birthday: Date;

  @Type(() => Date)
  public joinedDate: Date;

  public phone: string;
  public email: string;

  public companyId: number;
  @Type(() => MasterValue)
  public company: MasterValue;

  public collaboratorTypeId: number;
  @Type(() => MasterValue)
  public collaboratorType: MasterValue;

  static createByAccount(payload: any, account: Account): Collaborator {
    const collaborator: Collaborator = plainToClass(Collaborator, payload);
    collaborator.createdBy = account;
    collaborator.updatedBy = account;

    return collaborator;
  }

  updateByAccount(account: Account): Collaborator {
    this.updatedAt = new Date();
    this.updatedBy = account;
    return this;
  }

  static updateBasicInfo(collaborator: Collaborator, birthday: Date): Collaborator {
    collaborator.birthday = birthday;
    return collaborator;
  }

}
