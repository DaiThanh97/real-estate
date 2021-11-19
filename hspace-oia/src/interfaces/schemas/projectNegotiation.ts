import * as Joi from "joi";
import {
  ProjectNegotiationPriority,
  ProjectNegotiationStatus
} from "../../infrastructure/orm/typeorm/models/ProjectNegotiation";
import { investmentEfficiencySchema } from "./investmentEfficiency";
import { projectNegotiationReferItemSchema } from "./projectNegotiationReferItem";
import { pagingQuerySchema } from "./query";
import { noteAddressSchema, noteQuerySchema, noteRelationAddressSchema, noteSchema, pureNoteSchema } from "./note";
import { logSchema } from "./base";

const pureSchema = {
  ...pureNoteSchema,
  ...noteAddressSchema,
  investmentEfficiencyId: Joi.number().optional().allow(null),

  price: Joi.number().optional().allow(null),
  priceUpdate: Joi.number().optional().allow(null),
  priceAppraisalStatement: Joi.number().optional().allow(null),
  priceApproved: Joi.number().optional().allow(null),
  priority: Joi.string().optional().allow(null).valid(...Object.values(ProjectNegotiationPriority)),
};

const changeableSchema = {
  noteType: Joi.string().optional().allow(null, ""),
  ...pureSchema,
};

const changeablePlanStepSchema = {
  categoryId: Joi.number().optional().allow(null),
  target: Joi.string().optional().allow(null, ""),
  result: Joi.string().optional().allow(null, ""),
  startDate: Joi.date().optional().allow(null),
  endDate: Joi.date().optional().allow(null),
  brokerId: Joi.number().optional().allow(null),
};

export const addingProjectNegotiationPlanStepSchema = Joi.object().keys({
  ...changeablePlanStepSchema,
}).label("AddingProjectNegotiationPlanStepSchema");

export const updatingProjectNegotiationPlanStepSchema = Joi.object().keys({
  ...changeablePlanStepSchema,
}).label("UpdatingProjectNegotiationPlanStepSchema");

export const updatingProjectNegotiationActionSchema = Joi.object().keys({
  action: Joi.string().optional().allow(null, ""),
}).label("UpdatingProjectNegotiationActionSchema");

export const updatingProjectNegotiationOpinionSchema = Joi.object().keys({
  opinion: Joi.string().optional().allow(null, ""),
}).label("UpdatingProjectNegotiationOpinionSchema");

export const addingProjectNegotiationSchema = Joi.object().keys({
  ...changeableSchema,
}).label("AddingProjectNegotiationSchema");

export const updatingProjectNegotiationSchema = Joi.object().keys({
  ...changeableSchema,
}).label("UpdatingProjectNegotiationSchema");

export const projectNegotiationSchema = Joi.object().keys({
  ...changeableSchema,
  ...noteSchema,
  ...noteRelationAddressSchema,
  status: Joi.string().required().valid(...Object.values(ProjectNegotiationStatus)),
  investmentEfficiency: investmentEfficiencySchema.optional().allow(null),
  referItems: Joi.array().items(projectNegotiationReferItemSchema).optional().allow(null),
  planSteps: Joi.array().items({
    id: Joi.number().optional().allow(null),
    ...logSchema,
    ...changeablePlanStepSchema,
    actionDetailId: Joi.number().optional().allow(null),
    opinionDetailId: Joi.number().optional().allow(null),
    actionDetail: Joi.object({
      id: Joi.number().optional().allow(null),
      action: Joi.string().optional().allow(null, ""),
      ...logSchema,
    }).allow(null).label("ProjectNegotiationActionDetailSchema"),
    opinionDetail: Joi.object({
      id: Joi.number().optional().allow(null),
      opinion: Joi.string().optional().allow(null, ""),
      ...logSchema,
    }).allow(null).label("ProjectNegotiationOpinionDetailSchema"),
  }),
}).label("ProjectNegotiationSchema");

export const projectNegotiationSchemas = Joi.object().keys({
  items: Joi.array().items(projectNegotiationSchema),
  total: Joi.number(),
}).label("ProjectNegotiationSchemas");

export const queryProjectNegotiationSchema = Joi.object().keys({
  ...pagingQuerySchema,
  ...noteQuerySchema,
  sourceId: Joi.number().optional().allow(null, ""),
  priority: Joi.string().optional().allow(null, ""),
}).label("QueryProjectNegotiationSchema");
