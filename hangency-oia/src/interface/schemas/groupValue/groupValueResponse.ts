import Joi from "joi";
import { getResponseWrapperSchema } from "../shared/base";
import { accountBasicInfoSchema } from "../shared/accountBase";

const pureGroupValueSchema = {
  parentId: Joi.any(),
  code: Joi.string().normalize(),
  name: Joi.string().normalize(),
  isActive: Joi.boolean(),
};

const schema = {
  ...pureGroupValueSchema,
  parent: Joi.object()
    .keys({
      ...pureGroupValueSchema,
      parent: Joi.object().allow(null),
    })
    .allow(null),
};

export const groupValueValueResponseSchema = Joi.object()
  .keys({
    id: Joi.number().required(),
    updatedAt: Joi.date().required(),
    createdAt: Joi.date().required(),
    ...schema,
    ...accountBasicInfoSchema,
  })
  .label("groupValueValueResponseSchema");

export const groupValueResponseWrapperSchema = getResponseWrapperSchema(
  groupValueValueResponseSchema,
  "groupValueValueResponseSchema",
);
