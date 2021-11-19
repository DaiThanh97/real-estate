import { baseSerializerMixin, BasicAccountSerializer } from "./Base";
import { Expose, Type } from "class-transformer";
import MasterValueSerializer from "./MasterValueSerializer";
import { ChangeableNoteSerializer, noteSerializerMixin, QueryNoteSerializer } from "./NoteSerializer";

class ChangeableInspectionStatementLevelSerializer {
  @Expose()
  id: number;

  @Expose()
  inspectionStatementId: number;

  @Expose()
  groupId: number;

  @Expose()
  typeId: number;

  @Expose()
  level: number;

  @Expose()
  note: string;
}

@baseSerializerMixin
class InspectionStatementLevelSerializer extends ChangeableInspectionStatementLevelSerializer {
  @Expose()
  @Type(() => MasterValueSerializer)
  group: MasterValueSerializer;

  @Expose()
  @Type(() => MasterValueSerializer)
  type: MasterValueSerializer;
}

export class ChangeableInspectionStatementSerializer extends ChangeableNoteSerializer {
  @Expose()
  streetGroupId: number;

  @Expose()
  positionGroupId: number;

  @Expose()
  otherAddress: boolean;

  @Expose()
  locationDescription: string;

  @Expose()
  closedDealValue: number;

  @Expose()
  transactionDate: Date;

  @Expose()
  brokerId: number;

  @Expose()
  landUseRights: string;

  @Expose()
  construction: string;

  @Expose()
  totalAdjustment: number;

  @Expose()
  marketLandUnitPrice: number;

  @Expose()
  closedDealUnitPrice: number;

  @Expose()
  @Type(() => ChangeableInspectionStatementLevelSerializer)
  advantageLevels: ChangeableInspectionStatementLevelSerializer[];

  @Expose()
  @Type(() => ChangeableInspectionStatementLevelSerializer)
  disadvantageLevels: ChangeableInspectionStatementLevelSerializer[];
}

@baseSerializerMixin
@noteSerializerMixin
export class InspectionStatementSerializer extends ChangeableInspectionStatementSerializer {
  @Expose()
  @Type(() => MasterValueSerializer)
  streetGroup: MasterValueSerializer | undefined;

  @Expose()
  @Type(() => MasterValueSerializer)
  positionGroup: MasterValueSerializer | undefined;

  @Expose()
  @Type(() => BasicAccountSerializer)
  broker: BasicAccountSerializer | undefined;

  @Expose()
  @Type(() => InspectionStatementLevelSerializer)
  advantageLevels: InspectionStatementLevelSerializer[];

  @Expose()
  @Type(() => InspectionStatementLevelSerializer)
  disadvantageLevels: InspectionStatementLevelSerializer[];
}

export class QueryInspectionStatementSerializer extends QueryNoteSerializer {
}
