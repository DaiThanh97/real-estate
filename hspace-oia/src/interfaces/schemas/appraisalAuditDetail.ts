import Joi from "joi";
import { AppraisalStatementAuditType } from "../../domain/models/AppraisalStatement";
import { fileSchema } from "./file";
import { logSchema } from "./base";

export const combineLabelValueSchema = Joi.object({
  label: Joi.string().optional().allow(null, ""),
  value: Joi.number().optional().allow(null),
});

export const propertyInfoSchema = Joi.object({
  THDC1: Joi.string().optional().allow(null, ""),
  THTT2: combineLabelValueSchema.optional().allow(null),
  THQ3: combineLabelValueSchema.optional().allow(null),
  THP4: combineLabelValueSchema.optional().allow(null),
  THD5: combineLabelValueSchema.optional().allow(null),
  THDD41: combineLabelValueSchema.optional().allow(null),
  THMTVT42: Joi.string().optional().allow(null, ""),
  THNVT43: combineLabelValueSchema.optional().allow(null),
  THGDGD6: Joi.number().optional().allow(null),
  THTDGD7: Joi.date().optional().allow(null),
  THNT8: combineLabelValueSchema.optional().allow(null),
  THDGDDGD9: Joi.number().optional().allow(null),
  THHATL38: Joi.array().items(fileSchema).optional().allow(null),
}).label("AuditDetailPropertyInfoSchema");

export const useRightCertificateSchema = Joi.object({
  THT10: Joi.string().optional().allow(null, ""),
  THTBD11: Joi.string().optional().allow(null, ""),
  THLD12: combineLabelValueSchema.optional().allow(null),
  THTHSD13: combineLabelValueSchema.optional().allow(null),
  THHTSD14: combineLabelValueSchema.optional().allow(null),
  THNTM15: Joi.number().optional().allow(null),
  THNSM16: Joi.number().optional().allow(null),
  THCD1M17: Joi.number().optional().allow(null),
  THCD2M18: Joi.number().optional().allow(null),
  THNTM151: Joi.number().optional().allow(null),
  THNSM161: Joi.number().optional().allow(null),
  THCD1M171: Joi.number().optional().allow(null),
  THCD2M181: Joi.number().optional().allow(null),
  THDTCNM19: Joi.number().optional().allow(null),
  THDTKCN20: Joi.number().optional().allow(null),
  THTLDTKCNDTKV20: Joi.number().optional().allow(null),
  THHSDGDKCN: Joi.number().optional().allow(null),
  THDTCNBQHM221: Joi.number().optional().allow(null),
  THTLDTCNBQHDTCN: Joi.number().optional().allow(null),
  THHSDGDCNBQH: Joi.number().optional().allow(null),
  THDTCNKQHM222: Joi.number().optional().allow(null),
  THDTKVM223: Joi.number().optional().allow(null),
  THDTVT1M2: Joi.number().optional().allow(null),
  THHSVT1: Joi.number().optional().allow(null),
  THDTVT2M2: Joi.number().optional().allow(null),
  THHSVT2: Joi.number().optional().allow(null),
  THDTVT3M2: Joi.number().optional().allow(null),
  THHSVT3: Joi.number().optional().allow(null),
}).label("AuditDetailUseRightCertificateSchema");

export const constructionSchema = Joi.object({
  THTNT24: Joi.number().optional().allow(null),
  THHT25: Joi.number().optional().allow(null),
  THLT26: Joi.number().optional().allow(null),
  THSTT27: Joi.number().optional().allow(null),
  THKT28: Joi.string().optional().allow(null, ""),
  THCLCL29: Joi.number().optional().allow(null),
  THDTXDM230: Joi.number().optional().allow(null),
  THDTSCNM231: Joi.number().optional().allow(null),
  THDTSKCNM232: Joi.number().optional().allow(null),
  THTDTSTGCNM233: Joi.number().optional().allow(null),
  THDTSDPSM234: Joi.number().optional().allow(null),
  THDTSDTTM235: Joi.number().optional().allow(null),
  THDGXMM236: Joi.number().optional().allow(null),
  THGTCTXD37: Joi.number().optional().allow(null),
}).label("AuditDetailConstructionSchema");

export const levelSchema = Joi.object({
  groupId: Joi.number().optional().allow(null),
  groupName: Joi.string().optional().allow(null, ""),
  typeId: Joi.number().optional().allow(null),
  typeName: Joi.string().optional().allow(null, ""),
  level: Joi.number().optional().allow(null),
  note: Joi.string().optional().allow(null, ""),
}).label("AuditDetailLevelSchemaSchema");

export const adjustmentsSchema = Joi.object({
  THDGDTT1: Joi.number().optional().allow(null),
  THHSDCMTH2: combineLabelValueSchema.optional().allow(null),
  THDCYTGT3: combineLabelValueSchema.optional().allow(null),
  THDCYTMDSU4: combineLabelValueSchema.optional().allow(null),
  THDCYTQC5: combineLabelValueSchema.optional().allow(null),
  THDCYTKV6: combineLabelValueSchema.optional().allow(null),
  THDCYTTT7: combineLabelValueSchema.optional().allow(null),
  THDCYTK8: combineLabelValueSchema.optional().allow(null),
  THTMDC: Joi.number().optional().allow(null),
  THDGDTTSDC: Joi.number().optional().allow(null),
}).label("AuditDetailAdjustmentsSchema");

export const resultAuditPPSSSchema = Joi.object({
  THDGDBQPPSS: Joi.number().optional().allow(null),
  THHSDCTSTD: Joi.number().optional().allow(null),
  THDGDTDPPSS: Joi.number().optional().allow(null),
  THGTDPPSS: Joi.number().optional().allow(null),
  THGTCTXD: Joi.number().optional().allow(null),
  THTLDCCTDV: Joi.number().optional().allow(null),
  THGTTSTDPPSS: Joi.number().optional().allow(null),
}).label("AuditDetailResultAuditPPSSSchema");

export const generalInfoPPDGSchema = Joi.object({
  THDGDDG: Joi.number().optional().allow(null),
  THND: Joi.date().optional().allow(null),
  THDTC: Joi.number().optional().allow(null),
}).label("AuditDetailGeneralInfoPPDGSchema");


export const adjustControlPPDGSchema = Joi.object({
  THHSDCMTH1: combineLabelValueSchema.optional().allow(null),
  THDCYTGT2: combineLabelValueSchema.optional().allow(null),
  THDCYTMDSU3: combineLabelValueSchema.optional().allow(null),
  THDCYTQC4: combineLabelValueSchema.optional().allow(null),
  THDCYTKV5: combineLabelValueSchema.optional().allow(null),
  THDCYTTT6: combineLabelValueSchema.optional().allow(null),
  THDCYTK7: combineLabelValueSchema.optional().allow(null),
  THTMDC: Joi.number().optional().allow(null),
}).label("AuditDetailAdjustControlPPDGSchema");

export const resultAuditPPDGSchema = Joi.object({
  THDGDPPDG: Joi.number().optional().allow(null),
  THHSDCTSTD: Joi.number().optional().allow(null),
  THDGDTDPPDG: Joi.number().optional().allow(null),
  THGTDPPDG: Joi.number().optional().allow(null),
  THGTCTXD: Joi.number().optional().allow(null),
  THTLDCCTDV: Joi.number().optional().allow(null),
  THGTTSTDPPDG: Joi.number().optional().allow(null),
}).label("AuditDetailResultAuditPPDGSchema");

export const changeableItemSchema = {
  id: Joi.number().optional().allow(null),
  type: Joi.string().valid(...Object.values(AppraisalStatementAuditType)).required(),
  appraisalStatementId: Joi.number().optional().allow(null),
  inspectionStatementId: Joi.number().required(),
  propertyId: Joi.number().required(),

  address: Joi.string().optional().allow(null, ""),
  propertyInfo: propertyInfoSchema.optional().allow(null),
  useRightCertificate: useRightCertificateSchema.optional().allow(null),
  construction: constructionSchema.optional().allow(null),

  totalAdjustment: Joi.number().allow(null),
  marketLandUnitPrice: Joi.number().allow(null),
  totalLevelsAdvantage: Joi.number().allow(null),
  totalLevelsDisadvantage: Joi.number().allow(null),

  advantageLevels: Joi.array().items(levelSchema).optional().allow(null),
  disadvantageLevels: Joi.array().items(levelSchema).optional().allow(null),
  adjustments: adjustmentsSchema.optional().allow(null),
};

export const auditDetailItemSchema = {
  ...changeableItemSchema,
  ...logSchema
};

export const addingAppraisalAuditDetailsSchema = {
  auditDetails: Joi.array().items(
    changeableItemSchema,
  ).label("AddingAppraisalAuditDetailsSchema").optional().allow(null),
};

export const appraisalAuditDetailsSchema = {
  auditDetails: Joi.array().items(
    auditDetailItemSchema
  ).label("AppraisalAuditDetailsSchema").optional().allow(null),
};
