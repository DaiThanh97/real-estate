import { Expose, Type } from "class-transformer";
import { BaseSerializer, baseSerializerMixin } from "./Base";
import { ChangeableNoteSerializer, noteSerializerMixin, QueryNoteSerializer } from "./NoteSerializer";
import { InvestmentEfficiencySerializer } from "./InvestmentEfficiencySerializer";
import { ProjectNegotiationReferItemSerializer } from "./ProjectNegotiationReferItemSerializer";

class ActionDetailSerializer extends BaseSerializer {
  @Expose()
  action: string;
}

class OpinionDetailSerializer extends BaseSerializer {
  @Expose()
  opinion: string;
}

class PlanStepSerializer extends BaseSerializer {
  @Expose()
  categoryId: number;

  @Expose()
  target: string;

  @Expose()
  result: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  brokerId: number;

  @Expose()
  actionDetailId: number;

  @Expose()
  @Type(() => ActionDetailSerializer)
  actionDetail: ActionDetailSerializer;

  @Expose()
  opinionDetailId: number;

  @Expose()
  @Type(() => OpinionDetailSerializer)
  opinionDetail: OpinionDetailSerializer;
}

export class ChangeableProjectNegotiationPlanStepSerializer {
  @Expose()
  categoryId: number;

  @Expose()
  target: string;

  @Expose()
  result: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  brokerId: number;
}

export class ChangeableProjectNegotiationSerializer extends ChangeableNoteSerializer {
  @Expose()
  investmentEfficiencyId: number;

  @Expose()
  price: number;
  @Expose()
  priceUpdate: number;
  @Expose()
  priceAppraisalStatement: number;
  @Expose()
  priceApproved: number;
  @Expose()
  priority: string;
}

@baseSerializerMixin
@noteSerializerMixin
export class ProjectNegotiationSerializer extends ChangeableProjectNegotiationSerializer {
  @Expose()
  @Type(() => InvestmentEfficiencySerializer)
  investmentEfficiency: InvestmentEfficiencySerializer | undefined;

  @Expose()
  @Type(() => ProjectNegotiationReferItemSerializer)
  referItems: ProjectNegotiationReferItemSerializer[];

  @Expose()
  @Type(() => PlanStepSerializer)
  planSteps: PlanStepSerializer[];
}

export class QueryProjectNegotiationSerializer extends QueryNoteSerializer {
  @Expose()
  sourceId: number;

  @Expose()
  priority: string;
}
