import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "./Base";
import { IInvestmentPlan } from "./InvestmentPlan";
import { IMasterValue } from "./MasterValue";
import { IInvestmentPlanLand } from "./InvestmentPlanLand";

export interface IInvestmentPlanItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  investmentPlanId: number;
  investmentPlan: IInvestmentPlan;
  index: number;
  name: string;
  planTypeId: number;
  planType: IMasterValue;

  constructionTypeId: number;
  constructionType: IMasterValue;

  description: string;
  price: number;
  investmentTime: number;
  lands: IInvestmentPlanLand[];
  refConstructionInfo: string;
}

export const InvestmentPlanItem = new EntitySchema<IInvestmentPlanItem>({
  name: "investment_plan_item",
  tableName: "investment_plan_items",
  columns: {
    ...BaseColumnSchemaPart,
    investmentPlanId: {
      name: "investment_plan_id",
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
    refConstructionInfo: {
      name: "ref_construction_info",
      type: "jsonb",
      nullable: true,
    }
  },
  relations: {
    investmentPlan: {
      type: "many-to-one",
      target: "investment_plan",
      joinColumn: { name: "investment_plan_id", referencedColumnName: "id" },
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
      target: "investment_plan_land",
      inverseSide: "planItem",
      cascade: true,
      eager: true,
      joinColumn: { referencedColumnName: "plan_item_id" },
    }
  },
});
