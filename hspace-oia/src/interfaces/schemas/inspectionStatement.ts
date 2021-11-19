import * as Joi from "joi";
import { accountBasicInfo, logSchema } from "./base";
import {
  InspectionStatementStatus,
  InspectionStatementType
} from "../../infrastructure/orm/typeorm/models/InspectionStatement";
import { masterValueSchema } from "./masterValue";
import { pagingQuerySchema } from "./query";
import { fileSchema } from "./file";
import { noteAddressSchema, noteQuerySchema, noteRelationAddressSchema, noteSchema, pureNoteSchema } from "./note";

const landUseRights = {
  "KHT10": Joi.string().optional().allow(null),
  "KHTBD11": Joi.string().optional().allow(null),
  "KHLD12": Joi.object({
    label: Joi.string().optional().allow(null),
    value: Joi.number().optional().allow(null),
  }).optional().allow(null),
  "KHTHSD13": Joi.object({
    label: Joi.string().optional().allow(null),
    value: Joi.number().optional().allow(null),
  }).optional().allow(null),
  "KHNT14": Joi.number().optional().allow(null),
  "KHNS15": Joi.number().optional().allow(null),
  "KHCD116": Joi.number().optional().allow(null),
  "KHCD217": Joi.number().optional().allow(null),
  "KHNT141": Joi.number().optional().allow(null),
  "KHNS151": Joi.number().optional().allow(null),
  "KHCD1161": Joi.number().optional().allow(null),
  "KHCD2171": Joi.number().optional().allow(null),
  "KHHTSD18": Joi.object({
    label: Joi.string().optional().allow(null),
    value: Joi.number().optional().allow(null),
  }).optional().allow(null),
  "KHDTCN19": Joi.number().optional().allow(null),
  "KHDTKCN20": Joi.number().optional().allow(null),
  "KHTL21": Joi.number().optional().allow(null),
  "KHHS22": Joi.number().optional().allow(null),
  "KHDTCNQH23": Joi.number().optional().allow(null),
  "KHTLDTCN24": Joi.number().optional().allow(null),
  "KHHSDCN25": Joi.number().optional().allow(null),
  "KHDTCN26": Joi.number().optional().allow(null),
  "KHDTKV27": Joi.number().optional().allow(null),
  "KHDTVT1481": Joi.number().optional().allow(null),
  "KHHSVT1482": Joi.number().optional().allow(null),
  "KHDTVT2483": Joi.number().optional().allow(null),
  "KHHSVT2484": Joi.number().optional().allow(null),
  "KHDTVT3485": Joi.number().optional().allow(null),
  "KHHSVT3486": Joi.number().optional().allow(null),
};

const construction = {
  "KHHT28": Joi.object({
    label: Joi.string().optional().allow(null),
    value: Joi.bool().optional().allow(null),
  }).optional().allow(null),
  "KHTN29": Joi.number().optional().allow(null),
  "KHH30": Joi.number().optional().allow(null),
  "KHL31": Joi.number().optional().allow(null),
  "KHST32": Joi.number().optional().allow(null),
  "KHKC33": Joi.string().optional().allow(null),
  "KHCLCL34": Joi.number().optional().allow(null),
  "KHDTXL35": Joi.number().optional().allow(null),
  "KHDTSCN36": Joi.number().optional().allow(null),
  "KHDTSKCN37": Joi.number().optional().allow(null),
  "KHTDTS38": Joi.number().optional().allow(null),
  "KHDTSDPS39": Joi.number().optional().allow(null),
  "KHDTSDTT40": Joi.number().optional().allow(null),
  "KHDGXM41": Joi.number().optional().allow(null),
  "KHGTCTXD42": Joi.number().optional().allow(null),
  attachments: Joi.array().items(fileSchema).optional().allow(null),
};

const changeableLevelSchema = {
  groupId: Joi.number().optional().allow(null),
  typeId: Joi.number().optional().allow(null),
  level: Joi.number().optional().allow(null),
  note: Joi.string().optional().allow(null, ""),
};

const levelSchema = Joi.object().keys({
  id: Joi.number().required(),
  inspectionStatementId: Joi.number().positive().required(),
  ...changeableLevelSchema,
  ...logSchema,
  group: masterValueSchema.optional().allow(null),
  type: masterValueSchema.optional().allow(null),
}).label("InspectionStatementLevelSchema");

const pureSchema = {
  noteType: Joi.string().valid(...Object.values(InspectionStatementType)).optional().allow(null),
  ...pureNoteSchema,
  ...noteAddressSchema,
  streetGroupId: Joi.number().optional().allow(null),
  positionGroupId: Joi.number().optional().allow(null),
  otherAddress: Joi.bool().optional(),
  locationDescription: Joi.string().optional().allow(""),
  closedDealValue: Joi.number().optional().allow(null),
  transactionDate: Joi.date().optional().allow(null),
  brokerId: Joi.number().optional().allow(null),
  landUseRights: Joi.object(landUseRights).allow(null),
  construction: Joi.object(construction).allow(null),
  totalAdjustment: Joi.number().allow(null),
  marketLandUnitPrice: Joi.number().allow(null),
  closedDealUnitPrice: Joi.number().allow(null),
};

const changeableSchema = {
  ...pureSchema,
  advantageLevels: Joi.array().items(changeableLevelSchema).optional().allow(null),
  disadvantageLevels: Joi.array().items(changeableLevelSchema).optional().allow(null),
};


export const addingInspectionStatementSchema = Joi.object().keys({
  ...changeableSchema,
}).label("AddingInspectionStatementSchema");

export const updatingInspectionStatementSchema = Joi.object().keys({
  ...pureSchema,
  advantageLevels: Joi.array().items({
    id: Joi.number().optional().allow(null),
    ...changeableLevelSchema
  }).optional().allow(null),
  disadvantageLevels: Joi.array().items({
    id: Joi.number().optional().allow(null),
    ...changeableLevelSchema,
  }).optional().allow(null),
}).label("UpdatingInspectionStatementSchema");

export const inspectionStatementSchema = Joi.object().keys({
  ...changeableSchema,
  ...noteSchema,
  ...noteRelationAddressSchema,
  status: Joi.string().required().valid(...Object.values(InspectionStatementStatus)),
  streetGroup: masterValueSchema.allow(null),
  positionGroup: masterValueSchema.allow(null),
  broker: accountBasicInfo.optional().allow(null),
  advantageLevels: Joi.array().items(levelSchema).optional().allow(null),
  disadvantageLevels: Joi.array().items(levelSchema).optional().allow(null),
}).label("InspectionStatementSchema");

export const inspectionStatementSchemas = Joi.object().keys({
  items: Joi.array().items(inspectionStatementSchema),
  total: Joi.number(),
}).label("InspectionStatementSchemas");

export const queryInspectionStatementSchema = Joi.object().keys({
  ...pagingQuerySchema,
  ...noteQuerySchema,
  noteType: Joi.string().optional().allow(null, ""),
}).label("QueryInspectionStatementSchema");
