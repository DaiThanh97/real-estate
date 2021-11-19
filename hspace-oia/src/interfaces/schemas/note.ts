import * as Joi from "joi";
import { accountBasicInfo, getResponseSchema, logSchema } from "./base";
import { masterValueSchema } from "./masterValue";
import { propertyItemSchema } from "./property";
import { PropertyStatus } from "../../infrastructure/orm/typeorm/models/Property";
import { activitiesSchema } from "./accountActivity";

export const pureNoteSchema = {
  executionDate: Joi.date().optional().allow(null),
  assigneeId: Joi.number().optional().allow(null),
  companyId: Joi.number().optional().allow(null),
  instructorId: Joi.number().optional().allow(null),
  propertyId: Joi.number().optional().allow(null),
  version: Joi.string().optional(),
};

export const noteAddressSchema = {
  streetNumber: Joi.string().optional().allow(null, ""),
  cityId: Joi.number().optional().allow(null),
  wardId: Joi.number().optional().allow(null),
  districtId: Joi.number().optional().allow(null),
  streetId: Joi.number().optional().allow(null),
  address: Joi.string().optional().allow(null, ""),
};

export const noteRelationAddressSchema = {
  city: masterValueSchema.allow(null),
  district: masterValueSchema.allow(null),
  ward: masterValueSchema.allow(null),
  street: masterValueSchema.allow(null),
};

export const noteSchema = {
  id: Joi.number().required(),
  noteId: Joi.string().allow(null, ""),
  version: Joi.string().optional(),
  rejectionNote: Joi.string().allow(null, ""),
  approvedAt: Joi.date().allow(null),
  approvedBy: accountBasicInfo.optional().allow(null),
  ...logSchema,
  assignee: accountBasicInfo.optional().allow(null),
  instructor: accountBasicInfo.optional().allow(null),
  company: masterValueSchema.allow(null),
  property: propertyItemSchema.allow(null),
  rejectedAt: Joi.date().optional().allow(null),
  rejectedBy: accountBasicInfo.optional().allow(null),
  topicId: Joi.number().optional().allow(null),
};

export const noteQuerySchema = {
  propertyCode: Joi.string().optional().allow(null, ""),
  propertyId: Joi.number().optional().allow(null, ""),
  noteId: Joi.string().optional().allow(null, ""),
  createdFrom: Joi.date().optional().allow(null, ""),
  createdTo: Joi.date().optional().allow(null, ""),
  approvedFrom: Joi.date().optional().allow(null, ""),
  approvedTo: Joi.date().optional().allow(null, ""),
  approvedBy: Joi.number().optional().allow(null, ""),
  assigneeId: Joi.number().optional().allow(null, ""),
  status: Joi.string().optional().allow(null, ""),
  monthYear: Joi.date().optional().allow(null),
  propertyStatus: Joi.string().valid(...Object.values(PropertyStatus)).optional().allow(null, ""),

  streetNumber: Joi.string().optional().allow(null, ""),
  streetId: Joi.number().optional().allow(null, ""),
  wardId: Joi.number().optional().allow(null, ""),
  districtId: Joi.number().optional().allow(null, ""),
  cityId: Joi.number().optional().allow(null),
  address: Joi.string().optional().allow(null, ""),
};

const statisticItemSchema = Joi.object().keys({
  accountId: Joi.number().required().allow(null),
  status: Joi.string().required(),
  sum: Joi.number().required(),
}).label("StatisticItemSchema");

const totalByAccountItemSchema = Joi.object().keys({
  accountId: Joi.number().required().allow(null),
  sum: Joi.number().required(),
}).label("TotalByAccountItemSchema");

const extendItemSchema = Joi.object().keys({
  accountId: Joi.number().required().allow(null),
  status: Joi.string().required(),
  action: Joi.number().required(),
  owner: Joi.number().required(),
}).label("ExtendItemSchema");

export const noteMonthStatisticSchema = Joi.object()
  .keys({
    items: Joi.array().items(statisticItemSchema).label("StatisticItemsSchema"),
    totalByAccount: Joi.array().items(totalByAccountItemSchema).label("TotalByAccountSchema"),
    extendItems: Joi.array().items(extendItemSchema).label("ExtendsSchema"),
  }).label("NoteMonthStatisticSchema");

export const noteStatisticSchema = Joi.object()
  .keys({
    thisMonth: noteMonthStatisticSchema.required(),
    lastMonth: noteMonthStatisticSchema.required(),
  }).label("NoteStatisticSchema");

export const noteStatisticSchemaResponse = getResponseSchema(
  noteStatisticSchema,
  "NoteStatisticSchemaResponse"
);

export const activitiesSchemaResponse = getResponseSchema(
  activitiesSchema,
  "NoteActivitiesSchemaResponse"
);
