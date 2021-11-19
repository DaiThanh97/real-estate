import * as Joi from "joi";
import { noteAddressSchema, noteQuerySchema, noteRelationAddressSchema, noteSchema, pureNoteSchema } from "./note";
import { appraisalExpectationSchema } from "./appraisalExpectation";
import { InvestmentEfficiencyStatus } from "../../infrastructure/orm/typeorm/models/InvestmentEfficiency";
import { pagingQuerySchema } from "./query";

const pureSchema = {
  appraisalExpectationId: Joi.number().optional().allow(null),
  ...pureNoteSchema,
  ...noteAddressSchema,
};

const changeableSchema = {
  noteType: Joi.string().optional().allow(null, ""),
  ...pureSchema,
};

const investmentCosts = {
  "HDTCPDT1": Joi.number().optional().allow(null),
  "HDTCPHT2": Joi.number().optional().allow(null),
  "HDTCPVH3": Joi.number().optional().allow(null),
  "HDCPPL4": Joi.number().optional().allow(null),
  "HDLPTBM5": Joi.number().optional().allow(null),
  "HDLPDBM6": Joi.number().optional().allow(null),
  "HDCPXP7": Joi.number().optional().allow(null),
  "HDCPTT8": Joi.number().optional().allow(null),
  "HDCPHC9": Joi.number().optional().allow(null),
  "HDLPCC10": Joi.number().optional().allow(null),
  "HDTTNCN11": Joi.number().optional().allow(null),
  "HDCPKPS12": Joi.number().optional().allow(null),
  "HDCPMBH13": Joi.number().optional().allow(null),
  "HDPMGM14": Joi.number().optional().allow(null),
  "HDMGB15": Joi.number().optional().allow(null),
  "otherLegalFees": Joi.array().items({
    label: Joi.string().optional().allow(null),
    value: Joi.number().optional().allow(null),
  }).label("OtherLegalFees"),
  "otherFees": Joi.array().items({
    label: Joi.string().optional().allow(null),
    value: Joi.number().optional().allow(null),
  }).label("OtherFees"),
};

const purchasePriceAnalysis = {
  "HDTDHTPD1": {
    label: Joi.string().optional().allow(null),
    value: Joi.string().optional().allow(null),
  },
  "HDGMDX2": Joi.number().optional().allow(null),
  "HDTNSDT3": Joi.number().optional().allow(null),
  "HDGTTSUT4": Joi.number().optional().allow(null),
  "HDLN5": Joi.number().optional().allow(null),
  "HDTSLN6": Joi.number().optional().allow(null),
  "HDTTGTHDA7": Joi.number().optional().allow(null),
  "HDTSLNT8": Joi.number().optional().allow(null),
  "HDXL9": Joi.string().optional().allow(null, ""),
};

const refInvestmentEfficiencyInfo = {
  "PDHSMV1": Joi.number().optional().default(0.003),
  "PDHSBR2": Joi.number().optional().default(0.01),
  "PDHSLPTB3": Joi.number().optional().default(0.005),
  "PDHSTTNCN4": Joi.number().optional().default(0.02),
  "PDHSTDN5": Joi.number().optional().default(0),
};

const changeablePlanItem = {
  index: Joi.number().optional().allow(null),
  name: Joi.string().optional().allow(null, ""),
  description: Joi.string().optional().allow(null, ""),
  planTypeId: Joi.number().optional().allow(null),
  constructionTypeId: Joi.number().optional().allow(null),
  investmentTime: Joi.number().optional().allow(null),
  price: Joi.number().optional().allow(null),
  investmentCostTotal: Joi.object(
    investmentCosts
  ).optional().allow(null).label("InvestmentCostTotal"),
  purchasePriceAnalysisTotal: Joi.object(
    purchasePriceAnalysis
  ).optional().allow(null).label("PurchasePriceAnalysisTotal"),
  sourceId: Joi.number().optional().allow(null),
  refInvestmentEfficiencyInfo: Joi.object(refInvestmentEfficiencyInfo).optional().allow(null),
};

const changeablePlanLand = {
  index: Joi.number().optional().allow(null),
  investmentCosts: Joi.object(
    investmentCosts
  ).optional().allow(null).label("InvestmentCosts"),
  purchasePriceAnalysis: Joi.object(
    purchasePriceAnalysis
  ).optional().allow(null).label("PurchasePriceAnalysis"),
};

export const addingInvestmentEfficiencySchema = Joi.object().keys({
  ...changeableSchema,
  planItems: Joi.array().items({
    ...changeablePlanItem,
    lands: Joi.array().items(changeablePlanLand).label("AddingInvestmentEfficiencyLandSchema")
  }).label("AddingInvestmentEfficiencyPlanItemSchema"),
}).label("AddingInvestmentEfficiencySchema");


export const updatingInvestmentEfficiencySchema = Joi.object().keys({
  ...changeableSchema,
  planItems: Joi.array().items({
    id: Joi.number().optional().allow(null),
    ...changeablePlanItem,
    lands: Joi.array().items({
      id: Joi.number().optional().allow(null),
      ...changeablePlanLand,
    }).label("UpdatingInvestmentEfficiencyLandSchema")
  }).label("UpdatingInvestmentEfficiencyPlanItemSchema"),
}).label("UpdatingInvestmentEfficiencySchema");


export const investmentEfficiencySchema = Joi.object().keys({
  ...changeableSchema,
  ...noteSchema,
  ...noteRelationAddressSchema,
  status: Joi.string().required().valid(...Object.values(InvestmentEfficiencyStatus)),
  appraisalExpectation: appraisalExpectationSchema.allow(null),
  planItems: Joi.array().items({
    id: Joi.number().required(),
    ...changeablePlanItem,
    updatedAt: Joi.date().optional(),
    createdAt: Joi.date().optional(),
    lands: Joi.array().items({
      id: Joi.number().required(),
      ...changeablePlanLand,
      updatedAt: Joi.date().optional(),
      createdAt: Joi.date().optional(),
    }).label("InvestmentEfficiencyLandSchema"),
  }).label("InvestmentEfficiencyPlanItemSchema"),
  approvedPlanId: Joi.number().optional().allow(null),
  approvedPlanPrice: Joi.number().optional().allow(null),
  approvedPlanTypeId: Joi.number().optional().allow(null),
  approvedPlanName: Joi.string().optional().allow(null),
  approvedPlanTime: Joi.number().optional().allow(null),
  approvedPurchasePrice: Joi.number().optional().allow(null),
});

export const investmentEfficiencySchemas = Joi.object().keys({
  items: Joi.array().items(investmentEfficiencySchema),
  total: Joi.number(),
}).label("InvestmentEfficiencySchemas");


export const queryInvestmentEfficiencySchema = Joi.object().keys({
  ...pagingQuerySchema,
  ...noteQuerySchema,
  approvedPurchasePriceFrom: Joi.number().optional().allow(null),
  approvedPurchasePriceTo: Joi.number().optional().allow(null),
  approvedPlanTypeId: Joi.number().optional().allow(null),
}).label("QueryInvestmentEfficiencySchema");


export const approvedInvestmentEfficiencyRequestSchema = Joi.object().keys({
  approvedPlanId: Joi.number(),
  approvedPlanPrice: Joi.number(),
  approvedPlanTypeId: Joi.number(),
  approvedPlanName: Joi.string(),
  approvedPlanTime: Joi.number(),
  approvedPurchasePrice: Joi.number(),
}).label("ApprovedInvestmentEfficiencyRequestSchema");
