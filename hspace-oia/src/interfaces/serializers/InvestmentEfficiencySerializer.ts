import { Expose, Type } from "class-transformer";
import { baseSerializerMixin } from "./Base";
import { ChangeableNoteSerializer, noteSerializerMixin, QueryNoteSerializer } from "./NoteSerializer";
import { AppraisalExpectationSerializer } from "./AppraisalExpectationSerializer";


class ChangeablePlanLandSerializer {
  @Expose()
  id: number;

  @Expose()
  index: number;

  @Expose()
  investmentCosts: string;

  @Expose()
  purchasePriceAnalysis: string;
}

class ChangeablePlanItemSerializer {
  @Expose()
  id: number;

  @Expose()
  index: number;

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
  price: number;

  @Expose()
  investmentCostTotal: string;

  @Expose()
  purchasePriceAnalysisTotal: string;

  @Expose()
  @Type(() => ChangeablePlanLandSerializer)
  lands: ChangeablePlanLandSerializer[];

  @Expose()
  refInvestmentEfficiencyInfo: string;
}

export class ChangeableInvestmentEfficiencySerializer extends ChangeableNoteSerializer {
  @Expose()
  @Type(() => ChangeablePlanItemSerializer)
  planItems: ChangeablePlanItemSerializer[];

  @Expose()
  appraisalExpectationId: number;
}

class PlanLandSerializer extends ChangeablePlanLandSerializer {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
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

@baseSerializerMixin
@noteSerializerMixin
export class InvestmentEfficiencySerializer extends ChangeableInvestmentEfficiencySerializer {
  @Expose()
  @Type(() => AppraisalExpectationSerializer)
  appraisalExpectation: AppraisalExpectationSerializer | undefined;

  @Expose()
  @Type(() => PlanItemSerializer)
  planItems: PlanItemSerializer[];

  @Expose()
  approvedPlanId: number;

  @Expose()
  approvedPlanPrice: number;

  @Expose()
  approvedPlanTypeId: number;

  @Expose()
  approvedPlanName: string;

  @Expose()
  approvedPlanTime: number;

  @Expose()
  approvedPurchasePrice: number;
}


export class QueryInvestmentEfficiencySerializer extends QueryNoteSerializer {
  @Expose()
  approvedPurchasePriceFrom: number;

  @Expose()
  approvedPurchasePriceTo: number;

  @Expose()
  approvedPlanTypeId: number;
}


export class ApprovedInvestmentEfficiencyRequest {
  @Expose()
  approvedPlanId: number;

  @Expose()
  approvedPlanPrice: number;

  @Expose()
  approvedPlanTypeId: number;

  @Expose()
  approvedPlanName: string;

  @Expose()
  approvedPlanTime: number;

  @Expose()
  approvedPurchasePrice: number;
}
