import Joi from "joi";

export const fileKeySchema = Joi.object()
  .keys({
    key: Joi.string(),
  })
  .label("fileKeySchema");
