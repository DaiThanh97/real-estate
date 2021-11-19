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
import { IInspectionExpectationPlanItem } from "./InspectionExpectationPlanItem";
import { IMasterValue } from "./MasterValue";
import { IInvestmentPlan } from "./InvestmentPlan";
import { INote } from "./Note";

export const InspectionExpectationTableName = "inspection_expectation_notes" as const;

export interface IInspectionExpectation extends INote {
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

  investmentPlanId: number;
  investmentPlan: IInvestmentPlan;

  // support search address, city, district ...
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

  planItems: IInspectionExpectationPlanItem[];

  changedStatusTime: Date;
}

export const InspectionExpectation = new EntitySchema<IInspectionExpectation>({
  name: "inspection_expectation",
  tableName: InspectionExpectationTableName,
  columns: {
    ...BaseColumnSchemaPart,
    ...BasePropertyNote,
    ...BasePropertyAddressNote,
    investmentPlanId: {
      name: "investment_plan_id",
      type: Number,
      nullable: true,
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    ...RelationsOfNoteSchemaPart,
    ...RelationsPropertyAddressOfNoteSchema,
    investmentPlan: {
      type: "many-to-one",
      target: "investment_plan",
      joinColumn: { name: "investment_plan_id", referencedColumnName: "id" },
    },
    planItems: {
      type: "one-to-many",
      target: "inspection_expectation_plan_item",
      inverseSide: "inspectionExpectation",
      cascade: true,
      eager: true,
      joinColumn: { referencedColumnName: "inspection_expectation_id" },
    },
  },
  uniques: [
    {
      name: "UNIQUE_INSPECTION_EXPECTATION_NOTE_ID",
      columns: [
        "noteId",
      ]
    }
  ],
});
