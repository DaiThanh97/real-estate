import { BaseModel } from "./Base";
import { Account } from "./Account";
import { Type } from "class-transformer";

export enum ResetTokenStatus {
  NEW = "New",
  EXPIRED = "Expired",
  SUCCESS = "Success",
}

export class ResetToken extends BaseModel {
  public accountId: number;
  public email: string;
  public identityName: string;
  public hash: string;
  public expiredAt: Date;
  public status: ResetTokenStatus;
  public isActive: boolean;

  @Type(() => Account)
  public account: Account;

  constructor(accountId: number, email: string, identityName: string, hash: string, expiredAt: Date) {
    super();
    this.accountId = accountId;
    this.email = email;
    this.identityName = identityName;
    this.hash = hash;
    this.expiredAt = expiredAt;
    this.status = ResetTokenStatus.NEW;
  }

}
