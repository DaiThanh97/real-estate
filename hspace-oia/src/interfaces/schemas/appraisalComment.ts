import Joi from "joi";
import { AppraisalStatementCommentType } from "../../domain/models/AppraisalStatement";

export const commentSchema = {
  type: Joi.string().valid(...Object.values(AppraisalStatementCommentType)).required(),
  comment: Joi.string(),
};

export const appraisalCommentsSchema = {
  comments: Joi.array().items(
    commentSchema,
  ).label("AppraisalCommentsSchema").optional().allow(null),
};
