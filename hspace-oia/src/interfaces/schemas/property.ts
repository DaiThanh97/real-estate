import Joi from "joi";
import { logSchema, passiveSchema, statusSchema } from "./base";
import {
  BookmarksType,
  BusinessStatus,
  ConstructionStage,
  DealStage,
  PropertyStatus
} from "../../infrastructure/orm/typeorm/models/Property";
import { fileSchema } from "./file";
import { masterValueSchema } from "./masterValue";
import { accountSchema } from "./account";
import { propertyBookmarkSchema } from "./propertyBookmark";
import { pagingQuerySchema } from "./query";
import { PropertyProgressType } from "../../infrastructure/orm/typeorm/models/PropertyProgress";

export const propertyGeneralInfoSchema = {
  streetNumber: Joi.string().optional().allow(null, ""),
  cityId: Joi.number().optional().allow(null),
  districtId: Joi.number().optional().allow(null),
  wardId: Joi.number().optional().allow(null),
  streetId: Joi.number().optional().allow(null),
  locationTypeId: Joi.number().optional().allow(null),
  urgentLevelId: Joi.number().optional().allow(null),
  generalNote: Joi.string().optional().allow(null, ""),
  price: Joi.number().optional().allow(null),
  longitude: Joi.number().optional().allow(null),
  latitude: Joi.number().optional().allow(null),
  attachments: Joi.array().items(fileSchema).optional().allow(null),
  status: Joi.string().valid(...Object.values(PropertyStatus)).optional().allow(null),
  topicId: Joi.number().optional().allow(null),
};

export const propertyUseRightCertificateSchema = {
  landPlot: Joi.string().optional().allow(null),
  map: Joi.string().optional().allow(null),
  horizontalFront: Joi.number().optional().allow(null),
  horizontalBack: Joi.number().optional().allow(null),
  height1: Joi.number().optional().allow(null),
  height2: Joi.number().optional().allow(null),
  propertyTypeId: Joi.number().optional().allow(null),
  propertyPeriodId: Joi.number().optional().allow(null),
  propertyUsingId: Joi.number().optional().allow(null),
  recognizedArea: Joi.number().optional().allow(null),
  unrecognizedArea: Joi.number().optional().allow(null),
  recognizedPlanningArea: Joi.number().optional().allow(null)
};

export const propertyConstructionInfoSchema = {
  constructionCurrentStage: Joi.string().valid(...Object.values(ConstructionStage)).optional().allow(null, ""),
  groundFloors: Joi.number().optional().allow(null),
  mezzanines: Joi.number().optional().allow(null),
  basements: Joi.number().optional().allow(null),
  roofs: Joi.number().optional().allow(null),
  structure: Joi.string().optional().allow(null),
  recognizedFloorArea: Joi.number().optional().allow(null),
  unrecognizedFloorArea: Joi.number().optional().allow(null),
  constructionNote: Joi.string().optional().allow(null, "")
};

export const propertyFullInfoSchema = {
  ...propertyGeneralInfoSchema,
  ...propertyUseRightCertificateSchema,
  ...propertyConstructionInfoSchema,
  sourceId: Joi.number(),
  dealStage: Joi.string().valid(...Object.values(DealStage)).required().allow(null, ""),
  businessStatus: Joi.string().valid(...Object.values(BusinessStatus)).optional().allow(null, ""),
  transactionDate: Joi.date().optional().allow(null),
  brokerId: Joi.number().optional().allow(null),
  closedDealValue: Joi.number().optional().allow(null),
  description: Joi.string().optional().allow(null, ""),
  approvedAt: Joi.date().optional().allow(null),
  approvedBy: accountSchema.optional().allow(null),
  broker: accountSchema.optional().allow(null),
  changeablePrice: Joi.number().optional().allow(null),
  saleBrokerId: Joi.number().optional().allow(null),
  sourceCollectorId: Joi.number().optional().allow(null),
};

export const propertyBookmarksSchema = {
  propertyBookmarks: Joi.array().items(
    propertyBookmarkSchema
  ).label("PropertyBookmarksSchema"),
};

export const propertyHistoryNotesSchema = {
  propertyHistoryNotes: Joi.array().items({
    id: Joi.number().optional().allow(null),
    propertyId: Joi.number().optional().allow(null),
    type: Joi.string().optional().allow(null),
    reasonId: Joi.number().optional().allow(null),
    reason: masterValueSchema.optional().allow(null),
    notes: Joi.string().optional().allow(null),
    ...passiveSchema,
    ...logSchema,
  }).label("PropertyHistoryNotesSchema"),
};

export const propertySchema = {
  id: Joi.number(),
  code: Joi.string(),
  ...propertyBookmarksSchema,
  ...propertyHistoryNotesSchema,
  ...logSchema,
  ...propertyFullInfoSchema,
};

export const propertyGeneralQuerySchema = {
  ...pagingQuerySchema,
  streetNumber: Joi.string().optional().allow(null, ""),
  districtId: Joi.number().optional().allow(null, ""),
  streetId: Joi.number().optional().allow(null, ""),
  wardId: Joi.number().optional().allow(null, ""),
  locationTypeId: Joi.number().optional().allow(null, ""),
  priceFrom: Joi.number().optional().allow(null, ""),
  priceTo: Joi.number().optional().allow(null, ""),
  price: Joi.number().optional().allow(null, ""),
  status: Joi.string().valid(...Object.values(PropertyStatus)).optional().allow(null, ""),
  isActive: Joi.boolean().optional().allow(null, ""),
  approvedBy: Joi.number().optional().allow(null, ""),
};

export const propertyQuerySchema = {
  ...propertyGeneralQuerySchema,
  code: Joi.string().optional().allow(null, ""),
  urgentLevelId: Joi.number().optional().allow(null, ""),
  companyId: Joi.number().optional().allow(null, ""),
  collaboratorTypeId: Joi.number().optional().allow(null, ""),
  sourceId: Joi.number().optional().allow(null, ""),
  assigneeId: Joi.number().optional().allow(null, ""),
  followerId: Joi.number().optional().allow(null, ""),
  followDate: Joi.date().optional().allow(null, ""),
  businessStatus: Joi.string().valid(...Object.values(BusinessStatus)).optional().allow(null, ""),
  createdFrom: Joi.date().optional().allow(null, ""),
  createdTo: Joi.date().optional().allow(null, ""),
  dealStage: Joi.string().valid(...Object.values(DealStage)).optional().allow(null, ""),
};

export const propertyShortListSchema = {
  id: Joi.number(),
  code: Joi.string(),
  ...statusSchema,
  streetNumber: Joi.string().optional().allow(null, ""),
  city: masterValueSchema.optional().allow(null),
  district: masterValueSchema.optional().allow(null),
  ward: masterValueSchema.optional().allow(null),
  street: masterValueSchema.optional().allow(null),
  locationType: masterValueSchema.optional().allow(null),
};

export const propertyListSchema = {
  ...propertyShortListSchema,
  urgentLevel: masterValueSchema.optional().allow(null),
  price: Joi.number(),
  changeablePrice: Joi.number().optional().allow(null),
  businessStatus: Joi.string().optional().allow(null),
  createdAt: Joi.date(),
  updatedBy: accountSchema.optional().allow(null),
  approvedAt: Joi.date().optional().allow(null),
  approvedBy: accountSchema.optional().allow(null),
  source: accountSchema,
  ...propertyBookmarksSchema,
};

export const propertyShortItemSchema = Joi.object()
  .keys({
    ...propertyShortListSchema
  }).label("PropertyShortItemSchema");

export const propertyShortListResponseSchema = Joi.object()
  .keys({
    items: Joi.array().items(propertyShortItemSchema),
    total: Joi.number()
  }).label("PropertyShortListSchema").unknown();

export const propertyItemSchema = Joi.object().keys({
  ...propertyListSchema
}).label("PropertyItemSchema").unknown();

export const propertyListResponseSchema = Joi.object()
  .keys({
    items: Joi.array().items(propertyItemSchema),
    total: Joi.number()
  }).label("PropertyListSchema").unknown();

export const propertyGeneralInfoResponseSchema = Joi.object()
  .keys({
    id: Joi.number(),
    code: Joi.string(),
    ...statusSchema,
    ...passiveSchema,
    ...propertyGeneralInfoSchema
  }).label("PropertyGeneralSchema").unknown();

export const propertyResponseSchema = Joi.object().keys({
  ...statusSchema,
  ...passiveSchema,
  ...propertySchema,
  propertyRatio: Joi.object().keys({
    ratioChangeableAppraise: Joi.number().optional().allow(null),
    ratioChangeableBuy: Joi.number().optional().allow(null),
    ratioClosedDealAppraise: Joi.number().optional().allow(null),
    differencePrice: Joi.number().optional().allow(null),
  }).optional().allow(null).label("PropertyPricesSchema"),
  latestProgress: Joi.object().keys({
    id: Joi.number().optional().allow(null),
    createdAt: Joi.date().optional().allow(null),
    type: Joi.string().valid(...Object.values(PropertyProgressType)).optional().allow(null, ""),
  }).optional().allow(null).label("LatestPropertyProgress"),
}).label("PropertySchema").unknown();

export const propertyStatusSchema = Joi.object().keys({
  reasonId: Joi.number().optional().allow(null),
  notes: Joi.string().optional().allow(null),
}).label("PropertyStatusSchema").unknown();

export const propertyNoteAccountItemSchema = Joi.object().keys({
  id: Joi.number().optional().allow(null),
  displayName: Joi.string().optional().allow(null, ""),
}).unknown();

export const propertyNoteListSchema = Joi.object().keys({
  items: Joi.array().items({
    id: Joi.number(),
    type: Joi.string(),
    propertyId: Joi.number(),
    createdAt: Joi.date().optional().allow(null),
    noteId: Joi.string(),
    assignee: propertyNoteAccountItemSchema.optional().allow(null),
    approvedBy: propertyNoteAccountItemSchema.optional().allow(null),
    approvedAt: Joi.date().optional().allow(null),
    source: propertyNoteAccountItemSchema.optional().allow(null),
    status: Joi.string(),
  }).optional().allow(null),
}).label("PropertyNoteListSchema");


export const dealPropertyRequestSchema = Joi.object().keys({
  transactionDate: Joi.date().optional().allow(null),
  brokerId: Joi.number().optional().allow(null),
  closedDealValue: Joi.number().optional().allow(null),
  sourceCollectorId: Joi.number().optional().allow(null)
}).label("DealPropertyRequestSchema");

export const updatingChangeablePriceRequestSchema = Joi.object().keys({
  changeablePrice: Joi.number().optional().allow(null),
  saleBrokerId: Joi.number().optional().allow(null),
}).label("UpdatingChangeablePriceRequestSchema");

export const bookmarksQuerySchema = Joi.object().keys({
  type: Joi.string().valid(...Object.values(BookmarksType)),
}).label("bookmarksQuerySchema");

export const propertyViewSchema = Joi.object().keys({
  id: Joi.number().positive().required(),
  code: Joi.string().required(),
  changeablePrice: Joi.number().allow(null),
  businessStatus: Joi.string().required(),
  status: Joi.string().required(),
  cityId: Joi.number().allow(null),
  streetId: Joi.number().allow(null),
  streetName: Joi.string().allow(null),
  districtId: Joi.number().allow(null),
  districtName: Joi.string().allow(null),
  wardId: Joi.number().allow(null),
  wardName: Joi.string().allow(null),
  streetNumber: Joi.string().allow(null),
  updatedAt: Joi.date().allow(null),
  price: Joi.number().allow(null),
  bookmarkId: Joi.number().allow(null),
  markerId: Joi.number().allow(null),
  markerDisplayName: Joi.string().allow(null),
  bookmarkType: Joi.string().allow(null),
  urgentLevelId: Joi.number().allow(null),
  approvedPurchasePrice: Joi.number().allow(null),
  propertyUnitPricePPSS: Joi.number().allow(null),
  ratioChangeableAppraise: Joi.number().allow(null),
  ratioChangeableBuy: Joi.number().allow(null),
}).label("PropertyViewSchema");

export const propertyViewListSchema = Joi.object()
  .keys({
    items: Joi.array().items(propertyViewSchema),
    total: Joi.number()
  }).label("PropertyViewListSchema").unknown();

const statisticItemSchema = Joi.object().keys({
  districtId: Joi.number().required().allow(null),
  status: Joi.string().required(),
  sum: Joi.number().required(),
}).label("StatisticItemSchema");

const totalByDistrictItemSchema = Joi.object().keys({
  districtId: Joi.number().required().allow(null),
  sum: Joi.number().required(),
}).label("TotalByDistrictItemSchema");

const totalByStatusItemSchema = Joi.object().keys({
  status: Joi.string().required(),
  sum: Joi.number().required(),
}).label("TotalByStatusItemSchema");


export const propertyMonthStatisticSchema = Joi.object()
  .keys({
    items: Joi.array().items(statisticItemSchema).label("StatisticItemsSchema"),
    totalByDistrict: Joi.array().items(totalByDistrictItemSchema).label("TotalByDistrictSchema"),
    totalByStatus: Joi.array().items(totalByStatusItemSchema).label("TotalByStatusSchema"),
    sum: Joi.number(),
  }).label("PropertyMonthStatisticSchema");


export const propertyStatisticSchema = Joi.object()
  .keys({
    thisMonth: propertyMonthStatisticSchema.required(),
    lastMonth: propertyMonthStatisticSchema.required(),
  }).label("PropertyStatisticSchema");
