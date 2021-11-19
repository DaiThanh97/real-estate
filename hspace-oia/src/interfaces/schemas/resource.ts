import * as Joi from "joi";
import { featureSchema } from "./feature";
import { logSchema } from "./base";

export const resourceSchema = Joi.object()
  .keys({
      id: Joi.number().optional(),
      name: Joi.string(),
      path: Joi.string().optional().default("").allow(null, ""),
      description: Joi.string().optional().default("").allow(null, ""),
      isActive: Joi.bool().default(true),
      seq: Joi.number().optional().allow(null),
      features: Joi.array().items(featureSchema).label("FeaturesSchema").optional(),
      ...logSchema,
  })
  .label("ResourceSchema");

export const resourcesSchema = Joi.object()
  .keys({
    items: Joi.array().items(resourceSchema).label("ResourceItemsSchema"),
    total: Joi.number(),
  })
  .label("ResourcesSchema");
