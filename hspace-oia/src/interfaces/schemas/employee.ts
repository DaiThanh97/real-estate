import * as Joi from "joi";
import { accountCredentialSchema, logSchema } from "./base";
import { pagingQuerySchema } from "./query";
import { masterValueSchema } from "./masterValue";

export const employeeLimitSchema = Joi.object()
  .keys({
    id: Joi.number(),
    ...logSchema,
    typeId: Joi.number(),
    employeeId: Joi.number(),
    value: Joi.number(),
    type: masterValueSchema,
    isActive: Joi.bool(),
  })
  .label("EmployeeLimitSchema");

export const addingEmployeeLimitSchema = Joi.object()
  .keys({
    typeId: Joi.number(),
    isActive: Joi.bool().default(true),
    value: Joi.number()
  })
  .label("AddingEmployeeLimitSchema");

export const employeeRegionSchema = Joi.object()
  .keys({
    id: Joi.number(),
    ...logSchema,
    cityId: Joi.number(),
    districtId: Joi.number().optional().allow(null),
    wardId: Joi.number(),
    employeeId: Joi.number(),
    isActive: Joi.bool(),
    city: masterValueSchema,
    district: masterValueSchema.optional().allow(null),
  })
  .label("EmployeeRegionSchema");

export const addingEmployeeRegionSchema = Joi.object()
  .keys({
    cityId: Joi.number(),
    districtId: Joi.number(),
    isActive: Joi.bool().default(true),
  })
  .label("AddingEmployeeRegionSchema");

const pureEmployeeSchema = {
  code: Joi.string(),
  fullName: Joi.string().normalize(),
  birthday: Joi.date(),
  joinedDate: Joi.date(),
  phone: Joi.string().optional().allow("", null).default(""),
  email: Joi.string().email().optional().allow("", null).default(""),
};

export const employeeSchema = Joi.object()
  .keys({
    id: Joi.number(),
    ...pureEmployeeSchema,
    departmentId: Joi.number().optional().allow(null),
    titleId: Joi.number().optional().allow(null),
    statusId: Joi.number().optional().allow(null),
    department: masterValueSchema.optional().allow(null),
    title: masterValueSchema.optional().allow(null),
    status: masterValueSchema.optional().allow(null),
    managerId: Joi.number().optional().allow(null),
    manager: Joi.object().keys(
      { id: Joi.number(), ...pureEmployeeSchema }
    ).unknown().allow(null),
    employeeLimits: Joi.array().items(
      employeeLimitSchema
    ).label("EmployeeLimitsSchema"),
    employeeRegions: Joi.array().items(
      employeeRegionSchema
    ).label("EmployeeRegionsSchema"),
    ...logSchema,
  })
  .label("EmployeeSchema");

export const addingEmployeeSchema = Joi.object()
  .keys({
    ...pureEmployeeSchema,
    departmentId: Joi.number().optional().allow(null),
    titleId: Joi.number().optional().allow(null),
    statusId: Joi.number().optional().allow(null),
    managerId: Joi.number().optional().allow(null),
    employeeLimits: Joi.array().items(
      addingEmployeeLimitSchema
    ).label("AddingEmployeeLimitsSchema"),
    employeeRegions: Joi.array().items(
      addingEmployeeRegionSchema
    ).label("AddingEmployeeRegionsSchema"),
  })
  .label("AddingEmployeeSchema");


export const employeesSchema = Joi.object()
  .keys({
    items: Joi.array().items(employeeSchema).label("EmployeeItemsSchema"),
    total: Joi.number(),
  })
  .label("EmployeeListSchema");


export const employeeQuerySchema = Joi.object()
  .keys({
    ...pagingQuerySchema,
    fullName: Joi.string().allow("", null).optional().normalize(),
    code: Joi.string().allow("", null).optional(),
    phone: Joi.string().allow("", null).optional(),
    email: Joi.string().allow("", null).optional(),
    titleId: Joi.number().allow("", null).optional(),
    departmentId: Joi.number().allow("", null).optional(),
    managerId: Joi.number().allow("", null).optional(),
    statusId: Joi.number().allow("", null).optional(),
    accountId: Joi.number().allow("", null).optional(),
  })
  .label("EmployeeQuerySchema");

export const employeeCurrentSchema = Joi.object()
  .concat(employeeSchema)
  .keys({
    ...accountCredentialSchema
  }).label("EmployeeCurrentSchema");

export const employeeChangeBasicInfoSchema = Joi.object()
  .keys({
    birthday: Joi.date().required()
  }).label("EmployeeChangeBasicInfoSchema");



