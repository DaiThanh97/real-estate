import * as Joi from "joi";
import { pagingQuerySchema } from "./query";
import { noteAddressSchema, noteQuerySchema, noteRelationAddressSchema, noteSchema, pureNoteSchema } from "./note";
import { InvestmentPlanStatus } from "../../infrastructure/orm/typeorm/models/InvestmentPlan";
import { ConstructionType } from "../../infrastructure/orm/typeorm/models/InvestmentPlanLand";
import { appraisalStatementSchema } from "./appraisalStatement";

const fileSchema = {
  key: Joi.string(),
  mimeType: Joi.string(),
  url: Joi.string(),
  fileName: Joi.string().optional().allow(null),
  size: Joi.string().optional().allow(null)
};

const pureSchema = {
  appraisalStatementId: Joi.number().optional().allow(null),
  ...pureNoteSchema,
  ...noteAddressSchema,
};

const changeableSchema = {
  noteType: Joi.string().optional().allow(null, ""),
  ...pureSchema,
};

const refConstructionInfo = {
  "PDHSXDT1": Joi.number().optional().default(1),
  "PDHSXDH2": Joi.number().optional().default(2),
  "PDHSXDL3": Joi.number().optional().default(0.65),
  "PDHSCDST4": Joi.number().optional().default(0.5),
  "PDHSXDM5": Joi.number().optional().default(0.5),
  "PDHSXDM6": Joi.number().optional().default(0.5),
  "PDHSXDCSV7": Joi.number().optional().default(0.05),
  "PDHSDP8": Joi.number().optional().default(0.03),
  "PDTGSCTN9": Joi.number().optional().default(10),
  "PDTGSCH10": Joi.number().optional().default(10),
  "PDTGSCL11": Joi.number().optional().default(10),
  "PDTGSCST12": Joi.number().optional().default(5),
  "PDTGSCM13": Joi.number().optional().default(5),
  "PDTGTDSC14": Joi.number().optional().default(5),
  "PDTGBGSC15": Joi.number().optional().default(5),
  "PDTGXDTN16": Joi.number().optional().default(18),
  "PDTGXDH17": Joi.number().optional().default(20),
  "PDTGXDL18": Joi.number().optional().default(11.7),
  "PDTGXDM19": Joi.number().optional().default(9),
  "PDTGXDM20": Joi.number().optional().default(17),
  "PDTGBGXM21": Joi.number().optional().default(30),
  "PDTGTDCBMB22": Joi.number().optional().default(8),
  "PDTGXDST23": Joi.number().optional().default(9),
};

const changeablePlanItem = {
  index: Joi.number().optional().allow(null),
  name: Joi.string().optional().allow(null, ""),
  description: Joi.string().optional().allow(null, ""),
  planTypeId: Joi.number().optional().allow(null),
  constructionTypeId: Joi.number().optional().allow(null),
  investmentTime: Joi.number().optional().allow(null),
  price: Joi.number().optional().allow(null),
  refConstructionInfo: Joi.object(refConstructionInfo).optional().allow(null),
};

const landGeneral = {
  "PDTGDT5": Joi.number().optional().allow(null),
  "PDCPXD6": Joi.number().optional().allow(null),
  "PDCPXDK7": Joi.number().optional().allow(null),
  "PDCPHT8": Joi.number().optional().allow(null),
};

const landUseRights = {
  "PDNT12": Joi.number().optional().allow(null),
  "PDNS13": Joi.number().optional().allow(null),
  "PDCD114": Joi.number().optional().allow(null),
  "PDCD215": Joi.number().optional().allow(null),
  "PDDTCN16": Joi.number().optional().allow(null),
  "PDDTKCN17": Joi.number().optional().allow(null),
  "PDDTCNBQH18": Joi.number().optional().allow(null),
  "PDDTCNKBQH19": Joi.number().optional().allow(null),
  "PDDTKV20": Joi.number().optional().allow(null),
};

const construction = {
  "PDDTXD22": Joi.number().optional().allow(null),
  "PDTN23": Joi.number().optional().allow(null),
  "PDH24": Joi.number().optional().allow(null),
  "PDL25": Joi.number().optional().allow(null),
  "PDST26": Joi.number().optional().allow(null),
  "PDKC27": Joi.string().optional().allow(null),
  "PDDTSUT28": Joi.number().optional().allow(null),
  "PDCPXDTBCT28": Joi.number().optional().allow(null),
  "PDTCPXDPA28": Joi.number().optional().allow(null),
  "repair": Joi.object(
    {
      "PDCPSC30": Joi.number().optional().allow(null),
      "PDDGSC31": Joi.number().optional().allow(null),
      "PDDTXDCCTSC32": Joi.number().optional().allow(null),
      "PDDTCTSC33": Joi.number().optional().allow(null),
      "PDDTSSC34": Joi.number().optional().allow(null),
      "PDTNSC35": Joi.number().optional().allow(null),
      "PDHSC35": Joi.number().optional().allow(null),
      "PDLSC35": Joi.number().optional().allow(null),
      "PDSTSC35": Joi.number().optional().allow(null),
      "PDMSC35": Joi.number().optional().allow(null),
      "PDCSVSC36": Joi.number().optional().allow(null),
    }
  ).label("RepairSchema"),
  "newConstruction": Joi.object(
    {
      "PDCPXM38": Joi.number().optional().allow(null),
      "PDDGXM38": Joi.number().optional().allow(null),
      "PDDTXDCTXM38": Joi.number().optional().allow(null),
      "PDDTCTXM38": Joi.number().optional().allow(null),
      "PDDTSXM38": Joi.number().optional().allow(null),
      "PDTNXM39": Joi.number().optional().allow(null),
      "PDHXM40": Joi.number().optional().allow(null),
      "PDLXM41": Joi.number().optional().allow(null),
      "PDSTXM42": Joi.number().optional().allow(null),
      "PDMXM42": Joi.number().optional().allow(null),
      "PDBCXM42": Joi.number().optional().allow(null),
      "PDDTBCXM42": Joi.number().optional().allow(null),
      "PDCSVXM42": Joi.number().optional().allow(null),
      "PDTCMC43": Joi.number().optional().allow(null),
    }
  ).label("NewConstructionSchema"),
  "otherExpenses": Joi.object({
    "PDCPXDK65": Joi.number().optional().allow(null),
    "PDPD46": Joi.number().optional().allow(null),
    "PDDC47": Joi.number().optional().allow(null),
    "PDSHGC48": Joi.number().optional().allow(null),
    "PDDT49": Joi.number().optional().allow(null),
    "PDTM50": Joi.number().optional().allow(null),
    "PDNT51": Joi.number().optional().allow(null),
    "PDTT52": Joi.number().optional().allow(null),
    others: Joi.array().items({
      label: Joi.string().optional().allow(null),
      value: Joi.number().optional().allow(null),
    })
  }).label("OtherExpensesSchema"),
};

const time = {
  "PDTGDT86": Joi.number().optional().allow(null),
  "PDTGDT87": Joi.number().optional().allow(null),
  "PDTTGTHDA88": Joi.number().optional().allow(null),
  "PDTGCDCCM76": Joi.number().optional().allow(null),
  "PDTGSTM76": Joi.number().optional().allow(null),
  "PDTTGXD80": Joi.number().optional().allow(null),
  "PDTGXGPXD77": Joi.number().optional().allow(null),
  "PDTGSC78": Joi.number().optional().allow(null),
  "PDTGXM79": Joi.number().optional().allow(null),
  "PDTGXD79": Joi.number().optional().allow(null),
  "PDTGHC81": Joi.number().optional().allow(null),
  "PDTGBH82": Joi.number().optional().allow(null),
  "PDTGCDCCB83": Joi.number().optional().allow(null),
  "PDTGTHCC84": Joi.number().optional().allow(null),
  "PDTGSTB85": Joi.number().optional().allow(null),
  "PDTGPSK85": Joi.number().optional().allow(null),
};

const changeablePlanLand = {
  index: Joi.number().optional().allow(null),
  address: Joi.string().optional().allow(null, ""),
  description: Joi.string().optional().allow(null, ""),
  planTypeId: Joi.number().optional().allow(null),
  constructionType: Joi.string().optional().allow(null).valid(...Object.values(ConstructionType)),
  general: Joi.object(landGeneral).allow(null).label("PlanLandGeneralSchema"),
  attachments: Joi.array().items(fileSchema).allow(null).label("PlanLandAttachmentsSchema"),
  landUseRights: Joi.object(landUseRights).allow(null).label("PlanLandUseRightsSchema"),
  construction: Joi.object(construction).allow(null).label("PlanLandConstructionSchema"),
  time: Joi.object(time).allow(null).label("PlanLandTimeSchema"),
};

export const addingInvestmentPlanSchema = Joi.object().keys({
  ...changeableSchema,
  planItems: Joi.array().items({
    ...changeablePlanItem,
    lands: Joi.array().items(changeablePlanLand).label("AddingInvestmentPlanLandSchema")
  }).label("AddingInvestmentPlanItemSchema"),
}).label("AddingInvestmentPlanSchema");

export const updatingInvestmentPlanSchema = Joi.object().keys({
  ...changeableSchema,
  planItems: Joi.array().items({
    id: Joi.number().optional().allow(null),
    ...changeablePlanItem,
    lands: Joi.array().items({
      id: Joi.number().optional().allow(null),
      ...changeablePlanLand,
    }).label("UpdatingInvestmentPlanLandSchema")
  }).label("UpdatingInvestmentPlanItemSchema"),
}).label("UpdatingInvestmentPlanSchema");

export const investmentPlanSchema = Joi.object().keys({
  ...changeableSchema,
  ...noteSchema,
  ...noteRelationAddressSchema,
  status: Joi.string().required().valid(...Object.values(InvestmentPlanStatus)),
  appraisalStatement: appraisalStatementSchema.allow(null),
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
    }).label("InvestmentPlanLandSchema"),
  }).label("InvestmentPlanItemSchema"),
});

export const investmentPlanSchemas = Joi.object().keys({
  items: Joi.array().items(investmentPlanSchema),
  total: Joi.number(),
}).label("InvestmentPlanSchemas");


export const queryInvestmentPlanSchema = Joi.object().keys({
  ...pagingQuerySchema,
  ...noteQuerySchema,
}).label("QueryInvestmentPlanSchema");
