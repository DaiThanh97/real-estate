import { IAccount } from "./Account";
import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";

export const AccountEventModel = {
  Property: "property",
  InspectionStatement: "inspection_statement",
  InspectionExpectation: "inspection_expectation",
  InvestmentEfficiency: "investment_efficiency",
  AppraisalStatement: "appraisal_statement",
  AppraisalExpectation: "appraisal_expectation",
  InvestmentPlan: "investment_plan",
  ProjectNegotiation: "project_negotiation",
} as const;

export const AccountEventType = {
  BDS: {
    GUI_DUYET: "bds.nguoi_gui_duyet",
    YEU_CAU_DINH_GIA: "bds.nguoi_yeu_cau_dinh_gia",
  },
  KH: {
    GUI_DUYET: "kh.nguoi_gui_duyet",
    NGUOI_THUC_HIEN_TRUOC: "kh.nguoi_thuc_hien_truoc",
    NGUOI_THUC_HIEN: "kh.nguoi_thuc_hien",
    NGUOI_XOA: "kh.nguoi_xoa",
  },
  TH: {
    GUI_DUYET: "th.nguoi_gui_duyet",
    NGUOI_THUC_HIEN_TRUOC: "th.nguoi_thuc_hien_truoc",
    NGUOI_THUC_HIEN: "th.nguoi_thuc_hien",
    HOAN_THANH: "th.hoan_thanh",
    NGUOI_XOA: "th.nguoi_xoa",
  },
  KU: {
    GUI_DUYET: "ku.nguoi_gui_duyet",
    NGUOI_THUC_HIEN_TRUOC: "ku.nguoi_thuc_hien_truoc",
    NGUOI_THUC_HIEN: "ku.nguoi_thuc_hien",
    NGUOI_XOA: "ku.nguoi_xoa",
  },
  HD: {
    GUI_DUYET: "hd.nguoi_gui_duyet",
    NGUOI_THUC_HIEN_TRUOC: "hd.nguoi_thuc_hien_truoc",
    NGUOI_THUC_HIEN: "hd.nguoi_thuc_hien",
    NGUOI_XOA: "hd.nguoi_xoa",
  },
  TU: {
    GUI_DUYET: "tu.nguoi_gui_duyet",
    NGUOI_THUC_HIEN_TRUOC: "tu.nguoi_thuc_hien_truoc",
    NGUOI_THUC_HIEN: "tu.nguoi_thuc_hien",
    NGUOI_XOA: "tu.nguoi_xoa",
  },
  PD: {
    GUI_DUYET: "pd.nguoi_gui_duyet",
    NGUOI_THUC_HIEN_TRUOC: "pd.nguoi_thuc_hien_truoc",
    NGUOI_THUC_HIEN: "pd.nguoi_thuc_hien",
    NGUOI_XOA: "pd.nguoi_xoa",
  },
  TL: {
    GUI_DUYET: "tl.nguoi_gui_duyet",
    NGUOI_THUC_HIEN_TRUOC: "tl.nguoi_thuc_hien_truoc",
    NGUOI_THUC_HIEN: "tl.nguoi_thuc_hien",
    NGUOI_XOA: "tl.nguoi_xoa",
  }
};

export interface IAccountEvent {
  id: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  referenceId: number;
  accountId: number;
  account: IAccount;
  model: string;
  type: string;
}

export const AccountEvent = new EntitySchema<IAccountEvent>({
  name: "account_event",
  tableName: "account_events",
  columns: {
    ...BaseColumnSchemaPart,
    referenceId: {
      name: "reference_id",
      type: Number,
      nullable: true,
    },
    model: {
      name: "model",
      type: String,
      nullable: false,
    },
    type: {
      name: "type",
      type: String,
      nullable: false,
    },
    accountId: {
      name: "account_id",
      type: Number,
      nullable: true,
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    account: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "account_id", referencedColumnName: "id" },
    },
  },
});
