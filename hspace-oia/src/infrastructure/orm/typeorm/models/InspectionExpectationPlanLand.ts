import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart, ActiveStatusColumnSchemaPart, AccountLogColumnSchemaPart } from "./Base";
import { IMasterValue } from "./MasterValue";
import { IInspectionExpectationPlanItem } from "./InspectionExpectationPlanItem";
import { InspectionExpectationLevel } from "./InspectionExpectationLevel";

export interface IInspectionExpectationPlanLand {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  planItemId: number;
  planItem: IInspectionExpectationPlanItem;
  index: number;

  address: string;
  streetNumber: string;
  cityId: number;
  wardId: number;
  districtId: number;
  streetId: number;
  streetGroupId: number;
  positionGroupId: number;

  city: IMasterValue;
  ward: IMasterValue;
  district: IMasterValue;
  street: IMasterValue;
  streetGroup: IMasterValue;
  positionGroup: IMasterValue;
  locationDescription: string;

  landUseRights: string;
  construction: string;

  totalAdvantageLevel: number;
  totalDisadvantageLevel: number;
  advantageLevels: InspectionExpectationLevel[];
  disadvantageLevels: InspectionExpectationLevel[];

  totalAdjustment: number;
}

export const InspectionExpectationPlanLand = new EntitySchema<IInspectionExpectationPlanLand>({
  name: "inspection_expectation_plan_land",
  tableName: "inspection_expectation_plan_lands",
  columns: {
    ...BaseColumnSchemaPart,
    ...ActiveStatusColumnSchemaPart,
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
    streetNumber: {
      name: "street_number",
      type: String,
      length: 64,
      nullable: true
    },
    cityId: {
      name: "city_id",
      type: Number,
      nullable: true
    },
    wardId: {
      name: "ward_id",
      type: Number,
      nullable: true
    },
    districtId: {
      name: "district_id",
      type: Number,
      nullable: true
    },
    streetId: {
      name: "street_id",
      type: Number,
      nullable: true
    },
    streetGroupId: {
      name: "street_group_id",
      type: Number,
      nullable: true
    },
    positionGroupId: {
      name: "position_group_id",
      type: Number,
      nullable: true,
    },
    address: {
      name: "address",
      type: String,
      default: "",
    },
    locationDescription: {
      name: "location_description",
      type: String,
      default: "",
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
    totalAdvantageLevel: {
      name: "total_advantage_level",
      type: "float",
      nullable: true,
    },
    totalDisadvantageLevel: {
      name: "total_disadvantage_level",
      type: "float",
      nullable: true,
    },
    totalAdjustment: {
      name: "total_adjustment",
      type: "float",
      nullable: true,
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    planItem: {
      type: "many-to-one",
      target: "inspection_expectation_plan_item",
      inverseSide: "plans",
      joinColumn: { name: "plan_item_id", referencedColumnName: "id" },
      nullable: true,
      onDelete: "CASCADE"
    },
    city: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "city_id", referencedColumnName: "id" },
    },
    ward: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "ward_id", referencedColumnName: "id" },
    },
    district: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "district_id", referencedColumnName: "id" },
    },
    street: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "street_id", referencedColumnName: "id" },
    },
    streetGroup: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "street_group_id", referencedColumnName: "id" },
    },
    positionGroup: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "position_group_id", referencedColumnName: "id" },
    },
    advantageLevels: {
      type: "one-to-many",
      target: "inspection_expectation_advantage_level",
      inverseSide: "planLand",
      cascade: true,
      eager: true,
      joinColumn: { referencedColumnName: "plan_land_id" },
    },
    disadvantageLevels: {
      type: "one-to-many",
      target: "inspection_expectation_disadvantage_level",
      inverseSide: "planLand",
      cascade: true,
      eager: true,
      joinColumn: { referencedColumnName: "plan_land_id" },
    }
  },
});
