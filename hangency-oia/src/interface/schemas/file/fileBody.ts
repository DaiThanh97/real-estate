import Joi from "joi";
import { BadImplementationError } from "../../../domain/exceptions/error";
import { AllowMIMETypes } from "../../../infrastructure/config/constants/files";

export const fileBodySchema = Joi.object()
  .keys({
    file: Joi.any()
      .meta({ swaggerType: "file" })
      .custom((value, _) => {
        const mimeType = value.hapi.headers["content-type"];
        const isValid = AllowMIMETypes.indexOf(mimeType) > -1;
        if (!isValid) {
          throw new BadImplementationError("MINE types is not supported.");
        }

        return value;
      }),
  })
  .label("fileBodySchema");
