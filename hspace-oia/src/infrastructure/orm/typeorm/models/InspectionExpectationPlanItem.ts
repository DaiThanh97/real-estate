import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart, BaseColumnSourceNote  } from "./Base";
import { IMasterValue } from "./MasterValue";
import { IInspectionExpectation } from "./InspectionExpectation";
import { IInspectionExpectationPlanLand } from "./InspectionExpectationPlanLand";
import { IInvestmentPlanItem } from "./InvestmentPlanItem";

export interface IInspectionExpectationPlanItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  inspectionExpectationId: number;
  inspectionExpectation: IInspectionExpectation;

  sourceId: number;
  source: IInvestmentPlanItem;

  index: number;
  name: string;
  planTypeId: number;
  planType: IMasterValue;
  constructionTypeId: number;
  constructionType: IMasterValue;
  description: string;
  investmentTime: number;
  investmentAt: Date;

  totalAdjustment: number;
  lands: IInspectionExpectationPlanLand[];

}

export const InspectionExpectationPlanItem = new EntitySchema<IInspectionExpectationPlanItem>({
  name: "inspection_expectation_plan_item",
  tableName: "inspection_expectation_plan_items",
  columns: {
    ...BaseColumnSchemaPart,
    ...BaseColumnSourceNote,
    inspectionExpectationId: {
      name: "inspection_expectation_id",
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
      nullable: true,
    },
    planTypeId: {
      name: "plan_type_id",
      type: Number,
      nullable: true
    },
    constructionTypeId: {
      name: "construction_type_id",
      type: Number,
      nullable: true,
    },
    description: {
      name: "description",
      type: String,
      nullable: true
    },
    investmentTime: {
      name: "investment_time",
      type: "float",
      nullable: true
    },
    investmentAt: {
      name: "investment_at",
      type: Date,
      nullable: true
    },
    totalAdjustment: {
      name: "total_adjustment",
      type: "float",
      nullable: true,
    },
  },
  relations: {
    source: {
      type: "many-to-one",
      target: "investment_plan_item",
      joinColumn: { name: "source_id", referencedColumnName: "id" },
    },
    inspectionExpectation: {
      type: "many-to-one",
      target: "inspection_expectation",
      inverseSide: "planItems",
      joinColumn: { name: "inspection_expectation_id", referencedColumnName: "id" },
      nullable: true,
      onDelete: "CASCADE"
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
      target: "inspection_expectation_plan_land",
      inverseSide: "planItem",
      cascade: true,
      eager: true,
      joinColumn: { referencedColumnName: "plan_item_id" },
    },
  },
});
