import * as Joi from "joi";
import { logSchema } from "./base";

export const commentSchema = Joi.object()
  .keys({
    id: Joi.number().optional(),
    content: Joi.string(),
    topicId: Joi.number(),
    ...logSchema,
  })
  .label("CommentSchema");

export const topicSchema = Joi.object()
  .keys({
    id: Joi.number().optional(),
    isActive: Joi.bool().optional(),
    comments: Joi.array()
      .items(commentSchema)
      .label("CommentsSchema")
      .optional(),
    ...logSchema,
  })
  .label("TopicSchema");

export const postComment = Joi.object().keys(
  {
    content: Joi.string().required().not(""),
  }
).label("PostComment");
