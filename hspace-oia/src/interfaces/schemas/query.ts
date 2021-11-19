import * as Joi from "joi";

export const isActiveQuerySchema = {
  isActive: Joi.bool().optional().allow("").default(null),
};

export const pagingQuerySchema = {
  limit: Joi.number().default(100),
  skip: Joi.number().default(0),
  order: Joi.string().valid("desc", "asc").default("asc"),
  orderField: Joi.string().allow("", null).default("").optional(),
};


export const keywordQuerySchema = Joi.object()
  .keys({
    ...pagingQuerySchema,
    keyword: Joi.string().allow("").optional(),
    ...isActiveQuerySchema,
  })
  .label("KeywordQuerySchema");
