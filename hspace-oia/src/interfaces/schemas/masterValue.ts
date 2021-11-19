import * as Joi from "joi";
import { groupValueSchema } from "./groupValue";
import { logSchema } from "./base";
import { isActiveQuerySchema, pagingQuerySchema } from "./query";

const pureMasterValueSchema = {
  id: Joi.number(),
  groupId: Joi.number().allow(null).optional(),
  parentId: Joi.number().allow(null).optional(),
  groupCode: Joi.string().normalize(),
  groupName: Joi.string().normalize(),
  valueCode: Joi.string().normalize(),
  valueName: Joi.string().normalize(),
  customData: Joi.object().optional().allow(null),
  isActive: Joi.boolean(),
  isUsed: Joi.boolean().allow(null).optional(),
};

const schema = {
  ...pureMasterValueSchema,
  parent: Joi.object().keys({
    ...pureMasterValueSchema,
    ...logSchema,
    parent: Joi.object().allow(null),
    groupValue: Joi.object().allow(null),
  }).allow(null),
  groupValue: groupValueSchema.allow(null).optional()
};

export const modifiedMasterValueSchema =
  Joi.object()
    .keys({
      id: Joi.number().allow(null),
      groupId: Joi.number().allow(null).optional(),
      parentId: Joi.any().allow(null).optional(),
      groupCode: Joi.string().normalize(),
      groupName: Joi.string().normalize(),
      valueCode: Joi.string().normalize(),
      valueName: Joi.string().normalize(),
      customData: Joi.object(),
      isActive: Joi.boolean().allow(null)
    })
    .label("modifiedMasterValueSchema");

export const queryMasterValueSchema = {
  groupId: Joi.number().optional().allow(null, ""),
  parentId: Joi.number().optional().allow(null, ""),
  groupCode: Joi.string().optional().allow(null, "").normalize(),
  groupName: Joi.string().optional().allow(null, "").normalize(),
  valueCode: Joi.string().optional().allow(null, "").normalize(),
  valueName: Joi.string().optional().allow(null, "").normalize(),
  parentValueName: Joi.string().optional().allow(null, ""),
  parentValueCode: Joi.string().optional().allow(null, ""),
  ...pagingQuerySchema,
  ...isActiveQuerySchema,
};

export const masterValueSchema = Joi.object()
  .keys({
    ...schema,
    ...logSchema
  })
  .label("masterValueSchema");

export const masterValuesSchema = Joi.object()
  .keys({
    items: Joi.array().items(
      Joi.object()
        .keys({
          ...schema,
          ...logSchema
        })
    ),
    total: Joi.number()
  })
  .label("masterValuesSchema");
