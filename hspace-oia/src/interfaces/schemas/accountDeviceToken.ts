import * as Joi from "joi";

export const registerAccountDeviceTokenSchema = Joi.object()
  .keys({
    deviceToken: Joi.string().required(),
    deviceType: Joi.string().optional().allow(null, ""),
    deviceName: Joi.string().optional().allow(null, ""),
  })
  .label("RegisterAccountDeviceTokenSchema");

export const removeAccountDeviceTokenSchema = Joi.object()
  .keys({
    deviceToken: Joi.string().required(),
  })
  .label("RemoveAccountDeviceTokenSchema");
