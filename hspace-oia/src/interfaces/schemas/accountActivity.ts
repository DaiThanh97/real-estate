import * as Joi from "joi";
import { logSchema } from "./base";
import { ActivityGroup } from "../../infrastructure/orm/typeorm/models/ActivityTemplate";


export const activitySchema = Joi.object().keys({
  id: Joi.number(),
  propertyId: Joi.number().allow(null),
  group: Joi.string().valid(...Object.values(ActivityGroup)),
  refId: Joi.number().allow(null),
  refCode: Joi.string().allow(null, ""),
  content: Joi.string().allow(null, ""),
  action: Joi.string(),
  isActive: Joi.bool(),
  quote: Joi.string().allow(null, ""),
  ...logSchema,
}).label("ActivitySchema");


export const activitiesSchema = Joi.object().keys({
  items: Joi.array().items(activitySchema),
  total: Joi.number(),
}).label("ActivitiesSchema");
