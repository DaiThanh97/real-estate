import Joi from "joi";
import { baseSchema, getResponseWrapperSchema } from "../shared/base";
import { accountBasicInfoSchema } from "../shared/accountBase";
import { groupValueValueResponseSchema } from "../groupValue/groupValueResponse";

const pureMasterValueSchema = {
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
  parent: Joi.object()
    .keys({
      ...baseSchema,
      ...pureMasterValueSchema,
      ...accountBasicInfoSchema,
      parent: Joi.object().allow(null),
      groupValue: Joi.object().allow(null),
    })
    .optional()
    .allow(null),
  groupValue: groupValueValueResponseSchema.allow(null).optional(),
};

export const masterValueResponseSchema = Joi.object()
  .keys({
    id: Joi.number().required(),
    updatedAt: Joi.date().required(),
    createdAt: Joi.date().required(),
    ...schema,
    ...accountBasicInfoSchema,
  })
  .label("masterValueResponseSchema");

export const masterValueResponseWrapperSchema = getResponseWrapperSchema(
  masterValueResponseSchema,
  "MasterValueResponseWrapperSchema",
);
