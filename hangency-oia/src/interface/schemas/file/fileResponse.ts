import Joi from "joi";
import { getResponseWrapperSchema } from "../shared/base";

const fileResponse = Joi.object()
  .keys({
    key: Joi.string(),
    mimeType: Joi.string(),
    url: Joi.string(),
    fileName: Joi.string().optional().allow(null),
    size: Joi.string().optional().allow(null),
  })
  .label("fileResponseSchema");

export const fileResponseWrapperSchema = getResponseWrapperSchema(fileResponse, "FileResponseWrapperSchema");
