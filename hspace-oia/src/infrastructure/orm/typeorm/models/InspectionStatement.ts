import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart, BasePropertyNote, RelationsOfNoteSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { IMasterValue } from "./MasterValue";
import { InspectionStatementLevel } from "./InspectionStatementLevel";
import { INote } from "./Note";

export const InspectionStatementTableName = "inspection_statement_notes" as const;

export const InspectionStatementStatus = {
  Drafting: "Nháp",
  Pending: "Chờ duyệt",
  Approved: "Đã duyệt",
  Rejected: "Từ chối",
  Deleted: "Đã xoá",
} as const;

export const InspectionStatementType = {
  Current: "Hiện trạng",
  Estimate: "Ước tính",
} as const;

export interface IInspectionStatement extends INote {
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

  streetNumber: string;
  cityId: number;
  wardId: number;
  districtId: number;
  streetId: number;
  streetGroupId: number;
  positionGroupId: number;

  city: IMasterValue;
  ward: IMasterValue;
  district: IMasterValue;
  street: IMasterValue;
  streetGroup: IMasterValue;
  positionGroup: IMasterValue;

  address: string;
  otherAddress: boolean;
  locationDescription: string;
  closedDealValue: number;
  transactionDate: Date;
  brokerId: number;
  broker: IAccount;
  unitPrice: number;

  landUseRights: string;
  construction: string;
  totalAdjustment: number;
  marketLandUnitPrice: number;
  closedDealUnitPrice: number;

  totalAdvantageLevel: number;
  totalDisadvantageLevel: number;
  advantageLevels: InspectionStatementLevel[];
  disadvantageLevels: InspectionStatementLevel[];

  rejectedAt: Date;
  rejectedBy: IAccount;
}

export const InspectionStatement = new EntitySchema<IInspectionStatement>({
  name: "inspection_statement",
  tableName: "inspection_statement_notes",
  columns: {
    ...BaseColumnSchemaPart,
    ...BasePropertyNote,
    streetNumber: {
      type: "varchar",
      name: "street_number",
      length: 64,
      nullable: true
    },
    cityId: {
      type: "int",
      name: "city_id",
      nullable: true
    },
    wardId: {
      type: "int",
      name: "ward_id",
      nullable: true
    },
    districtId: {
      type: "int",
      name: "district_id",
      nullable: true
    },
    streetId: {
      type: "int",
      name: "street_id",
      nullable: true
    },
    streetGroupId: {
      type: "int",
      name: "street_group_id",
      nullable: true
    },
    positionGroupId: {
      type: "int",
      name: "position_group_id",
      nullable: true,
    },
    address: {
      type: String,
      name: "address",
      default: "",
    },
    otherAddress: {
      type: Boolean,
      name: "other_address",
      default: false,
    },
    locationDescription: {
      type: String,
      name: "location_description",
      default: "",
    },
    closedDealValue: {
      type: "float",
      name: "closed_deal_value",
      default: 0,
    },
    closedDealUnitPrice: {
      type: "float",
      name: "closed_deal_unit_price",
      default: 0,
    },
    transactionDate: {
      type: "date",
      nullable: true,
      name: "transaction_date"
    },
    brokerId: {
      type: "int",
      name: "broker_id",
      nullable: true
    },
    landUseRights: {
      type: "jsonb",
      name: "land_use_rights",
      nullable: true,
    },
    construction: {
      type: "jsonb",
      name: "construction",
      nullable: true,
    },
    totalAdjustment: {
      type: "float",
      name: "total_adjustment",
      nullable: true,
    },
    marketLandUnitPrice: {
      type: "float",
      name: "market_land_unit_price",
      default: 0,
    },
    totalAdvantageLevel: {
      type: "float",
      name: "total_advantage_level",
      nullable: true,
    },
    totalDisadvantageLevel: {
      type: "float",
      name: "total_disadvantage_level",
      nullable: true,
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    ...RelationsOfNoteSchemaPart,
    city: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "city_id", referencedColumnName: "id" },
    },
    ward: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "ward_id", referencedColumnName: "id" },
    },
    district: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "district_id", referencedColumnName: "id" },
    },
    street: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "street_id", referencedColumnName: "id" },
    },
    streetGroup: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "street_group_id", referencedColumnName: "id" },
    },
    positionGroup: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "position_group_id", referencedColumnName: "id" },
    },
    broker: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "broker_id", referencedColumnName: "id" },
    },
    advantageLevels: {
      type: "one-to-many",
      target: "advantage_level",
      inverseSide: "inspectionStatement",
      cascade: true,
      joinColumn: { referencedColumnName: "inspection_statement_id" },
    },
    disadvantageLevels: {
      type: "one-to-many",
      target: "disadvantage_level",
      inverseSide: "inspectionStatement",
      cascade: true,
      joinColumn: { referencedColumnName: "inspection_statement_id" },
    }
  },
  uniques: [
    {
      name: "UNIQUE_NOTE_ID",
      columns: [
        "noteId",
      ]
    }
  ],
});
