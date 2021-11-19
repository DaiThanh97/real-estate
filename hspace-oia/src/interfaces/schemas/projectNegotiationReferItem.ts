import * as Joi from "joi";
import { logSchema, passiveSchema } from "./base";
import { masterValueSchema } from "./masterValue";
import { accountSchema } from "./account";

const pureSchema = {
  negotiationReferId: Joi.number().optional().allow(null),
  explain: Joi.string().optional().allow(null, ""),
  referAt: Joi.date().optional().allow(null),
  referSourceId: Joi.number().optional().allow(null),
};

const changeableSchema = {
  ...pureSchema,
};

export const addingProjectNegotiationReferItemSchema = Joi.object().keys({
  ...changeableSchema,
}).label("AddingProjectNegotiationReferItemSchema");

export const updatingProjectNegotiationReferItemSchema = Joi.object().keys({
  ...changeableSchema,
}).label("UpdatingProjectNegotiationReferItemSchema");

export const projectNegotiationReferItemSchema = Joi.object().keys({
  id: Joi.number().required(),
  ...changeableSchema,
  ...passiveSchema,
  ...logSchema,
  projectNegotiationId: Joi.number(),
  negotiationRefer: masterValueSchema.optional().allow(null),
  referSource: accountSchema.optional().allow(null),
}).label("ProjectNegotiationReferItemSchema");
