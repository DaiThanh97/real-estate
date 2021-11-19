import * as Joi from "joi";
import { logSchema } from "./base";
import { NotificationGroup } from "../../infrastructure/orm/typeorm/models/Notification";
import { pagingQuerySchema } from "./query";

export const notificationSchema = Joi.object().keys({
  id: Joi.number(),
  propertyId: Joi.number().allow(null),
  group: Joi.string().valid(...Object.values(NotificationGroup)),
  refId: Joi.number().allow(null),
  refCode: Joi.string().allow(null, ""),
  content: Joi.string().allow(null, ""),
  url: Joi.string().allow(null, ""),
  action: Joi.string(),
  isActive: Joi.bool(),
  ...logSchema,
}).label("NotificationSchema");


export const accountNotificationSchema = Joi.object().keys({
  id: Joi.number(),
  notificationId: Joi.number(),
  markAsRead: Joi.bool().allow(null),
  notification: notificationSchema,
  ...logSchema,
}).label("AccountNotificationSchema");


export const accountNotificationsSchema = Joi.object().keys({
  items: Joi.array().items(accountNotificationSchema),
  total: Joi.number(),
}).label("AccountNotificationsSchema");


export const queryNotificationSchema = Joi.object()
  .keys({
    ...pagingQuerySchema,
    unread: Joi.bool().optional().allow(null, "").default(null),
  }).label("QueryNotificationSchema");
