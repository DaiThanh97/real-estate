import { BaseSerializer, BasicAccountSerializer } from "./Base";
import { Expose, Type } from "class-transformer";

export class ChangeablePropertySaleSerializer {
  @Expose()
  price: number;

  @Expose()
  date: Date;

  @Expose()
  sellerId: number | undefined;

  @Expose()
  saleSourceId: number | undefined;
}


export class PropertySaleSerializer extends BaseSerializer {
  @Expose()
  propertyId: number;

  @Expose()
  price: number;

  @Expose()
  date: Date;

  @Expose()
  sellerId: number;

  @Expose()
  @Type(() => BasicAccountSerializer)
  seller?: BasicAccountSerializer | undefined;

  @Expose()
  saleSourceId: number;

  @Expose()
  @Type(() => BasicAccountSerializer)
  saleSource?: BasicAccountSerializer | undefined;
}
