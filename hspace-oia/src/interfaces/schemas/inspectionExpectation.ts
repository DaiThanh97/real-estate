import * as Joi from "joi";
import { logSchema } from "./base";
import { InspectionExpectationStatus, InspectionExpectationType } from "../../domain/models/InspectionExpectation";
import { masterValueSchema } from "./masterValue";
import { investmentPlanSchema } from "./investmentPlan";
import { pagingQuerySchema } from "./query";
import { noteAddressSchema, noteQuerySchema, noteRelationAddressSchema, noteSchema, pureNoteSchema } from "./note";

const landUseRights = {
  "KUT10": Joi.string().optional().allow(null),
  "KUTBD11": Joi.string().optional().allow(null),
  "KULD12": Joi.object({
    label: Joi.string().optional().allow(null),
    value: Joi.number().optional().allow(null),
  }).optional().allow(null),
  "KUTHSD13": Joi.object({
    label: Joi.string().optional().allow(null),
    value: Joi.number().optional().allow(null),
  }).optional().allow(null),
  "KUHTSD14": Joi.object({
    label: Joi.string().optional().allow(null),
    value: Joi.number().optional().allow(null),
  }).optional().allow(null),
  "KUNT15": Joi.number().optional().allow(null),
  "KUNS16": Joi.number().optional().allow(null),
  "KHCD116": Joi.number().optional().allow(null),
  "KUCD117": Joi.number().optional().allow(null),
  "KUCD218": Joi.number().optional().allow(null),
  "KUDTCN19": Joi.number().optional().allow(null),
  "KUDTKCN20": Joi.number().optional().allow(null),
  "KUTL21": Joi.number().optional().allow(null),
  "KUHS22": Joi.number().optional().allow(null),
  "KUDTCNQH23": Joi.number().optional().allow(null),
  "KUTLDTCN24": Joi.number().optional().allow(null),
  "KUHSDCN25": Joi.number().optional().allow(null),
  "KUDTCN26": Joi.number().optional().allow(null),
  "KUDTKV27": Joi.number().optional().allow(null),
  "KUDTVT128": Joi.number().optional().allow(null),
  "KUHSVT129": Joi.number().optional().allow(null),
  "KUDTVT230": Joi.number().optional().allow(null),
  "KUHSVT231": Joi.number().optional().allow(null),
  "KUDTVT332": Joi.number().optional().allow(null),
  "KUHSVT333": Joi.number().optional().allow(null),
};

const construction = {
  "KUKC34": Joi.string().optional().allow(null),
  "KUTN36": Joi.number().optional().allow(null),
  "KUH37": Joi.number().optional().allow(null),
  "KUL38": Joi.number().optional().allow(null),
  "KUST39": Joi.number().optional().allow(null),
  "KUDTXL35": Joi.number().optional().allow(null),
  "KUDTSCN40": Joi.number().optional().allow(null),
  "KUDTSKCN41": Joi.number().optional().allow(null),
  "KUTDTS42": Joi.number().optional().allow(null),
  "KUDTSDPS43": Joi.number().optional().allow(null),
  "KUDTSDTT44": Joi.number().optional().allow(null),
  "KUCLCL45": Joi.number().optional().allow(null),
  "KUDGXM46": Joi.number().optional().allow(null),
  "KUGTCTXD47": Joi.number().optional().allow(null),
};

const pureLevelSchema = {
  id: Joi.number().optional().allow(null),
  planLandId: Joi.number().optional().allow(null),
  groupId: Joi.number().optional().allow(null),
  typeId: Joi.number().optional().allow(null),
  level: Joi.number().optional().allow(null),
  note: Joi.string().optional().allow(null, ""),
};

const changeableLevelSchema = {
  ...pureLevelSchema
};

const levelSchema = Joi.object().keys({
  ...changeableLevelSchema,
  ...logSchema,
  ...pureLevelSchema,
  group: masterValueSchema.optional().allow(null),
  type: masterValueSchema.optional().allow(null),
}).label("InspectionExpectationLevelSchema");

const purePlanLandSchema = {
  id: Joi.number().optional().allow(null),
  planItemId: Joi.number().optional().allow(null),
  index: Joi.number().optional().allow(null),
  address: Joi.string().optional().allow(null, ""),
  streetNumber: Joi.string().optional().allow(null, ""),
  cityId: Joi.number().optional().allow(null),
  districtId: Joi.number().optional().allow(null),
  wardId: Joi.number().optional().allow(null),
  streetId: Joi.number().optional().allow(null),
  streetGroupId: Joi.number().optional().allow(null),
  positionGroupId: Joi.number().optional().allow(null),
  locationDescription: Joi.string().optional().allow(null,""),

  landUseRights: Joi.object(landUseRights).allow(null),
  construction: Joi.object(construction).allow(null),

  totalAdvantageLevel: Joi.number().optional().allow(null),
  totalDisadvantageLevel: Joi.number().optional().allow(null),
  
  totalAdjustment: Joi.number().optional().allow(null),

};

const changeablePlanLandSchema = {
  ...purePlanLandSchema,
  advantageLevels: Joi.array().items(changeableLevelSchema).optional().allow(null),
  disadvantageLevels: Joi.array().items(changeableLevelSchema).optional().allow(null),
};

const planLandSchema = Joi.object().keys({
  ...purePlanLandSchema,
  ...logSchema,

  advantageLevels: Joi.array().items(levelSchema).optional().allow(null),
  disadvantageLevels: Joi.array().items(levelSchema).optional().allow(null),

  city: masterValueSchema.allow(null),
  district: masterValueSchema.allow(null),
  ward: masterValueSchema.allow(null),
  street: masterValueSchema.allow(null),
  streetGroup: masterValueSchema.allow(null),
  positionGroup: masterValueSchema.allow(null),
}).label("InspectionExpectationPlanLandSchema");

const purePlanItemSchema = {
  id: Joi.number().optional().allow(null),
  inspectionExpectationId: Joi.number().optional().allow(null),
  index: Joi.number().optional().allow(null),
  sourceId: Joi.number().optional().allow(null),

  name: Joi.string().optional().allow(null,""),
  planTypeId: Joi.number().optional().allow(null),
  constructionTypeId: Joi.number().optional().allow(null),
  description:Joi.string().optional().allow(null, ""),
  investmentTime: Joi.number().optional().allow(null),
  investmentAt: Joi.date().optional().allow(null),

  totalAdjustment: Joi.number().optional().allow(null),
};

const changeablePlanItemSchema = {
  ...purePlanItemSchema,
  lands: Joi.array().items(changeablePlanLandSchema).optional().allow(null),
};

const planItemSchema = Joi.object().keys({
  ...purePlanItemSchema,
  ...logSchema,
  lands: Joi.array().items(planLandSchema).optional().allow(null),

  planType: masterValueSchema.allow(null),
  constructionType: masterValueSchema.allow(null),

}).label("InspectionExpectationPlanItemSchema");

const pureSchema = {
  ...pureNoteSchema,
  ...noteAddressSchema,
  noteType: Joi.string().valid(...Object.values({Estimate: InspectionExpectationType.Estimate})).required(),
  investmentPlanId: Joi.number().optional().allow(null),
};

const changeableSchema = {
  ...pureSchema,
  planItems: Joi.array().items(changeablePlanItemSchema).optional().allow(null),
};

export const addingInspectionExpectationSchema = Joi.object().keys({
  ...changeableSchema,
  planItems: Joi.array().items(changeablePlanItemSchema).optional().allow(null),
}).label("AddingInspectionExpectationSchema");

export const updatingInspectionExpectationSchema = Joi.object().keys({
  ...pureSchema,
  planItems: Joi.array().items(changeablePlanItemSchema).optional().allow(null),
}).label("UpdatingInspectionExpectationSchema");

export const inspectionExpectationSchema = Joi.object().keys({
  ...changeableSchema,
  ...noteSchema,
  ...noteRelationAddressSchema,
  investmentPlan: investmentPlanSchema.optional().allow(null),
  planItems: Joi.array().items(planItemSchema).optional().allow(null),
  status: Joi.string().required().valid(...Object.values(InspectionExpectationStatus)),

}).label("InspectionExpectationSchema");

export const inspectionExpectationSchemas = Joi.object().keys({
  items: Joi.array().items(inspectionExpectationSchema),
  total: Joi.number(),
}).label("InspectionExpectationSchemas");

export const queryInspectionExpectationSchema = Joi.object().keys({
  ...pagingQuerySchema,
  ...noteQuerySchema,
  noteType: Joi.string().optional().allow(null, ""),
}).label("QueryInspectionExpectationSchema");
