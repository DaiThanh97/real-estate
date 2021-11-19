import { EntitySchema } from "typeorm";
import {
  AccountLogColumnSchemaPart,
  BaseColumnSchemaPart,
  BasePropertyAddressNote,
  BasePropertyNote,
  RelationsOfNoteSchemaPart,
  RelationsPropertyAddressOfNoteSchema
} from "./Base";
import { IInspectionStatement } from "./InspectionStatement";
import { IAppraisalAuditDetail } from "./AppraisalAuditDetail";
import { AppraisalStatementStatus, AppraisalStatementType } from "../../../../domain/models/AppraisalStatement";
import { IMasterValue } from "./MasterValue";
import { INote } from "./Note";
import { IAccount } from "./Account";

export const AppraisalStatementTableName = "appraisal_statement_notes" as const;

export interface IAppraisalStatement extends INote {
  id: number;
  noteId: string;
  noteType: string;
  executionDate: Date;
  executionBy: IAccount | number;
  assigneeId: number;
  companyId: number;
  instructorId: number;
  status: string;
  isDeleted: boolean;
  approvedAt: Date;
  approvedBy: IAccount | number;
  completedAt: Date;
  completedBy: IAccount | number;
  rejectionNote: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IAccount | number;
  updatedBy: IAccount | number;
  rejectedAt: Date;
  rejectedBy: IAccount | number;

  inspectionStatementId: number;
  inspectionStatement: IInspectionStatement;
  comments: {
    type: string,
    comment: string,
  };
  auditDetails: IAppraisalAuditDetail[];

  address: string;
  streetNumber: string;
  cityId: number;
  districtId: number;
  wardId: number;
  streetId: number;

  city: IMasterValue;
  district: IMasterValue;
  ward: IMasterValue;
  street: IMasterValue;

  landUnitPricePPSS: number; // Đơn giá đất thẩm định (PPSS)
  propertyUnitPricePPSS: number; // Giá trị tài sản thẩm định (PPSS)
  landUnitPricePPDG: number; // Đơn giá đất thẩm định (PPĐG)
  propertyUnitPricePPDG: number; // Giá trị tài sản thẩm định (PPĐG)

  resultAuditPPSS: string;

  generalInfoPPDG: string;
  adjustControlPPDG: string;
  resultAuditPPDG: string;

}

export const AppraisalStatement = new EntitySchema<IAppraisalStatement>({
  name: "appraisal_statement",
  tableName: AppraisalStatementTableName,
  columns: {
    ...BaseColumnSchemaPart,
    ...BasePropertyNote,
    ...BasePropertyAddressNote,
    noteType: {
      type: "varchar",
      length: 128,
      name: "note_type",
      nullable: true,
      default: AppraisalStatementType.Current
    },
    status: {
      type: "varchar",
      length: 128,
      name: "status",
      nullable: true,
      default: AppraisalStatementStatus.Drafting
    },
    inspectionStatementId: {
      name: "inspection_statement_id",
      type: Number,
      nullable: true,
    },
    comments: {
      type: "jsonb",
      nullable: true
    },
    completedAt: {
      name: "completed_at",
      type: Date,
      nullable: true,
    },
    landUnitPricePPSS: {
      name: "land_unit_price_ppss",
      type: "float",
      nullable: true
    },
    propertyUnitPricePPSS: {
      name: "property_unit_price_ppss",
      type: "float",
      nullable: true
    },
    landUnitPricePPDG: {
      name: "land_unit_price_ppdg",
      type: "float",
      nullable: true
    },
    propertyUnitPricePPDG: {
      name: "property_unit_price_ppdg",
      type: "float",
      nullable: true
    },
    resultAuditPPSS: {
      name: "result_audit_ppss",
      type: "jsonb",
      nullable: true
    },
    generalInfoPPDG: {
      name: "general_info_ppdg",
      type: "jsonb",
      nullable: true
    },
    adjustControlPPDG: {
      name: "adjust_control_ppdg",
      type: "jsonb",
      nullable: true
    },
    resultAuditPPDG: {
      name: "result_audit_ppdg",
      type: "jsonb",
      nullable: true
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    ...RelationsOfNoteSchemaPart,
    ...RelationsPropertyAddressOfNoteSchema,
    inspectionStatement: {
      type: "many-to-one",
      target: "inspection_statement",
      joinColumn: { name: "inspection_statement_id", referencedColumnName: "id" },
    },
    auditDetails: {
      type: "one-to-many",
      target: "appraisal_audit_detail",
      inverseSide: "appraisalStatement",
      cascade: true,
      eager: true,
      joinTable: true,
    },
    completedBy: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "completed_by", referencedColumnName: "id" },
    },
    executionBy: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "execution_by", referencedColumnName: "id" },
    },
  },
  uniques: [
    {
      name: "UNIQUE_APPRAISAL_STATEMENT_NOTE_ID",
      columns: [
        "noteId",
      ]
    }
  ],
});
