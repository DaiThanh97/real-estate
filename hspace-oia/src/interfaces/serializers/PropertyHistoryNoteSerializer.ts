import { Expose, Type } from "class-transformer";
import { BaseSerializer } from "./Base";
import MasterValueSerializer from "./MasterValueSerializer";

export class PropertyHistoryNoteSerializer extends BaseSerializer {

  @Expose()
  propertyId: number;

  @Expose()
  reasonId: number;
  
  @Expose()
  type: string;

  @Expose()
  notes: string;

  @Expose()
  isActive: boolean;

  @Expose()
  @Type(() => MasterValueSerializer)
  reason: MasterValueSerializer | undefined;

}
