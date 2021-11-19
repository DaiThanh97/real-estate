import * as Joi from "joi";
import { baseSchema } from "./base";

export const accountBasicInfo = Joi.object({
  ...baseSchema,
  type: Joi.string(),
  identityName: Joi.string(),
  code: Joi.string(),
  displayName: Joi.string(),
  isActive: Joi.boolean(),
})
  .label("AccountBasicInfo")
  .unknown();

export const accountBasicInfoSchema = {
  createdBy: accountBasicInfo.optional().allow(null),
  updatedBy: accountBasicInfo.optional().allow(null),
};
