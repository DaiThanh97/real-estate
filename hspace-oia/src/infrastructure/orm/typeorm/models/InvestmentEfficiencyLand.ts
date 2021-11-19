import { IInvestmentEfficiencyPlanItem } from "./InvestmentEfficiencyPlanItem";
import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "./Base";


export interface IInvestmentEfficiencyLand {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  planItemId: number;
  planItem: IInvestmentEfficiencyPlanItem;
  index: number;
  investmentCosts: string;
  purchasePriceAnalysis: string;
}

export const InvestmentEfficiencyLand = new EntitySchema<IInvestmentEfficiencyLand>({
  name: "investment_efficiency_land",
  tableName: "investment_efficiency_lands",
  columns: {
    ...BaseColumnSchemaPart,
    index: {
      name: "index",
      type: Number,
      nullable: true,
    },
    planItemId: {
      type: Number,
      name: "plan_item_id",
      nullable: true,
    },
    investmentCosts: {
      name: "investment_costs",
      type: "jsonb",
      nullable: true,
    },
    purchasePriceAnalysis: {
      name: "purchase_price_analysis",
      type: "jsonb",
      nullable: true,
    }
  },
  relations: {
    planItem: {
      type: "many-to-one",
      target: "investment_efficiency_plan_item",
      joinColumn: { name: "plan_item_id", referencedColumnName: "id" },
      inverseSide: "lands",
      nullable: true,
      onDelete: "CASCADE"
    },
  }
});
