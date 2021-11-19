import Joi from "joi";

export const propertyBodySchema = Joi.object()
  .keys({
    name: Joi.string().optional(),
  })
  .label("propertyBodySchema");
