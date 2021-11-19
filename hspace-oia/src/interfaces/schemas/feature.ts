import * as Joi from "joi";
import { logSchema } from "./base";

export const featureSchema = Joi.object()
  .keys({
      id: Joi.number(),
      name: Joi.string(),
      action: Joi.string().optional().default("").allow(null, ""),
      description: Joi.string().optional().default("").allow(null, ""),
      isActive: Joi.bool(),
      resourceId: Joi.number().optional().allow(null),
      seq: Joi.number().optional().allow(null),
      ...logSchema,
  })
  .label("FeatureSchema");
