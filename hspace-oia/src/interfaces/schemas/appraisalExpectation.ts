import * as Joi from "joi";
import { pagingQuerySchema } from "./query";
import { noteAddressSchema, noteQuerySchema, noteRelationAddressSchema, noteSchema, pureNoteSchema } from "./note";
import { AppraisalExpectationStatus, AppraisalExpectationType } from "../../infrastructure/orm/typeorm/models/AppraisalExpectation";
import { inspectionExpectationSchema } from "./inspectionExpectation";
import { accountBasicInfo } from "./base";

const pureSchema = {
  noteType: Joi.string().valid(...Object.values({Estimate: AppraisalExpectationType.Estimate})).required(),
  inspectionExpectationId: Joi.number().optional().allow(null),
  ...pureNoteSchema,
  ...noteAddressSchema,
};

const changeableSchema = {
  ...pureSchema,
};

const expectationInfoSchema = {
  "TUDGDTT": Joi.number().optional().allow(null),
  "TUDGDG": Joi.string().optional().allow(null, ""),
  "TUTMDC": Joi.number().optional().allow(null),
  "TUDGTDUT": Joi.number().optional().allow(null),
  "TUGTDUT": Joi.number().optional().allow(null),
  "TUGTCTXD": Joi.number().optional().allow(null),
  "TUTLDCCTDV": Joi.number().optional().allow(null),
  "TUGTTSUT": Joi.number().optional().allow(null),
};

const landUseRightsSchema = {
  "TUDTKCN20": Joi.number().optional().allow(null),
  "TUTL21": Joi.number().optional().allow(null),
  "TUHS22": Joi.number().optional().allow(null),
  "TUDTCNQH23": Joi.number().optional().allow(null),
  "TUTLDTCN24": Joi.number().optional().allow(null),
  "TUHSDCN25": Joi.number().optional().allow(null),
  "TUDTVT128": Joi.number().optional().allow(null),
  "TUHSVT129": Joi.number().optional().allow(null),
  "TUDTVT230": Joi.number().optional().allow(null),
  "TUHSVT231": Joi.number().optional().allow(null),
  "TUDTVT332": Joi.number().optional().allow(null),
  "TUHSVT333": Joi.number().optional().allow(null),
};

const constructionSchema = {
  "TUDTSDTT44": Joi.number().optional().allow(null),
  "TUCLCL45": Joi.number().optional().allow(null),
  "TUDGXM46": Joi.number().optional().allow(null),
};

const changeablePlanItem = {
  id: Joi.number().optional().allow(null),
  index: Joi.number().required(),
  sourceId: Joi.number().optional().allow(null),
  name: Joi.string().optional().allow(null, ""),
  description: Joi.string().optional().allow(null, ""),
  planTypeId: Joi.number().optional().allow(null),
  constructionTypeId: Joi.number().optional().allow(null),
  investmentTime: Joi.number().optional().allow(null),
  investmentAt: Joi.date().optional().allow(null),
  price: Joi.number().optional().allow(null),
};

const changeablePlanLand = {
  id: Joi.number().optional().allow(null),
  index: Joi.number().required(),
  expectationInfo: Joi.object(expectationInfoSchema).optional().allow(null),
  landUseRights: Joi.object(landUseRightsSchema).optional().allow(null),
  construction: Joi.object(constructionSchema).optional().allow(null),
};

export const addingAppraisalExpectationSchema = Joi.object().keys({
  ...changeableSchema,
  planItems: Joi.array().items({
    ...changeablePlanItem,
    lands: Joi.array().items(changeablePlanLand).label("AddingAppraisalExpectationLandSchema")
  }).label("AddingAppraisalExpectationItemSchema"),
}).label("AddingAppraisalExpectationSchema");

export const appraisalExpectationSchema = Joi.object().keys({
  ...changeableSchema,
  ...noteSchema,
  ...noteRelationAddressSchema,
  status: Joi.string().required().valid(...Object.values(AppraisalExpectationStatus)),
  inspectionExpectation: inspectionExpectationSchema.allow(null),
  completedAt: Joi.date().optional().allow(null),
  completedBy: accountBasicInfo.optional().allow(null), 
  planItems: Joi.array().items({
    ...changeablePlanItem,
    updatedAt: Joi.date().optional(),
    createdAt: Joi.date().optional(),
    lands: Joi.array().items({
      ...changeablePlanLand,
      updatedAt: Joi.date().optional(),
      createdAt: Joi.date().optional(),
    }).label("AppraisalExpectationLandSchema"),
  }).label("AppraisalExpectationSchema"),
});

export const appraisalExpectationSchemas = Joi.object().keys({
  items: Joi.array().items(appraisalExpectationSchema),
  total: Joi.number(),
}).label("AppraisalExpectationSchemas");

export const queryAppraisalExpectationSchema = Joi.object().keys({
  ...pagingQuerySchema,
  ...noteQuerySchema,
}).label("QueryAppraisalExpectationSchema");
