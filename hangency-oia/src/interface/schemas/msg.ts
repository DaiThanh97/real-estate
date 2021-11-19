import * as Joi from "joi";

export const msgSchema = Joi.object({
  msg: Joi.string(),
  success: Joi.bool().default(true),
}).label("MsgSchema");
