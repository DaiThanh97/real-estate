import * as Joi from "joi";
import { accountBasicInfo, logSchema } from "./base";

const purePropertyPurchaseSchema = {
  price: Joi.number().required(),
  date: Joi.date().required(),
  supporterId: Joi.number().optional().allow(null),
  assigneeId: Joi.number().optional().allow(null),
};

export const changeablePropertyPurchaseSchema = Joi.object()
  .keys({
    ...purePropertyPurchaseSchema,
  })
  .label("ChangeablePropertyPurchaseSchema");

export const propertyPurchaseSchema = Joi.object()
  .keys({
    id: Joi.number().optional().allow(null),
    propertyId: Joi.number().required(),
    ...purePropertyPurchaseSchema,
    ...logSchema,
    assignee: accountBasicInfo.optional().allow(null),
    supporter: accountBasicInfo.optional().allow(null),
  })
  .label("PropertyPurchaseSchema");
