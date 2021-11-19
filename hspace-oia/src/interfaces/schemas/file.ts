import * as Joi from "joi";
import { AllowMIMETypes } from "../../infrastructure/orm/typeorm/models/Property";
import { BadRequestError } from "../../infrastructure/error";

export const fileUploadSchema = {
  file: Joi.any().meta({ swaggerType: "file" }).custom(
    (value, _) => {
      const mimeType = value.hapi.headers["content-type"];
      const isValid = AllowMIMETypes.indexOf(mimeType) > -1;
      if (!isValid) {
        throw new BadRequestError("MINE types is not supported.");
      }

      return value;
    })
};

export const fileSchema = {
  key: Joi.string(),
  mimeType: Joi.string(),
  url: Joi.string(),
  fileName: Joi.string().optional().allow(null),
  size: Joi.string().optional().allow(null)
};

export const fileUploadResponseSchema = Joi.object().keys({
  ...fileSchema
})
  .label("FileSchema");
