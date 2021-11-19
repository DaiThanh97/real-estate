import { Expose, Type } from "class-transformer";
import { baseSerializerMixin, BasicAccountSerializer } from "./Base";
import { ChangeableNoteSerializer, noteSerializerMixin, QueryNoteSerializer } from "./NoteSerializer";
import { InspectionExpectationSerializer } from "./InspectionExpectationSerializer";

class ChangeablePlanLandSerializer {
  @Expose()
  index: number;

  @Expose()
  expectationInfo: string;

  @Expose()
  landUseRights: string;

  @Expose()
  construction: string;
}

class PlanLandSerializer extends ChangeablePlanLandSerializer {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

class ChangeablePlanItemSerializer {
  @Expose()
  id: number;

  @Expose()
  index: number;

  @Expose()
  sourceId: number;

  @Expose()
  name: string;

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
  price: number;

  @Expose()
  @Type(() => ChangeablePlanLandSerializer)
  lands: ChangeablePlanLandSerializer[];
}

class PlanItemSerializer extends ChangeablePlanItemSerializer {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
  
  @Expose()
  @Type(() => PlanLandSerializer)
  lands: PlanLandSerializer[];

}

export class ChangeableAppraisalExpectationSerializer extends ChangeableNoteSerializer {
  @Expose()
  inspectionExpectationId: number;

  @Expose()
  @Type(() => ChangeablePlanItemSerializer)
  planItems: ChangeablePlanItemSerializer[];
}

@baseSerializerMixin
@noteSerializerMixin
export class AppraisalExpectationSerializer extends ChangeableAppraisalExpectationSerializer {
  @Expose()
  @Type(() => InspectionExpectationSerializer)
  inspectionExpectation: InspectionExpectationSerializer | undefined;

  @Expose()
  @Type(() => PlanItemSerializer)
  planItems: PlanItemSerializer[];

  @Expose()
  completedAt: Date | undefined;

  @Expose()
  @Type(() => BasicAccountSerializer)
  completedBy: BasicAccountSerializer;
}

export class QueryAppraisalExpectationSerializer extends QueryNoteSerializer {

  @Expose()
  priceFrom: number;

  @Expose()
  priceTo: number;

}
