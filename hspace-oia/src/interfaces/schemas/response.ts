import { getResponseSchema, listAccountBasicInfoSchema } from "./base";
import { msgSchema } from "./msg";
import {
  accountForgotPasswordResponseSchema,
  accountLoginSchema,
  accountSchema,
  accountsSchema,
  licenseTokenSchema
} from "./account";
import { masterValueSchema, masterValuesSchema } from "./masterValue";
import { resourceSchema, resourcesSchema } from "./resource";
import { accountGroupSchema, accountGroupsSchema } from "./accountGroup";
import { employeeCurrentSchema, employeeSchema, employeesSchema } from "./employee";
import { groupValueSchema, groupValuesSchema } from "./groupValue";
import { fileUploadResponseSchema } from "./file";
import {
  propertyGeneralInfoResponseSchema,
  propertyItemSchema,
  propertyListResponseSchema,
  propertyResponseSchema,
  propertyShortItemSchema,
  propertyShortListResponseSchema
} from "./property";
import { collaboratorCurrentSchema, collaboratorSchema, collaboratorsSchema } from "./collaborator";
import { conversationListSchema, conversationSchema } from "./conversation";
import * as Joi from "joi";

export const msgResponse = getResponseSchema(msgSchema, "MsgResponse");

export const accountResponse = getResponseSchema(accountSchema, "AccountResponse");

export const accountsResponse = getResponseSchema(accountsSchema, "AccountsResponse");

export const listBasicAccountsResponse = getResponseSchema(listAccountBasicInfoSchema, "ListAccountBasicInfoResponse");

export const accountLoginResponse = getResponseSchema(accountLoginSchema, "AccountLoginResponse");

export const licenseTokenResponse = getResponseSchema(licenseTokenSchema, "LicenseTokenResponse");

export const accountForgotPasswordResponse = getResponseSchema(accountForgotPasswordResponseSchema, "AccountForgotPasswordResponse");

export const masterValueResponse = getResponseSchema(masterValueSchema, "MasterValueResponse");

export const masterValuesResponse = getResponseSchema(masterValuesSchema, "MasterValuesResponse");

export const resourceResponse = getResponseSchema(resourceSchema, "ResourceResponse");

export const resourcesResponse = getResponseSchema(resourcesSchema, "ResourcesResponse");

export const accountGroupResponse = getResponseSchema(accountGroupSchema, "AccountGroupResponse");

export const accountGroupsResponse = getResponseSchema(accountGroupsSchema, "AccountGroupResponse");

export const groupValueResponse = getResponseSchema(groupValueSchema, "GroupValueResponse");

export const groupValuesResponse = getResponseSchema(groupValuesSchema, "GroupValuesResponse");

export const employeeResponse = getResponseSchema(employeeSchema, "EmployeeResponse");

export const employeesResponse = getResponseSchema(employeesSchema, "EmployeesResponse");

export const employeesCurrentResponse = getResponseSchema(employeeCurrentSchema, "EmployeesCurrentSchema");

export const uploadFileResponse = getResponseSchema(fileUploadResponseSchema, "FileResponse");

export const propertyGeneralResponse = getResponseSchema(propertyGeneralInfoResponseSchema,
  "PropertyGeneralInfoSchema");

export const propertyResponse = getResponseSchema(propertyResponseSchema, "PropertySchema");

export const propertyShortListResponse = getResponseSchema(propertyShortListResponseSchema,
  "PropertyShortListSchema");

export const propertyListResponse = getResponseSchema(propertyListResponseSchema, "PropertyListSchema");

export const propertyItemResponse = getResponseSchema(propertyItemSchema, "PropertyItemSchema");

export const propertyShortItemResponse = getResponseSchema(propertyShortItemSchema, "PropertyShortItemSchema");

export const collaboratorResponse = getResponseSchema(collaboratorSchema, "CollaboratorResponse");

export const collaboratorsResponse = getResponseSchema(collaboratorsSchema, "CollaboratorsResponse");

export const collaboratorCurrentResponse = getResponseSchema(collaboratorCurrentSchema, "CollaboratorCurrentResponse");

export const conversationResponse = getResponseSchema(conversationSchema, "ConversationResponse");

export const conversationListResponse = getResponseSchema(conversationListSchema, "ConversationListResponse");

export const successResponse = getResponseSchema(Joi.object().keys({
  success: Joi.bool(),
}).label("SuccessSchema"), "SuccessResponse");
