import * as Joi from "joi";

export const accountBasicInfo = Joi.object({
  id: Joi.number(),
  type: Joi.string(),
  identityName: Joi.string(),
  code: Joi.string(),
  displayName: Joi.string(),
  isActive: Joi.boolean()
}).label("AccountBasicInfo").unknown();

export const listAccountBasicInfoSchema = Joi.object()
  .keys({
    items: Joi.array().items(accountBasicInfo).label("AccountBasicInfoSchemas"),
    total: Joi.number(),
  }).label("ListAccountBasicInfoSchema");

export const logSchema = {
  createdBy: accountBasicInfo.optional().allow(null),
  updatedBy: accountBasicInfo.optional().allow(null),
  updatedAt: Joi.date().optional(),
  createdAt: Joi.date().optional(),
};

export const statusSchema = {
  status: Joi.string()
};

export const passiveSchema = {
  isActive: Joi.boolean()
};

export const idSchema = Joi.object()
  .keys({
    id: Joi.number(),
  })
  .label("IdSchema");

export const fileKeySchema = Joi.object()
  .keys({
    key: Joi.string()
  })
  .label("FileKeySchema");

const meta = Joi.object()
  .keys({
    operation: Joi.string(),
    method: Joi.string()
  })
  .label("MetaSchema");

const errors = Joi.array()
  .items(
    Joi.object()
      .keys({
        code: Joi.alternatives().try(Joi.string(), Joi.number()),
        message: Joi.string(),
        error: Joi.string()
      })
      .label("ErrorSchema")
  )
  .label("ErrorsSchema");

export const getResponseSchema = (
  data: Joi.ObjectSchema | Joi.ArraySchema,
  label: string = null
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
      meta,
      data,
      errors
    })
    .label(label);
};

export const accountCredentialSchema = {
  identityName: Joi.string(),
  displayName: Joi.string(),
};

export const rejectNoteSchema = Joi.object().keys({
  rejectionNote: Joi.string().required(),
}).label("RejectNoteSchema");

export const noteIdAndIdSchema = Joi.object()
  .keys({
    id: Joi.number(),
    itemId: Joi.number(),
  })
  .label("NoteIdAndIdSchema");
