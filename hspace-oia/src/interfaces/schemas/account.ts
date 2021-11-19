import * as Joi from "joi";
import { employeeSchema } from "./employee";
import { collaboratorSchema } from "./collaborator";
import { logSchema } from "./base";
import { isActiveQuerySchema, pagingQuerySchema } from "./query";
import { accountGroupSchema } from "./accountGroup";
import { resourceSchema } from "./resource";
import { featureSchema } from "./feature";
import constants from "../../infrastructure/config/constants";
import { AccountSettingTypes } from "../../infrastructure/orm/typeorm/models/AccountSetting";

export const accountAccountGroupsSchema = Joi.object()
  .keys({
    id: Joi.number(),
    ...logSchema,
    accountId: Joi.number(),
    accountGroupId: Joi.number(),
    accountGroup: accountGroupSchema.optional(),
  })
  .label("AccountAccountGroupSchema");

export const accountMenuSchema = Joi.object()
  .keys({
    id: Joi.number(),
    ...logSchema,
    name: Joi.string(),
    path: Joi.string().optional().allow(""),
    parentId: Joi.number().optional().allow(null),
    parent: Joi.object().optional().allow(null),
    resourceId: Joi.number().optional().allow(null),
    resource: resourceSchema.optional().allow(null),
    hasChild: Joi.boolean().optional(),
    children: Joi.array().items(Joi.object()).label("accountMenuChildrenSchema"),
  })
  .label("AccountAccountGroupSchema");

export const addingAccountAccountGroupsSchema = Joi.object()
  .keys({
    accountGroupId: Joi.number()
  })
  .label("AddingAccountAccountGroupsSchema");

export const accountSchema: any = Joi.object()
  .keys({
    id: Joi.number(),
    type: Joi.string(),
    identityName: Joi.string().normalize(),
    code: Joi.string(),
    displayName: Joi.string().normalize(),
    isActive: Joi.bool(),
    lastLoginAt: Joi.date().allow(null),
    employeeId: Joi.number().optional().allow(null),
    employee: employeeSchema.optional().allow(null),
    collaboratorId: Joi.number().optional().allow(null),
    collaborator: collaboratorSchema.optional().allow(null),
    accountAccountGroups: Joi.array().items(
      accountAccountGroupsSchema
    ).label("AccountAccountGroupsSchema"),
    accountGroups: Joi.array().items(
      accountGroupSchema
    ).label("AccountGroupsSchema").optional().allow(null),
    menu: Joi.array().items(accountMenuSchema).label("accountMenuSchema").optional().allow(null),
    resources: Joi.array().items(
      resourceSchema
    ).label("AccountResourcesSchema").optional().allow(null),
    features: Joi.array().items(
      featureSchema
    ).label("AccountFeaturesSchema").optional().allow(null),
    ...logSchema
  })
  .label("AccountSchema");

export const addingAccountSchema: any = Joi.object()
  .keys({
    type: Joi.string(),
    isActive: Joi.bool(),
    employeeId: Joi.number().optional().allow(null),
    collaboratorId: Joi.number().optional().allow(null),
    accountAccountGroups: Joi.array().items(
      addingAccountAccountGroupsSchema
    ).label("AddingAccountAccountGroupItemsSchema")
  })
  .label("AddingAccountSchema");

export const accountsSchema = Joi.object()
  .keys({
    items: Joi.array().items(accountSchema).label("AccountItemsSchema"),
    total: Joi.number(),
  })
  .label("AccountListSchema");


export const accountLogin = Joi.object({
  identityName: Joi.string().required(),
  password: Joi.string().required()
}).label("AccountLogin");


export const accountLoginSchema = Joi.object()
  .keys({
    accessToken: Joi.string(),
  })
  .label("AccountLoginSchema");

export const accountQuerySchema = Joi.object()
  .keys({
    ...pagingQuerySchema,
    ...isActiveQuerySchema,
    displayName: Joi.string().allow("").optional().normalize(),
    code: Joi.string().allow("").optional(),
    type: Joi.string().allow("").optional(),
    identityName: Joi.string().allow("").optional().normalize(),
    employees: Joi.array().items(employeeSchema).label("EmployeeItemsSchema").optional(),
    collaborators: Joi.array().items(collaboratorSchema).label("CollaboratorItemsSchema").optional(),
    accountGroupId: Joi.number().allow("", null).optional(),
    // search for employee and collaborator
    fullName: Joi.string().allow("", null).optional().normalize(),
    phone: Joi.string().allow("", null).optional(),
    email: Joi.string().allow("", null).optional(),
    // search for collaborator
    companyId: Joi.number().allow("", null).optional(),
    collaboratorTypeId: Joi.number().allow("", null).optional(),
    // search for employee
    titleId: Joi.number().allow("", null).optional(),
    departmentId: Joi.number().allow("", null).optional(),
    managerId: Joi.number().allow("", null).optional(),
    statusId: Joi.number().allow("", null).optional(),
  })
  .label("AccountQuerySchema");

export const accountChangePassword = Joi.object({
  password: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).regex(constants.AccountManager.regExpPassword).required()
}).label("AccountChangePassword");

export const accountForgotPasswordRequestSchema = Joi.object({
  identityName: Joi.string().required(),
}).label("AccountForgotPasswordRequestSchema");

export const accountForgotPasswordConfirmSchema = Joi.object({
  identityName: Joi.string().required(),
  code: Joi.string().length(6).required(),
  newPassword: Joi.string().min(6).regex(constants.AccountManager.regExpPassword).required(),
  sign: Joi.string().required()
}).label("AccountForgotPasswordConfirmSchema");

export const accountForgotPasswordResponseSchema = Joi.object({
  sign: Joi.string().required(),
}).label("AccountForgotPasswordResponseSchema");


export const licenseRequest = Joi.object({
  id: Joi.number().optional().allow(null),
  api: Joi.string().required(),
  method: Joi.string().required(),
  resourceId: Joi.number().required(),
});

export const licenseTokenSchema = Joi.object()
  .keys({
    licenseToken: Joi.string(),
  })
  .label("LicenseTokenSchema");

export const queryAccountForNoteAssigneeSchema = Joi.object().keys({
  ...pagingQuerySchema,
  ...isActiveQuerySchema,
  resourceId: Joi.number().required(),
  displayName: Joi.string().allow("").optional().normalize(),
}).label("QueryAccountForNoteAssigneeSchema");

export const settingFolderSchema = Joi.object()
  .keys({
    folder: Joi.string().required().not(""),
  })
  .label("SettingFolderSchema");

export const settingParamsSchema = Joi.object()
  .keys({
    folder: Joi.string().required().not(""),
    key: Joi.string().required().not(""),
  })
  .label("SettingParamsSchema");

export const accountSettingDataSchema = Joi.object().keys({
  value: Joi.any().required().allow(null, ""),
  type: Joi.string().valid(...Object.values(AccountSettingTypes)).required(),
}).label("AccountSettingDataSchema");

export const accountSettingSchema = Joi.object().keys({
  id: Joi.number().positive().required(),
  ...logSchema,
  key: Joi.string().required().not(""),
  data: accountSettingDataSchema.required(),
  description: Joi.string().optional().allow("", null),
  folder: Joi.string().required(),
}).label("AccountSettingSchema");

export const accountSettingsSchema = Joi.object().keys({
  items: Joi.array().items(accountSettingSchema).label("AccountSettingItemsSchema"),
  total: Joi.number().required(),
}).label("AccountSettingsSchema");
