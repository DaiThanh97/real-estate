import { BaseSerializer } from "./Base";
import { Expose } from "class-transformer";

export class AccountActivitySerializer extends BaseSerializer {
  @Expose()
  content: string;

  @Expose()
  group: string;

  @Expose()
  refId: number;

  @Expose()
  refCode: string;

  @Expose()
  action: string;

  @Expose()
  propertyId: number;

  @Expose()
  quote: string;
}
