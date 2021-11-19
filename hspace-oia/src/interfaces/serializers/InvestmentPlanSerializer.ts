import { Expose, Type } from "class-transformer";
import { baseSerializerMixin } from "./Base";
import { ChangeableNoteSerializer, noteSerializerMixin, QueryNoteSerializer } from "./NoteSerializer";
import { AppraisalStatementSerializer } from "./AppraisalStatementSerializer";


class ChangeablePlanLandSerializer {
  @Expose()
  id: number;

  @Expose()
  index: number;

  @Expose()
  address: string;

  @Expose()
  description: string;

  @Expose()
  planTypeId: number;

  @Expose()
  constructionType: string;

  @Expose()
  general: string;

  @Expose()
  attachments: string;

  @Expose()
  landUseRights: string;

  @Expose()
  construction: string;

  @Expose()
  time: string;
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
  @Type(() => ChangeablePlanLandSerializer)
  lands: ChangeablePlanLandSerializer[];

  @Expose()
  refConstructionInfo: string;
}

export class ChangeableInvestmentPlanSerializer extends ChangeableNoteSerializer {
  @Expose()
  appraisalStatementId: number;

  @Expose()
  @Type(() => ChangeablePlanItemSerializer)
  planItems: ChangeablePlanItemSerializer[];
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
export class InvestmentPlanSerializer extends ChangeableInvestmentPlanSerializer {
  @Expose()
  @Type(() => AppraisalStatementSerializer)
  appraisalStatement: AppraisalStatementSerializer | undefined;

  @Expose()
  @Type(() => PlanItemSerializer)
  planItems: PlanItemSerializer[];
}

export class QueryInvestmentPlanSerializer extends QueryNoteSerializer {
}
