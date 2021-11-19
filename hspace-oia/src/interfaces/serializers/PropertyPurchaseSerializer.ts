import { BaseSerializer, BasicAccountSerializer } from "./Base";
import { Expose, Type } from "class-transformer";


export class ChangeablePropertyPurchaseSerializer {
  @Expose()
  price: number;

  @Expose()
  date: Date;

  @Expose()
  assigneeId: number | undefined;

  @Expose()
  supporterId: number | undefined;
}


export class PropertyPurchaseSerializer extends BaseSerializer {
  @Expose()
  propertyId: number;

  @Expose()
  price: number;

  @Expose()
  date: Date;

  @Expose()
  assigneeId: number;

  @Expose()
  @Type(() => BasicAccountSerializer)
  assignee?: BasicAccountSerializer | undefined;

  @Expose()
  supporterId: number;

  @Expose()
  @Type(() => BasicAccountSerializer)
  supporter?: BasicAccountSerializer | undefined;
}
