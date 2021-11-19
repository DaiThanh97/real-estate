import { PagingSerializer } from "./PagingSerializer";
import { Expose, Transform, Type } from "class-transformer";

export class KeywordSerializer extends PagingSerializer {
  @Expose()
  @Transform(({ value }) => value || "")
  @Type(() => String)
  keyword?: string;
}
