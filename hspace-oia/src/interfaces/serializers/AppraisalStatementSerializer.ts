import { baseSerializerMixin, BasicAccountSerializer } from "./Base";
import { AppraisalAuditDetailSerializer } from "./AppraisalAuditDetailSerializer";
import { InspectionStatementSerializer } from "./InspectionStatementSerializer";
import { Expose, Type } from "class-transformer";
import { ChangeableNoteSerializer, noteSerializerMixin, QueryNoteSerializer } from "./NoteSerializer";

export function changeableJsonAndArrayAppraisalStatementMixin<T extends new(...args: any[]) => {/**/ }>(constructor: T) {
  const fields = ["comments", "auditDetails", "resultAuditPPSS", "generalInfoPPDG","adjustControlPPDG", "resultAuditPPDG"];
  const ChangeableMixinClass = class extends constructor {
    resultAuditPPSS: string;
    generalInfoPPDG: string;
    adjustControlPPDG: string;
    resultAuditPPDG: string;
    comments: CommentSerializer[] | undefined;
    auditDetails: AppraisalAuditDetailSerializer[] | undefined;
  };
  for (const field of fields) {
    Expose()(ChangeableMixinClass.prototype, field);
  }

  Type(() => CommentSerializer)(ChangeableMixinClass.prototype, "comments");
  Type(() => AppraisalAuditDetailSerializer)(ChangeableMixinClass.prototype, "auditDetails");
  return ChangeableMixinClass;
}

export class CommentSerializer {
  @Expose()
  type: string;
  @Expose()
  comment: string;
}

@changeableJsonAndArrayAppraisalStatementMixin
export class ChangeableAppraisalStatementSerializer extends ChangeableNoteSerializer {
  
  @Expose()
  inspectionStatementId:  number;
  @Expose()
  propertyId:  number;
  @Expose()
  landUnitPricePPSS: number; // Đơn giá đất thẩm định (PPSS)
  @Expose()
  propertyUnitPricePPSS: number; // Giá trị tài sản thẩm định (PPSS)
  @Expose()
  landUnitPricePPDG: number; // Đơn giá đất thẩm định (PPĐG)
  @Expose()
  propertyUnitPricePPDG: number; // Giá trị tài sản thẩm định (PPĐG)

}

class AppraisalStatementRatioSerializer {
  @Expose()
  ratioClosedDealAppraise: number | undefined;
}

@baseSerializerMixin
@noteSerializerMixin
export class AppraisalStatementSerializer extends ChangeableAppraisalStatementSerializer {

  @Expose()
  @Type(() => InspectionStatementSerializer)
  inspectionStatement: InspectionStatementSerializer;

  @Expose()
  completedAt: Date | undefined;

  @Expose()
  @Type(() => BasicAccountSerializer)
  completedBy: BasicAccountSerializer;
}

export class AppraisalStatementDetailSerializer extends AppraisalStatementSerializer {
  @Expose()
  @Type(() => AppraisalStatementRatioSerializer)
  ratio?: AppraisalStatementRatioSerializer;
}

@baseSerializerMixin
@noteSerializerMixin
export class AppraisalStatementShortItemSerializer extends ChangeableAppraisalStatementSerializer {
  @Expose()
  @Type(() => InspectionStatementSerializer)
  inspectionStatement: InspectionStatementSerializer;

  @Expose()
  completedAt: Date | undefined;

  @Expose()
  @Type(() => BasicAccountSerializer)
  completedBy: BasicAccountSerializer;
}

export class QueryAppraisalStatementSerializer extends QueryNoteSerializer {
 
  @Expose()
  priceFrom: number;

  @Expose()
  priceTo: number;

}
