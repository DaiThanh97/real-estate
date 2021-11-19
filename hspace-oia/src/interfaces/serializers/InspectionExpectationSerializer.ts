import { baseSerializerMixin } from "./Base";
import { Expose, Type } from "class-transformer";
import { InvestmentPlanSerializer } from "./InvestmentPlanSerializer";
import MasterValueSerializer from "./MasterValueSerializer";
import { ChangeableNoteSerializer, noteSerializerMixin, QueryNoteSerializer } from "./NoteSerializer";

class ChangeableInspectionExpectationLevelSerializer {
  @Expose()
  id: number;

  @Expose()
  planLandId: number;

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
class InspectionExpectationLevelSerializer extends ChangeableInspectionExpectationLevelSerializer {
  @Expose()
  @Type(() => MasterValueSerializer)
  group: MasterValueSerializer;

  @Expose()
  @Type(() => MasterValueSerializer)
  type: MasterValueSerializer;
}

class ChangeableInspectionExpectationPlanLandSerializer {
  @Expose()
  id: number;

  @Expose()
  planItemId: number;

  @Expose()
  index: number;

  @Expose()
  streetNumber: string;

  @Expose()
  cityId: number;

  @Expose()
  wardId: number;

  @Expose()
  districtId: number;

  @Expose()
  streetId: number;

  @Expose()
  streetGroupId: number;

  @Expose()
  positionGroupId: number;

  @Expose()
  address: string;

  @Expose()
  locationDescription: string;

  @Expose()
  landUseRights: string;

  @Expose()
  construction: string;

  @Expose()
  totalAdvantageLevel: number;
  @Expose()
  totalDisadvantageLevel: number;

  @Expose()
  @Type(() => ChangeableInspectionExpectationLevelSerializer)
  advantageLevels: ChangeableInspectionExpectationLevelSerializer[];

  @Expose()
  @Type(() => ChangeableInspectionExpectationLevelSerializer)
  disadvantageLevels: ChangeableInspectionExpectationLevelSerializer[];

  @Expose()
  totalAdjustment: number;

}

@baseSerializerMixin
class InspectionExpectationPlanLandSerializer extends ChangeableInspectionExpectationPlanLandSerializer {
  
  @Expose()
  @Type(() => MasterValueSerializer)
  city: MasterValueSerializer | undefined;

  @Expose()
  @Type(() => MasterValueSerializer)
  district: MasterValueSerializer | undefined;

  @Expose()
  @Type(() => MasterValueSerializer)
  ward: MasterValueSerializer | undefined;

  @Expose()
  @Type(() => MasterValueSerializer)
  street: MasterValueSerializer | undefined;

  @Expose()
  @Type(() => MasterValueSerializer)
  streetGroup: MasterValueSerializer | undefined;

  @Expose()
  @Type(() => MasterValueSerializer)
  positionGroup: MasterValueSerializer | undefined;

  @Expose()
  @Type(() => InspectionExpectationLevelSerializer)
  advantageLevels: InspectionExpectationLevelSerializer[];

  @Expose()
  @Type(() => InspectionExpectationLevelSerializer)
  disadvantageLevels: InspectionExpectationLevelSerializer[];
}

class ChangeableInspectionExpectationPlanItemSerializer {
  @Expose()
  id: number;

  @Expose()
  inspectionExpectationId: number;

  @Expose()
  index: number;

  @Expose()
  sourceId: number;

  @Expose()
  name: number;

  @Expose()
  planTypeId: number;

  @Expose()
  constructionTypeId: number;

  @Expose()
  description: string;

  @Expose()
  investmentTime: number;

  @Expose()
  investmentAt: Date;

  @Expose()
  totalAdjustment: number;

  @Expose()
  @Type(() => ChangeableInspectionExpectationPlanLandSerializer)
  lands: ChangeableInspectionExpectationPlanLandSerializer[];
}

@baseSerializerMixin
class InspectionExpectationPlanItemSerializer extends ChangeableInspectionExpectationPlanItemSerializer {
  @Expose()
  @Type(() => MasterValueSerializer)
  planType: MasterValueSerializer;

  @Expose()
  @Type(() => MasterValueSerializer)
  constructionType: MasterValueSerializer;

  @Expose()
  @Type(() => InspectionExpectationPlanLandSerializer)
  lands: InspectionExpectationPlanLandSerializer[];

}

export class ChangeableInspectionExpectationSerializer extends ChangeableNoteSerializer {
  
  @Expose()
  investmentPlanId: number;

  @Expose()
  @Type(() => ChangeableInspectionExpectationPlanItemSerializer)
  planItems: ChangeableInspectionExpectationPlanItemSerializer[];
  
}

@baseSerializerMixin
@noteSerializerMixin
export class InspectionExpectationSerializer extends ChangeableInspectionExpectationSerializer {
  
  @Expose()
  @Type(() => InvestmentPlanSerializer)
  investmentPlan: InvestmentPlanSerializer | undefined;

  @Expose()
  @Type(() => InspectionExpectationPlanItemSerializer)
  planItems: InspectionExpectationPlanItemSerializer[];

}

export class QueryInspectionExpectationSerializer  extends QueryNoteSerializer {
}
