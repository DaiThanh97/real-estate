import { Type } from "class-transformer";
import { Account } from "./Account";

export class Feature {
  public id: number;
  public name: string;
  public description: string;
  public action: string;
  public isActive: boolean;
  public resourceId: number;

  @Type(() => Account)
  public createdBy: Account;

  @Type(() => Account)
  public updatedBy: Account;
}
