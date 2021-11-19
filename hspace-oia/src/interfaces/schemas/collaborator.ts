import * as Joi from "joi";
import { accountCredentialSchema, logSchema } from "./base";
import { masterValueSchema } from "./masterValue";
import { pagingQuerySchema } from "./query";

const pureCollaboratorSchema = {
  id: Joi.number(),
  fullName: Joi.string().normalize(),
  birthday: Joi.date(),
  joinedDate: Joi.date(),
  phone: Joi.string().optional().allow("", null).default(""),
  email: Joi.string().email().optional().allow("", null).default(""),
};

export const collaboratorSchema = Joi.object()
  .keys({
    ...pureCollaboratorSchema,
    companyId: Joi.number().optional().allow(null),
    company: masterValueSchema.optional().allow(null),
    collaboratorTypeId: Joi.number().optional().allow(null),
    collaboratorType: masterValueSchema.optional().allow(null),
    isActive: Joi.bool(),
    ...logSchema,
  })
  .label("CollaboratorSchema");

export const addingCollaboratorSchema = Joi.object()
  .keys({
    ...pureCollaboratorSchema,
    companyId: Joi.number().optional().allow(null),
    collaboratorTypeId: Joi.number().optional().allow(null),
    isActive: Joi.bool().default(true),
  })
  .label("AddingCollaboratorSchema");


export const collaboratorsSchema = Joi.object()
  .keys({
    items: Joi.array().items(collaboratorSchema).label("CollaboratorItemsSchema"),
    total: Joi.number(),
  })
  .label("CollaboratorsSchema");

export const collaboratorQuerySchema = Joi.object()
  .keys({
    ...pagingQuerySchema,
    fullName: Joi.string().allow("", null).optional().normalize(),
    phone: Joi.string().allow("", null).optional(),
    email: Joi.string().allow("", null).optional(),
    companyId: Joi.number().allow("", null).optional(),
    collaboratorTypeId: Joi.number().allow("", null).optional(),
    accountId: Joi.number().allow("", null).optional(),
  })
  .label("CollaboratorQuerySchema");

export const collaboratorCurrentSchema = Joi.object()
  .concat(collaboratorSchema)
  .keys({
    ...accountCredentialSchema
  }).label("CollaboratorCurrentSchema");

export const collaboratorChangeBasicInfoSchema = Joi.object()
  .keys({
    birthday: Joi.date().required()
  }).label("CollaboratorChangeBasicInfoSchema");

