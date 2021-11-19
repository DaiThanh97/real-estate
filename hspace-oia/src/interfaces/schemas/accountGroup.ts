import * as Joi from "joi";
import { logSchema } from "./base";
import { isActiveQuerySchema, pagingQuerySchema } from "./query";
import { featureSchema } from "./feature";
import { resourceSchema } from "./resource";

export const accountGroupResourceSchema = Joi.object()
  .keys({
      id: Joi.number(),
      ...logSchema,
      resourceId: Joi.number(),
      accountGroupId: Joi.number(),
      resource: resourceSchema.optional(),
  })
  .label("AccountGroupResourceSchema");

export const accountGroupFeatureSchema = Joi.object()
  .keys({
      id: Joi.number(),
      ...logSchema,
      featureId: Joi.number(),
      feature: featureSchema.optional(),
      accountGroupId: Joi.number(),
  })
  .label("AccountGroupFeatureSchema");

export const accountGroupSchema = Joi.object()
  .keys({
      id: Joi.number(),
      name: Joi.string(),
      code: Joi.string(),
      isActive: Joi.bool(),
      haveAccounts: Joi.bool(),
      description: Joi.string().optional().allow(null, "").default(""),
      accountGroupResources: Joi.array().items(
        accountGroupResourceSchema
      ).label("AccountGroupResourcesSchema"),
      accountGroupFeatures: Joi.array().items(
        accountGroupFeatureSchema
      ).label("AccountGroupFeaturesSchema"),
      ...logSchema,
  })
  .label("AccountGroupSchema");


export const accountGroupsSchema = Joi.object()
  .keys({
    items: Joi.array().items(accountGroupSchema).label("AccountGroupItemsSchema"),
    total: Joi.number(),
  })
  .label("AccountGroupListSchema");


export const accountGroupQuerySchema = Joi.object()
  .keys({
    ...pagingQuerySchema,
    name: Joi.string().allow("").optional(),
    code: Joi.string().allow("").optional(),
    description: Joi.string().allow("").optional(),
    ...isActiveQuerySchema,
  })
  .label("AccountGroupQuerySchema");
