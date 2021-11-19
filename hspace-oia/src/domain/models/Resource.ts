import { Feature } from "./Feature";
import { Account } from "./Account";
import { plainToClass, Type } from "class-transformer";

export class Resource {
  public id: number;
  public path: string;
  public description: string;
  public isActive: boolean;

  @Type(() => Feature)
  public features: Feature[];

  @Type(() => Date)
  public createdAt: Date;

  @Type(() => Date)
  public updatedAt: Date;

  @Type(() => Account)
  public createdBy: Account;

  @Type(() => Account)
  public updatedBy: Account;

  static createByAccount(payload: any, account: Account): Resource {
    const resource: Resource = plainToClass(Resource, payload);
    resource.createdBy = account;
    resource.updatedBy = account;
    for (const feature of resource.features) {
      feature.createdBy = account;
      feature.updatedBy = account;
    }

    return resource;
  }
}
