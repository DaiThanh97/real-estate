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
import { IInvestmentEfficiency } from "./InvestmentEfficiency";
import { IProjectNegotiationPlanStep } from "./ProjectNegotiationPlanStep";
import { IProjectNegotiationReferItem } from "./ProjectNegotiationReferItem";
import { IMasterValue } from "./MasterValue";
import { INote } from "./Note";

export const ProjectNegotiationTableName = "project_negotiation_notes" as const;

export const ProjectNegotiationStatus = {
  Drafting: "Nháp",
  Pending: "Chờ duyệt",
  Approved: "Đã duyệt",
  Rejected: "Từ chối",
  Deleted: "Đã xoá",
} as const;

export const ProjectNegotiationPriority = {
  PriorityFirst: "Ưu tiên 1",
  PrioritySecond: "Ưu tiên 2",
  PriorityThird: "Ưu tiên 3",
  PriorityNA: "NA",
} as const;

export interface IProjectNegotiation extends INote {
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

  investmentEfficiencyId: number;
  investmentEfficiency: IInvestmentEfficiency;

  address: string;
  streetNumber: string;
  cityId: number;
  wardId: number;
  districtId: number;
  streetId: number;

  city: IMasterValue;
  ward: IMasterValue;
  district: IMasterValue;
  street: IMasterValue;

  price: number; // thông tin từ BDS
  priceUpdate: number; //  'Cập nhật giá bán' thông tin từ BDS
  priceAppraisalStatement: number; // "Giá trị tài sản thẩm định tại thời điểm hiện tại- Theo phương pháp so sánh" tại tab Kết luận
  priceApproved: number;// Giá mua phê duyệt, Hiện thông tin từ PADT
  priority: string;

  referItems: IProjectNegotiationReferItem[];
  planSteps: IProjectNegotiationPlanStep[];

  changedStatusTime: Date;
}

export const ProjectNegotiation = new EntitySchema<IProjectNegotiation>({
  name: "project_negotiation",
  tableName: ProjectNegotiationTableName,
  columns: {
    ...BaseColumnSchemaPart,
    ...BasePropertyNote,
    ...BasePropertyAddressNote,
    investmentEfficiencyId: {
      name: "investment_efficiency_id",
      type: Number,
      nullable: true,
    },
    price: {
      name: "price",
      type: "float",
      nullable: true
    },
    priceUpdate: {
      name: "price_update",
      type: "float",
      nullable: true
    },
    priceAppraisalStatement: {
      name: "price_appraisal_statement",
      type: "float",
      nullable: true
    },
    priceApproved: {
      name: "price_approved",
      type: "float",
      nullable: true
    },
    priority: {
      name: "priority",
      type: String,
      nullable: true
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    ...RelationsOfNoteSchemaPart,
    ...RelationsPropertyAddressOfNoteSchema,
    investmentEfficiency: {
      type: "many-to-one",
      target: "investment_efficiency",
      joinColumn: { name: "investment_efficiency_id", referencedColumnName: "id" },
    },
    referItems: {
      type: "one-to-many",
      target: "project_negotiation_refer_item",
      inverseSide: "projectNegotiation",
      joinColumn: { referencedColumnName: "project_negotiation_id" },
    },
    planSteps: {
      type: "one-to-many",
      target: "project_negotiation_plan_step",
      inverseSide: "projectNegotiation",
      joinColumn: { referencedColumnName: "project_negotiation_id" },
    },
  },
  uniques: [
    {
      name: "UNIQUE_PROJECT_NEGOTIATION_NOTE_ID",
      columns: [
        "noteId",
      ]
    }
  ],
});
