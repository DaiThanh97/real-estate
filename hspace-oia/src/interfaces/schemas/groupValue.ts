import * as Joi from "joi";
import { logSchema } from "./base";
import { pagingQuerySchema } from "./query";

const pureGroupValueSchema = {
  id: Joi.number(),
  parentId: Joi.any(),
  code: Joi.string().normalize(),
  name: Joi.string().normalize(),
  isActive: Joi.boolean(),
  ...logSchema,
};

const schema = {
  ...pureGroupValueSchema,
  parent: Joi.object().keys({
    ...pureGroupValueSchema,
    parent: Joi.object().allow(null)
  }).allow(null)
};

export const modifiedGroupValueSchema =
  Joi.object()
    .keys({
      id: Joi.number().optional(),
      code: Joi.string().normalize(),
      name: Joi.string().normalize(),
      parentId: Joi.number().allow(null),
      isActive: Joi.bool().default(true),
    })
    .label("modifiedGroupValueSchema");

export const addingGroupValueSchema =
  Joi.object()
    .keys({
      code: Joi.string().required().normalize(),
      name: Joi.string().required().normalize(),
      parentId: Joi.number().allow(null),
      isActive: Joi.bool().default(true),
    })
    .label("modifiedGroupValueSchema");

export const searchGroupValueQuerySchema = {
  code: Joi.string().optional().allow(null, "").normalize(),
  name: Joi.string().optional().allow(null, "").normalize(),
  parentIds: Joi.string().optional().allow(null, ""),
  isActive: Joi.bool().optional().allow(null, ""),
  ...pagingQuerySchema,
};

export const groupValueSchema = Joi.object()
  .keys({
    ...schema,
    ...logSchema
  })
  .label("groupValueSchema");

export const groupValuesSchema = Joi.object()
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
  .label("groupValuesSchema");
