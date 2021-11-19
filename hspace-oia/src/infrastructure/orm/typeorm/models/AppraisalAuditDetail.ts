import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart, ActiveStatusColumnSchemaPart } from "./Base";
import { IAppraisalStatement } from "./AppraisalStatement";
import { IProperty } from "./Property";
import { IInspectionStatement } from "./InspectionStatement";

export interface IAppraisalAuditDetail {
  id: number;
  type: string;

  inspectionStatementId: number;
  inspectionStatement: IInspectionStatement;
  
  appraisalStatementId: number;
  appraisalStatement: IAppraisalStatement;

  propertyId: number;
  property: IProperty;

  address: string;
  propertyInfo: string;
  useRightCertificate: string;
  construction: string;

  totalAdjustment : number;
  marketLandUnitPrice: number;
  totalLevelsAdvantage: number;
  totalLevelsDisadvantage: number;

  advantageLevels : string;
  disadvantageLevels: string;

  adjustments: string;
  
  createdAt: Date;
  updatedAt: Date;
  createdBy: Account;
  updatedBy: Account;

}

export const AppraisalAuditDetail = new EntitySchema<IAppraisalAuditDetail>({
  name: "appraisal_audit_detail",
  tableName: "appraisal_audit_details",
  columns: {
    ...BaseColumnSchemaPart,
    ...ActiveStatusColumnSchemaPart,
    appraisalStatementId: {
      type: Number,
      name: "appraisal_statement_id",
      nullable: true,
    },
    inspectionStatementId: {
      name: "inspection_statement_id",
      type: Number,
      nullable: false,
    },
    propertyId: {
      type: Number,
      name: "property_id",
      nullable: false,
    },
    type: {
      type: "varchar",
      length: 128,
      name: "type",
      nullable: true,
    },
    address: {
      type: String,
      name: "address",
      nullable: true,
    },
    propertyInfo: {
      name: "property_info",
      type: "jsonb",
      nullable: true
    },
    useRightCertificate: {
      name: "use_right_certificate",
      type: "jsonb",
      nullable: true
    },
    construction: {
      name: "construction",
      type: "jsonb",
      nullable: true
    },
    totalAdjustment: {
      name: "total_adjustment",
      type: "float",
      nullable: true
    },
    marketLandUnitPrice: {
      name: "market_land_unit_price",
      type: "float",
      nullable: true
    },
    totalLevelsAdvantage: {
      name: "total_levels_advantage",
      type: "float",
      nullable: true
    },
    totalLevelsDisadvantage: {
      name: "total_levels_disadvantage",
      type: "float",
      nullable: true
    },
    advantageLevels: {
      name: "advantage_levels",
      type: "jsonb",
      nullable: true
    },
    disadvantageLevels: {
      name: "disadvantage_levels",
      type: "jsonb",
      nullable: true
    },
    adjustments: {
      name: "adjustments",
      type: "jsonb",
      nullable: true
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    appraisalStatement: {
      type: "many-to-one",
      target: "appraisal_statement",
      inverseSide: "appraisalAuditDetails",
      joinColumn: { name: "appraisal_statement_id", referencedColumnName: "id" },
      nullable: true,
    },
    inspectionStatement: {
      type: "many-to-one",
      target: "inspection_statement",
      joinColumn: { name: "inspection_statement_id", referencedColumnName: "id" },
    },
    property: {
      type: "many-to-one",
      target: "property",
      joinColumn: { name: "property_id", referencedColumnName: "id" },
    }
  },
});
