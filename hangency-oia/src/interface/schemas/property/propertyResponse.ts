import Joi from "joi";
import { baseSchema, getResponseWrapperSchema } from "../shared/base";

const propertyResponseSchema = Joi.object()
  .keys({
    ...baseSchema,
    name: Joi.string().optional(),
  })
  .label("propertyResponseSchema");

export const propertyResponseWrapperSchema = getResponseWrapperSchema(propertyResponseSchema, "PropertyResponseSchema");
