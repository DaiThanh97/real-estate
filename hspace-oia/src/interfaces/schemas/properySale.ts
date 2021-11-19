import * as Joi from "joi";
import { accountBasicInfo, logSchema } from "./base";

const purePropertySaleSchema = {
  price: Joi.number().required(),
  date: Joi.date().required(),
  sellerId: Joi.number().optional().allow(null),
  saleSourceId: Joi.number().optional().allow(null),
};

export const changeablePropertySaleSchema = Joi.object()
  .keys({
    ...purePropertySaleSchema,
  })
  .label("ChangeablePropertySaleSchema");

export const propertySaleSchema = Joi.object()
  .keys({
    id: Joi.number().optional().allow(null),
    propertyId: Joi.number().required(),
    ...purePropertySaleSchema,
    ...logSchema,
    seller: accountBasicInfo.optional().allow(null),
    saleSource: accountBasicInfo.optional().allow(null),
  })
  .label("PropertySaleSchema");
