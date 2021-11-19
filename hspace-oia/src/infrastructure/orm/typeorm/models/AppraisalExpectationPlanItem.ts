import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart, BaseColumnSourceNote } from "./Base";
import { IMasterValue } from "./MasterValue";
import { IAppraisalExpectation } from "./AppraisalExpectation";
import { IAppraisalExpectationPlanLand } from "./AppraisalExpectationPlanLand";
import { IInvestmentPlanItem } from "./InvestmentPlanItem";

export interface IAppraisalExpectationPlanItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  sourceId: number;
  source: IInvestmentPlanItem;

  appraisalExpectationId: number;
  appraisalExpectation: IAppraisalExpectation;

  index: number;
  name: string;
  planTypeId: number;
  planType: IMasterValue;
  constructionTypeId: number;
  constructionType: IMasterValue;
  description: string;
  price: number;
  investmentTime: number;
  investmentAt: Date;

  lands: IAppraisalExpectationPlanLand[];
}

export const AppraisalExpectationPlanItem = new EntitySchema<IAppraisalExpectationPlanItem>({
  name: "appraisal_expectation_plan_item",
  tableName: "appraisal_expectation_plan_items",
  columns: {
    ...BaseColumnSchemaPart,
    ...BaseColumnSourceNote,
    appraisalExpectationId: {
      name: "appraisal_expectation_id",
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
    price: {
      name: "price",
      type: "float",
      nullable: true
    },
  },
  relations: {
    source: {
      type: "many-to-one",
      target: "investment_plan_item",
      joinColumn: { name: "source_id", referencedColumnName: "id" },
    },
    appraisalExpectation: {
      type: "many-to-one",
      target: "appraisal_expectation",
      inverseSide: "planItems",
      joinColumn: { name: "appraisal_expectation_id", referencedColumnName: "id" },
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
      target: "appraisal_expectation_plan_land",
      inverseSide: "planItem",
      cascade: true,
      eager: true,
      joinColumn: { referencedColumnName: "plan_item_id" },
    },
  },
});
