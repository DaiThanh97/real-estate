import { Expose } from "class-transformer";
import { baseSerializerMixin } from "./Base";

export class ChangeableAppraisalAuditDetailSerializer {
  @Expose()
  type: string;

  @Expose()
  inspectionStatementId: number;

  @Expose()
  appraisalStatementId: number;

  @Expose()
  propertyId: number;

  @Expose()
  address: string;

  @Expose()
  propertyInfo: string;

  @Expose()
  useRightCertificate: string;

  @Expose()
  construction: string;

  @Expose()
  totalAdjustment : number;
  
  @Expose()
  marketLandUnitPrice: number;

  @Expose()
  totalLevelsAdvantage: number; 

  @Expose()
  totalLevelsDisadvantage: number; 

  @Expose()
  advantageLevels: string;

  @Expose()
  disadvantageLevels: string;

  @Expose()
  adjustments: string;
  
}

@baseSerializerMixin
export class AppraisalAuditDetailSerializer extends ChangeableAppraisalAuditDetailSerializer {

}
