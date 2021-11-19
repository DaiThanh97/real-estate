import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "./Base";
import { IAppraisalExpectationPlanItem } from "./AppraisalExpectationPlanItem";

export interface IAppraisalExpectationPlanLand {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  index: number;
  planItemId: number;
  planItem: IAppraisalExpectationPlanItem;

  expectationInfo: string;
  landUseRights: string;
  construction: string;

}

export const AppraisalExpectationPlanLand = new EntitySchema<IAppraisalExpectationPlanLand>({
  name: "appraisal_expectation_plan_land",
  tableName: "appraisal_expectation_plan_lands",
  columns: {
    ...BaseColumnSchemaPart,
    planItemId: {
      name: "plan_item_id",
      type: Number,
      nullable: true,
    },
    index: {
      name: "index",
      type: Number,
      nullable: true,
    },
    expectationInfo: {
      name: "expectation_info",
      type: "jsonb",
      nullable: true,
    },
    landUseRights: {
      name: "land_use_rights",
      type: "jsonb",
      nullable: true,
    },
    construction: {
      name: "construction",
      type: "jsonb",
      nullable: true,
    },
  },
  relations: {
    planItem: {
      type: "many-to-one",
      target: "appraisal_expectation_plan_item",
      inverseSide: "plans",
      joinColumn: { name: "plan_item_id", referencedColumnName: "id" },
      nullable: true,
      onDelete: "CASCADE"
    },
  },
});
