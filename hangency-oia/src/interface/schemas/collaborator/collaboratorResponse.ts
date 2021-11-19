import Joi from "joi";
import { baseSchema, getResponseWrapperSchema } from "../shared/base";
import { masterValueResponseSchema } from "../masterValue/masterValueResponse";
import { accountBasicInfoSchema } from "../shared/accountBase";

export const collaboratorResponseSchema = Joi.object()
  .keys({
    ...baseSchema,
    fullName: Joi.string().normalize(),
    birthday: Joi.date(),
    joinedDate: Joi.date(),
    phone: Joi.string(),
    email: Joi.string(),
    companyId: Joi.number().optional().allow(null),
    company: masterValueResponseSchema.optional().allow(null),
    collaboratorTypeId: Joi.number().optional().allow(null),
    collaboratorType: masterValueResponseSchema.optional().allow(null),
    isActive: Joi.bool(),
    ...accountBasicInfoSchema,
  })
  .label("collaboratorResponseSchema");

export const collaboratorResponseWrapperSchema = getResponseWrapperSchema(
  collaboratorResponseSchema,
  "CollaboratorResponseWrapperSchema",
);
