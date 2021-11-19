import { Expose, Type } from "class-transformer";
import { BaseSerializer , BasicAccountSerializer } from "./Base";

export class PropertyBookmarkSerializer extends BaseSerializer {

  @Expose()
  propertyId: number;
 
  @Expose()
  bookmarkerId: number;

  @Expose()
  bookmarkDate: Date;

  @Expose()
  isActive: boolean;

  @Expose()
  type: string;

  @Expose()
  @Type(() => BasicAccountSerializer)
  bookmarker: BasicAccountSerializer;
  
}
