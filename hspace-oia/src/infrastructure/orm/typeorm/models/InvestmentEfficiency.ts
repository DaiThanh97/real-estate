import { EntitySchema } from "typeorm";
import { IAccount } from "./Account";
import {
  AccountLogColumnSchemaPart,
  BaseColumnSchemaPart,
  BasePropertyAddressNote,
  BasePropertyNote,
  RelationsOfNoteSchemaPart,
  RelationsPropertyAddressOfNoteSchema
} from "./Base";
import { IInspectionExpectation } from "./InspectionExpectation";
import { IInvestmentEfficiencyPlanItem } from "./InvestmentEfficiencyPlanItem";
import { IMasterValue } from "./MasterValue";
import { IInvestmentEfficiencyLand } from "./InvestmentEfficiencyLand";
import { INote } from "./Note";

export const InvestmentEfficiencyTableName = "investment_efficiency_notes" as const;

export const InvestmentEfficiencyStatus = {
  Drafting: "Nháp",
  Pending: "Chờ duyệt",
  Approved: "Đã duyệt",
  Rejected: "Từ chối",
  Deleted: "Đã xoá",
} as const;

export interface IInvestmentEfficiency extends INote {
  id: number
  noteId: string;
  noteType: string;
  executionDate: Date;
  assigneeId: number;
  companyId: number;
  instructorId: number;
  status: string;
  isDeleted: boolean;
  approvedAt: Date;
  approvedBy: IAccount;
  rejectionNote: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  rejectedAt: Date;
  rejectedBy: IAccount;
  appraisalExpectationId: number;
  appraisalExpectation: IInspectionExpectation;
  planItems: IInvestmentEfficiencyPlanItem[];

  streetNumber: string;
  cityId: number;
  wardId: number;
  districtId: number;
  streetId: number;

  city: IMasterValue;
  ward: IMasterValue;
  district: IMasterValue;
  street: IMasterValue;

  approvedPlanId: number;
  approvedPlanPrice: number;
  approvedPlanTypeId: number;
  approvedPlanName: string;
  approvedPlanTime: number;
  approvedPurchasePrice: number;
  approvedPlan: IInvestmentEfficiencyLand;
  approvedPlanType: IMasterValue;
}

export const InvestmentEfficiency = new EntitySchema<IInvestmentEfficiency>({
  name: "investment_efficiency",
  tableName: InvestmentEfficiencyTableName,
  columns: {
    ...BaseColumnSchemaPart,
    ...BasePropertyNote,
    ...BasePropertyAddressNote,
    appraisalExpectationId: {
      name: "appraisal_expectation_id",
      type: Number,
      nullable: true,
    },
    approvedPlanId: {
      name: "approved_plan_id",
      type: Number,
      nullable: true,
    },
    approvedPlanPrice: {
      name: "approved_plan_price",
      type: "float",
      nullable: true,
    },
    approvedPlanTypeId: {
      name: "approved_plan_type_id",
      type: Number,
      nullable: true,
    },
    approvedPlanName: {
      name: "approved_plan_name",
      type: String,
      nullable: true,
    },
    approvedPlanTime: {
      name: "approved_plan_time",
      type: "float",
      nullable: true,
    },
    approvedPurchasePrice: {
      name: "approved_purchase_price",
      type: "float",
      nullable: true,
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    ...RelationsOfNoteSchemaPart,
    ...RelationsPropertyAddressOfNoteSchema,
    appraisalExpectation: {
      type: "many-to-one",
      target: "appraisal_expectation",
      joinColumn: { name: "appraisal_expectation_id", referencedColumnName: "id" },
    },
    planItems: {
      type: "one-to-many",
      target: "investment_efficiency_plan_item",
      inverseSide: "investmentEfficiency",
      cascade: true,
      eager: true,
      joinColumn: { referencedColumnName: "investment_efficiency_id" },
    },
    approvedPlanType: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "approved_plan_type_id", referencedColumnName: "id" },
    },
  },
  uniques: [
    {
      name: "UNIQUE_HD_NOTE_ID",
      columns: [
        "noteId",
      ]
    }
  ],
});
