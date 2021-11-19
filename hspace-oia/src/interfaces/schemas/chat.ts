import * as Joi from "joi";

export const readMessageRequestSchema = Joi.object().keys({
  conversationId: Joi.number().required(),
  lastSeenId: Joi.number().required().allow(null),
});

export const chatMessageRequestSchema = Joi.object().keys({
  content: Joi.string().required(),
  identityName: Joi.string().required(),
  conversationId: Joi.number().required(),
});
