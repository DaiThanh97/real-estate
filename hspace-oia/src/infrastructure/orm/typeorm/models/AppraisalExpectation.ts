import { EntitySchema } from "typeorm";
import {
  AccountLogColumnSchemaPart,
  BaseColumnSchemaPart,
  BasePropertyAddressNote,
  BasePropertyNote,
  RelationsOfNoteSchemaPart,
  RelationsPropertyAddressOfNoteSchema
} from "./Base";
import { IAccount } from "./Account";
import { IAppraisalExpectationPlanItem } from "./AppraisalExpectationPlanItem";
import { IMasterValue } from "./MasterValue";
import { IInspectionExpectation } from "./InspectionExpectation";
import { INote } from "./Note";

export const AppraisalExpectationTableName = "appraisal_expectation_notes" as const;

export const AppraisalExpectationStatus = {
  Drafting: "Nháp",
  Finished: "Hoàn thành",
  Pending: "Chờ duyệt",
  Approved: "Đã duyệt",
  Rejected: "Từ chối",
  Deleted: "Đã xoá",
} as const;

export const AppraisalExpectationType = {
  Current: "Hiện trạng",
  Estimate: "Ước tính",
} as const;

export interface IAppraisalExpectation extends INote {
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
  completedAt: Date;
  completedBy: IAccount;

  inspectionExpectationId: number;
  inspectionExpectation: IInspectionExpectation;

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

  planItems: IAppraisalExpectationPlanItem[];

}

export const AppraisalExpectation = new EntitySchema<IAppraisalExpectation>({
  name: "appraisal_expectation",
  tableName: AppraisalExpectationTableName,
  columns: {
    ...BaseColumnSchemaPart,
    ...BasePropertyNote,
    ...BasePropertyAddressNote,
    inspectionExpectationId: {
      name: "inspection_expectation_id",
      type: Number,
      nullable: true,
    },
    completedAt: {
      name: "completed_at",
      type: Date,
      nullable: true,
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    ...RelationsOfNoteSchemaPart,
    ...RelationsPropertyAddressOfNoteSchema,
    inspectionExpectation: {
      type: "many-to-one",
      target: "inspection_expectation",
      joinColumn: { name: "inspection_expectation_id", referencedColumnName: "id" },
    },
    planItems: {
      type: "one-to-many",
      target: "appraisal_expectation_plan_item",
      inverseSide: "appraisalExpectation",
      cascade: true,
      eager: true,
      joinColumn: { referencedColumnName: "appraisal_expectation_id" },
    },
    completedBy: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "completed_by", referencedColumnName: "id" },
    },
  },
  uniques: [
    {
      name: "UNIQUE_APPRAISAL_EXPECTATION_NOTE_ID",
      columns: [
        "noteId",
      ]
    }
  ],
});
