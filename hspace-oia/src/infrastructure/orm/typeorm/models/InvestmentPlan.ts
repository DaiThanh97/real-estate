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
import { IAppraisalStatement } from "./AppraisalStatement";
import { IInvestmentPlanItem } from "./InvestmentPlanItem";
import { INote } from "./Note";

export const InvestmentPlanTableName = "investment_plan_notes" as const;

export const InvestmentPlanStatus = {
  Drafting: "Nháp",
  Pending: "Chờ duyệt",
  Approved: "Đã duyệt",
  Rejected: "Từ chối",
  Deleted: "Đã xoá",
} as const;

export interface IInvestmentPlan extends INote {
  id: number;
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

  appraisalStatementId: number;
  appraisalStatement: IAppraisalStatement;
  planItems: IInvestmentPlanItem[];
}

export const InvestmentPlan = new EntitySchema<IInvestmentPlan>({
  name: "investment_plan",
  tableName: InvestmentPlanTableName,
  columns: {
    ...BaseColumnSchemaPart,
    ...BasePropertyNote,
    ...BasePropertyAddressNote,
    appraisalStatementId: {
      name: "appraisal_statement_id",
      type: Number,
      nullable: true,
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    ...RelationsOfNoteSchemaPart,
    ...RelationsPropertyAddressOfNoteSchema,
    appraisalStatement: {
      type: "many-to-one",
      target: "appraisal_statement",
      joinColumn: { name: "appraisal_statement_id", referencedColumnName: "id" },
    },
    planItems: {
      type: "one-to-many",
      target: "investment_plan_item",
      inverseSide: "investmentPlan",
      cascade: true,
      eager: true,
      joinColumn: { referencedColumnName: "investment_plan_id" },
    }
  },
  uniques: [
    {
      name: "UNIQUE_INVESTMENT_PLAN_NOTE_ID",
      columns: [
        "noteId",
      ]
    }
  ],
});
