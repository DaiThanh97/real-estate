import Joi from "joi";
import { baseSchema, getResponseWrapperSchema } from "../shared/base";
import { accountBasicInfoSchema } from "../shared/accountBase";
import { collaboratorResponseSchema } from "../collaborator/collaboratorResponse";

const accountResponseSchema = Joi.object()
  .keys({
    ...baseSchema,
    type: Joi.string(),
    identityName: Joi.string(),
    code: Joi.string(),
    displayName: Joi.string(),
    isActive: Joi.boolean(),
    collaborator: collaboratorResponseSchema.allow(null).optional(),
    ...accountBasicInfoSchema,
  })
  .label("accountResponseSchema");

export const accountResponseWrapperSchema = getResponseWrapperSchema(
  accountResponseSchema,
  "AccountResponseWrapperSchema",
);
