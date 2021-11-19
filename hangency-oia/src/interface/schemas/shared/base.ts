import * as Joi from "joi";

export const getResponseWrapperSchema = (
  data: Joi.ObjectSchema | Joi.ArraySchema,
  label: string = null,
): Joi.ObjectSchema<{
  meta: Joi.ObjectSchema<{
    operation: Joi.StringSchema;
    method: Joi.StringSchema;
  }>;
  data?: Joi.ObjectSchema;
  errors: Joi.ArraySchema;
}> => {
  return Joi.object()
    .keys({
      meta: Joi.object()
        .keys({
          operation: Joi.string(),
          method: Joi.string(),
        })
        .label("MetaSchema"),
      data,
      errors: Joi.array()
        .items(
          Joi.object()
            .keys({
              code: Joi.string().allow(null, ""),
              message: Joi.string(),
              error: Joi.string(),
            })
            .label("ErrorItemSchema"),
        )
        .label("ErrorsSchema"),
    })
    .label(label);
};

export const baseSchema = {
  id: Joi.string().required(),
  updatedAt: Joi.date().required(),
  createdAt: Joi.date().required(),
};

export const idSchema = Joi.object()
  .keys({
    id: Joi.string(),
  })
  .label("IdSchema");
