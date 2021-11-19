import Joi from "joi";
import { accountBasicInfo } from "./base";
import { inspectionStatementSchema } from "./inspectionStatement";
import { appraisalCommentsSchema } from "./appraisalComment";
import {
  addingAppraisalAuditDetailsSchema,
  adjustControlPPDGSchema,
  appraisalAuditDetailsSchema,
  generalInfoPPDGSchema,
  resultAuditPPDGSchema,
  resultAuditPPSSSchema
} from "./appraisalAuditDetail";
import { AppraisalStatementStatus, AppraisalStatementType } from "../../domain/models/AppraisalStatement";
import { pagingQuerySchema } from "./query";
import { noteAddressSchema, noteQuerySchema, noteRelationAddressSchema, noteSchema, pureNoteSchema } from "./note";

export const changeableSchema = {
  noteType: Joi.string().valid(...Object.values(AppraisalStatementType)).required(),
  ...pureNoteSchema,
  ...noteAddressSchema,
  inspectionStatementId: Joi.number().optional().allow(null),
  landUnitPricePPSS: Joi.number().optional().allow(null), // Đơn giá đất thẩm định (PPSS)
  propertyUnitPricePPSS: Joi.number().optional().allow(null), // Giá trị tài sản thẩm định (PPSS)
  landUnitPricePPDG: Joi.number().optional().allow(null), // Đơn giá đất thẩm định (PPĐG)
  propertyUnitPricePPDG: Joi.number().optional().allow(null), // Giá trị tài sản thẩm định (PPĐG)

  resultAuditPPSS: resultAuditPPSSSchema.optional().allow(null),

  generalInfoPPDG: generalInfoPPDGSchema.optional().allow(null),
  adjustControlPPDG: adjustControlPPDGSchema.optional().allow(null),
  resultAuditPPDG: resultAuditPPDGSchema.optional().allow(null),
};

export const changeableFullSchema = {
  ...changeableSchema,
  ...appraisalCommentsSchema,
  ...addingAppraisalAuditDetailsSchema,
};

export const fullSchema = {
  ...changeableSchema,
  ...appraisalCommentsSchema,
  ...appraisalAuditDetailsSchema,
  ...noteSchema,
  ...noteRelationAddressSchema,
  completedAt: Joi.date().optional().allow(null),
  completedBy: accountBasicInfo.optional().allow(null), 
  inspectionStatement: inspectionStatementSchema.optional().allow(null),
  status: Joi.string().required().valid(...Object.values(AppraisalStatementStatus)),
};

export const listItemSchema = {
  ...fullSchema
};

export const changeableAppraisalStatementSchema = Joi.object().keys({
  ...changeableFullSchema
}).label("ChangeableAppraisalStatementSchema");

export const appraisalStatementSchema = Joi.object()
.keys({
  ...fullSchema,
  ratio: Joi.object().keys({
    ratioClosedDealAppraise: Joi.number().optional().allow(null),
  }).optional().allow(null).label("AppraisalStatementRatioSchema"),
}).label("AppraisalStatementSchema");

export const queryAppraisalStatementSchema = Joi.object().keys({
  ...pagingQuerySchema,
  ...noteQuerySchema,
  priceFrom: Joi.number().optional().allow(null, ""),
  priceTo: Joi.number().optional().allow(null, ""),
  noteType: Joi.string().optional().allow(null, ""),
}).label("QueryAppraisalStatementSchema");
  
export const appraisalStatementListSchema = Joi.object().keys({
  items: Joi.array().items(listItemSchema),
  total: Joi.number(),
}).label("AppraisalStatementListSchema");
