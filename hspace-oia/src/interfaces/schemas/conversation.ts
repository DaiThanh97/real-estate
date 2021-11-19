import * as Joi from "joi";
import { accountBasicInfo, logSchema } from "./base";
import { pagingQuerySchema } from "./query";

export const addingConversationSchema = Joi.object()
  .keys({
    accountId: Joi.number()
  })
  .label("AddingConversationSchema");

export const messageSchema = Joi.object()
  .keys({
    id: Joi.number(),
    content: Joi.string().allow(""),
    conversationId: Joi.number(),
    status: Joi.string(),
    ...logSchema,
  }).label("MessageSchema");

export const participantSchema = Joi.object()
  .keys({
    id: Joi.number(),
    accountId: Joi.number(),
    account: accountBasicInfo.optional(),
    ...logSchema,
    lastSeenId: Joi.number().optional().allow(null),
    lastSeen: messageSchema.optional().allow(null),
  }).label("ParticipantSchema");

export const conversationSchema = Joi.object()
  .keys({
    id: Joi.number(),
    lastMessageId: Joi.number().allow(null),
    ...logSchema,
    snapshot: Joi.string().allow(null, ""),
    messages: Joi.array().items(messageSchema).label("MessagesSchema").optional().allow(null),
    participants: Joi.array().items(participantSchema).label("ParticipantsSchema"),
    lastMessage: messageSchema.optional().allow(null),
  }).label("ConversationSchema");

export const conversationListSchema = Joi.object()
  .keys({
    items: Joi.array().items(conversationSchema),
    total: Joi.number(),
  }).label("ConversationListSchema");

export const queryConversationSchema = Joi.object()
  .keys({
    ...pagingQuerySchema,
    unread: Joi.bool().optional().allow(null, "").default(null),
  }).label("QueryConversationSchema");
