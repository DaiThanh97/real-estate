import { BaseModel } from "./Base";
import { Account } from "./Account";
import { Type } from "class-transformer";

export class PropertyBookmark extends BaseModel {
  public propertyId: number;
  public bookmarkerId: number;
  public bookmarkDate: Date;
  public isActive: boolean;
  public type: string;

  @Type(() => Account)
  public bookmarker?: Account;

  constructor(propertyId: number, bookmarkerId: number, bookmarkDate: Date, type: string) {
    super();
    this.propertyId = propertyId;
    this.bookmarkerId = bookmarkerId;
    this.bookmarkDate = bookmarkDate;
    this.type = type;
  }
}

