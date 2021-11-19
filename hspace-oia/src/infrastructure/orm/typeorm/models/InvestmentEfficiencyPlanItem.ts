import { IMasterValue } from "./MasterValue";
import { IInvestmentEfficiency } from "./InvestmentEfficiency";
import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart, BaseColumnSourceNote } from "./Base";
import { IInvestmentEfficiencyLand } from "./InvestmentEfficiencyLand";
import { IInvestmentPlanItem } from "./InvestmentPlanItem";

export interface IInvestmentEfficiencyPlanItem {
  id: number;
  createdAt: Date;
  investmentEfficiencyId: number;
  investmentEfficiency: IInvestmentEfficiency;
  index: number;
  name: string;
  planTypeId: number;
  planType: IMasterValue;
  constructionTypeId: number;
  constructionType: IMasterValue;
  description: string;
  price: number;
  investmentTime: number;
  lands: IInvestmentEfficiencyLand[];
  isApproved: boolean;
  investmentCostTotal: string;
  purchasePriceAnalysisTotal: string;

  sourceId: number;
  source: IInvestmentPlanItem;

  refInvestmentEfficiencyInfo: string;
}

export const InvestmentEfficiencyPlanItem = new EntitySchema<IInvestmentEfficiencyPlanItem>({
  name: "investment_efficiency_plan_item",
  tableName: "investment_efficiency_plan_items",
  columns: {
    ...BaseColumnSchemaPart,
    ...BaseColumnSourceNote,
    investmentEfficiencyId: {
      name: "investment_efficiency_id",
      type: Number,
      nullable: true,
    },
    index: {
      name: "index",
      type: Number,
      nullable: true,
    },
    name: {
      name: "name",
      type: String,
      default: "",
    },
    planTypeId: {
      name: "plan_type_id",
      type: Number,
      nullable: true,
    },
    constructionTypeId: {
      name: "construction_type_id",
      type: Number,
      nullable: true,
    },
    description: {
      name: "description",
      type: String,
      default: "",
    },
    price: {
      name: "price",
      type: "float",
      nullable: true,
    },
    investmentTime: {
      name: "investment_time",
      type: "float",
      nullable: true,
    },
    isApproved: {
      name: "is_approved",
      type: "bool",
      default: false,
    },
    investmentCostTotal: {
      name: "investment_cost_total",
      type: "jsonb",
      nullable: true,
    },
    purchasePriceAnalysisTotal: {
      name: "purchase_price_analysis_total",
      type: "jsonb",
      nullable: true,
    },
    refInvestmentEfficiencyInfo: {
      name: "ref_investment_efficiency_info",
      type: "jsonb",
      nullable: true,
    }
  },
  relations: {
    source: {
      type: "many-to-one",
      target: "investment_plan_item",
      joinColumn: { name: "source_id", referencedColumnName: "id" },
    },
    investmentEfficiency: {
      type: "many-to-one",
      target: "investment_efficiency",
      joinColumn: { name: "investment_efficiency_id", referencedColumnName: "id" },
      inverseSide: "planItems",
      nullable: true,
      onDelete: "CASCADE",
    },
    planType: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "plan_type_id", referencedColumnName: "id" },
    },
    constructionType: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "construction_type_id", referencedColumnName: "id" },
    },
    lands: {
      type: "one-to-many",
      target: "investment_efficiency_land",
      inverseSide: "planItem",
      cascade: true,
      eager: true,
      joinColumn: { referencedColumnName: "plan_item_id" },
    }
  }
});
