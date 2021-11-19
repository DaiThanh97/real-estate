import { Expose, Transform, Type } from "class-transformer";
import { IsEnum, IsNumber, IsString } from "class-validator";

enum PagingOrder {
  DESC = "DESC",
  ASC = "ASC",
}

function transformPagingOrder({ value }: any) {
  if (value) {
    value = value.toUpperCase();
  } else {
    value = PagingOrder.ASC;
  }
  return value;
}

function transformIsActive({ value }: any) {
  if (value === "" || value === undefined) {
    return null;
  }

  return value;
}

export class PagingSerializer {
  @Expose({ name: "order" })
  @Transform(transformPagingOrder)
  @IsEnum(PagingOrder)
  order?: { name: PagingOrder };

  @Expose({ name: "limit" })
  @Transform(({ value }) => value || 100)
  @Type(() => Number)
  @IsNumber({ allowNaN: true })
  take?: number;

  @Expose()
  @Transform(({ value }) => value || 0)
  @Type(() => Number)
  @IsNumber({ allowNaN: true })
  skip?: number;

  @Expose()
  @Transform(({ value }) => value || "id")
  @Type(() => String)
  @IsString()
  orderField?: string;

  @Expose()
  @Transform(transformIsActive)
  isActive?: boolean | undefined;
}
