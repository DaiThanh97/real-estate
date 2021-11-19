import { EntitySchema, EntitySchemaRelationOptions } from "typeorm";
import { AccountLogColumnSchemaPart, ActiveStatusColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IMasterValue } from "./MasterValue";
import { IAccount } from "./Account";
import { IPropertyHistoryNote } from "./PropertyHistoryNote";
import { IPropertyBookmark } from "./PropertyBookmark";
import { ITopic } from "./Topic";
import { ILatestApprovedNote } from "./LatestApprovedNote";

export const PropertyPrefix = "BDS" as const;

export const DealStage = {
  InProgress: "Đang giao dịch",
  Transacted: "Đã giao dịch",
} as const;

export const PropertyStatus = {
  Drafting: "Nháp",
  Existed: "Đã tồn tại",
  Pending: "Chờ duyệt",
  Approved: "Đã duyệt",
  Rejected: "Từ chối",
  Purchased: "Đã mua",
  Deleted: "Đã xoá",
  Transacted: "Đã giao dịch",
  Sale: "Đã bán"
} as const;

export const BusinessStatus = {
  None: "Không có",
  OnSubmit: "Chờ tiếp nhận",
  Submitted: "Đã tiếp nhận",
  Verifying: "Đang thẩm định",
  Verified: "Đã thẩm định",
  Planing: "Đang lập PAĐT",
  VerifiedPADT: "Đã lập PAĐT",
  VerifyingKSUT: "Đang KS-UT",
  VerifiedKSUT: "Đã KS-UT",
  VerifyingTDUT: "Đang TĐ-UT",
  VerifiedTDUT: "Đã TĐ-UT",
  VerifyingHQDT: "Đang ĐG HQĐT",
  VerifiedHQDT: "Đã ĐG HQĐT",
  VerifyingTLDA: "Đang thương lượng",
  VerifiedTLDA: "Đã thương lượng",
} as const;

export const ConstructionStage = {
  Exist: "Có công trình",
  NotExist: "Không có công trình"
} as const;

export const AllowImageMIMETypes: Readonly<string[]> = ["image/jpeg", "image/jpe", "image/jpg", "image/png",
  "image/jp2", "image/x-jp2", "image/jpf", "image/x-jpf", "image/mj2", "image/jpm", "image/jpx",
  "image/jpc", "image/webp"] as const;
export const AllowDocumentMIMETypes: Readonly<string[]> = ["application/pdf", "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain", "text/csv", "text/comma-separated-values"] as const;
export const AllowMIMETypes: Readonly<string[]> = [...AllowImageMIMETypes, ...AllowDocumentMIMETypes] as const;

export interface IProperty {
  id: number;
  streetNumber: string;
  generalNote: string;
  price: number;
  longitude: number;
  latitude: number;
  cityId: number;
  wardId: number;
  districtId: number;
  streetId: number;
  locationTypeId: number;
  urgentLevelId: number;
  attachments: {
    url: string,
    key: string,
    mimeType: string,
    size: string,
    fileName: string
  },
  landPlot: string,
  map: string,
  horizontalFront: number,
  horizontalBack: number,
  height1: number,
  height2: number,
  propertyTypeId: number,
  propertyPeriodId: number;
  propertyUsingId: number;
  recognizedArea: number;
  unrecognizedArea: number;
  recognizedPlanningArea: number;
  groundFloors: number;
  mezzanines: number;
  basements: number;
  roofs: number;
  structure: string;
  recognizedFloorArea: number;
  unrecognizedFloorArea: number;
  constructionNote: string;
  sourceId: number;
  dealStage: string;
  businessStatus: string;
  transactionDate: Date;
  closedDealValue: number;
  status: string;
  constructionCurrentStage: string;
  code: string;
  description: string;
  city: IMasterValue;
  ward: IMasterValue;
  district: IMasterValue;
  street: IMasterValue;
  locationType: IMasterValue;
  urgentLevel: IMasterValue;
  propertyType: IMasterValue;
  propertyPeriod: IMasterValue;
  propertyUsing: IMasterValue;
  source: IAccount;
  propertyHistoryNotes: IPropertyHistoryNote[];
  propertyBookmarks: IPropertyBookmark[];
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount | number;
  updatedBy: IAccount | number;

  approvedAt: Date;
  approvedBy: IAccount;
  brokerId: number;
  broker: IAccount;
  changeablePrice: number;
  saleBrokerId: number;
  isActive: boolean;
  topicId: number;
  topic: ITopic;
  latestApprovedNotes: ILatestApprovedNote;
  changedStatusTime: Date;
  version: string;
  // Nguồn tin thu thập
  sourceCollectorId: IAccount
}

export const Property = new EntitySchema<IProperty>({
  name: "property",
  tableName: "properties",
  columns: {
    ...BaseColumnSchemaPart,
    ...ActiveStatusColumnSchemaPart,
    version: {
      type: "varchar",
      name: "version",
      length: 8,
      default: "1.000"
    },
    changedStatusTime: {
      type: Date,
      name: "changed_status_time",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
    streetNumber: {
      type: "varchar",
      name: "street_number",
      length: 64,
      nullable: true
    },
    description: {
      type: "text",
      nullable: true
    },
    generalNote: {
      type: "text",
      name: "general_note",
      nullable: true
    },
    price: {
      type: "float",
      nullable: false,
      default: 0,
    },
    longitude: {
      type: "float",
      nullable: true
    },
    latitude: {
      type: "float",
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
    locationTypeId: {
      type: "int",
      name: "location_type_id",
      nullable: true
    },
    urgentLevelId: {
      type: "int",
      name: "urgent_level_id",
      nullable: true
    },
    attachments: {
      type: "simple-json",
      nullable: true
    },
    landPlot: {
      type: "varchar",
      length: 64,
      name: "land_plot",
      nullable: true
    },
    map: {
      type: "varchar",
      length: 64,
      nullable: true
    },
    horizontalFront: {
      type: "float",
      name: "horizontal_front",
      nullable: true
    },
    horizontalBack: {
      type: "float",
      name: "horizontal_back",
      nullable: true
    },
    height1: {
      type: "float",
      nullable: true
    },
    height2: {
      type: "float",
      nullable: true
    },
    propertyTypeId: {
      type: "int",
      name: "property_type_id",
      nullable: true
    },
    propertyPeriodId: {
      type: "int",
      name: "property_period_id",
      nullable: true
    },
    propertyUsingId: {
      type: "int",
      name: "property_using_id",
      nullable: true
    },
    recognizedArea: {
      type: "float",
      name: "recognized_area",
      nullable: true,
    },
    unrecognizedArea: {
      type: "float",
      name: "unrecognized_area",
      nullable: true
    },
    recognizedPlanningArea: {
      type: "float",
      name: "recognized_planning_area",
      nullable: true
    },
    constructionCurrentStage: {
      type: "varchar",
      length: 128,
      name: "construction_current_stage",
      default: ConstructionStage.NotExist,
      nullable: true
    },
    groundFloors: {
      type: "int",
      name: "ground_floors",
      nullable: true
    },
    mezzanines: {
      type: "int",
      nullable: true
    },
    basements: {
      type: "int",
      nullable: true
    },
    roofs: {
      type: "int",
      nullable: true
    },
    structure: {
      type: "text",
      nullable: true
    },
    recognizedFloorArea: {
      type: "float",
      nullable: true,
      name: "recognized_floor_area"
    },
    unrecognizedFloorArea: {
      type: "float",
      nullable: true,
      name: "unrecognized_floor_area"
    },
    constructionNote: {
      type: "text",
      nullable: true,
      name: "construction_note"
    },
    sourceId: {
      type: "int",
      name: "source_id",
      nullable: true
    },
    dealStage: {
      type: "varchar",
      length: 128,
      name: "deal_stage",
      nullable: true,
      default: DealStage.InProgress
    },
    businessStatus: {
      type: "varchar",
      length: 128,
      nullable: true,
      name: "business_status",
      default: BusinessStatus.None
    },
    transactionDate: {
      type: "date",
      nullable: true,
      name: "transaction_date"
    },
    closedDealValue: {
      type: "float",
      name: "closed_deal_value",
      default: 0,
    },
    status: {
      type: "varchar",
      length: 128,
      default: PropertyStatus.Drafting,
      nullable: false
    },
    code: {
      type: "varchar",
      length: 64,
      nullable: false,
      unique: true
    },
    approvedAt: {
      name: "approved_at",
      type: Date,
      nullable: true,
    },
    brokerId: {
      type: "int",
      name: "broker_id",
      nullable: true
    },
    changeablePrice: {
      type: "float",
      name: "changeable_price",
      default: 0,
    },
    saleBrokerId: {
      type: "int",
      name: "sale_broker_id",
      nullable: true
    },
    topicId: {
      type: Number,
      name: "topic_id",
      nullable: true,
    },
    sourceCollectorId: {
      type: "int",
      name: "source_collector_id",
      nullable: true
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
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
    locationType: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "location_type_id", referencedColumnName: "id" },
    },
    urgentLevel: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "urgent_level_id", referencedColumnName: "id" },
    },
    propertyType: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "property_type_id", referencedColumnName: "id" },
    },
    propertyPeriod: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "property_period_id", referencedColumnName: "id" },
    },
    propertyUsing: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "property_using_id", referencedColumnName: "id" },
    },
    source: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "source_id", referencedColumnName: "id" },
    },
    propertyHistoryNotes: {
      type: "one-to-many",
      target: "property_history_note",
      inverseSide: "property",
      cascade: true,
      joinColumn: { referencedColumnName: "property_id" },
    },
    propertyBookmarks: {
      type: "one-to-many",
      target: "property_bookmark",
      inverseSide: "property",
      cascade: true,
      joinColumn: { referencedColumnName: "property_id" },
    },
    latestApprovedNotes: {
      type: "one-to-many",
      target: "latest_approved_note",
      inverseSide: "property",
      cascade: true,
      joinColumn: { referencedColumnName: "property_id" },
    },
    approvedBy: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "approved_by", referencedColumnName: "id" },
    },
    broker: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "broker_id", referencedColumnName: "id" },
    },
    topic: {
      type: "many-to-one",
      target: "topic",
      joinColumn: { name: "topic_id", referencedColumnName: "id" }
    } as EntitySchemaRelationOptions,
  }
});

export const BookmarksType = {
  A: "A",
  B: "B",
  C: "C",
};