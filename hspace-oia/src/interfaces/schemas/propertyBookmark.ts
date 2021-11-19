import * as Joi from "joi";
import { logSchema , accountBasicInfo , passiveSchema } from "./base";

export const propertyBookmarkSchema = Joi.object()
  .keys({
      id: Joi.number().optional().allow(null),
      propertyId: Joi.number().optional().allow(null),
      bookmarkerId: Joi.number().optional().allow(null),
      bookmarker: accountBasicInfo.optional().allow(null),
      bookmarkDate: Joi.date().optional().allow(null),
      type: Joi.string(),
      ...passiveSchema,
      ...logSchema,
  })
  .label("PropertyBookmarkSchema");
