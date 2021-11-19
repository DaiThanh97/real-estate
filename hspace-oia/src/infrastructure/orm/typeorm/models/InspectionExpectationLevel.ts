import { EntitySchema, EntitySchemaColumnOptions, EntitySchemaRelationOptions } from "typeorm";
import { BaseColumnSchemaPart } from "./Base";
import { IInspectionExpectationPlanLand } from "./InspectionExpectationPlanLand";
import { IMasterValue } from "./MasterValue";

export interface InspectionExpectationLevel {
  id: number;

  planLandId: number;
  planLand: IInspectionExpectationPlanLand;
  groupId: number;
  group: IMasterValue;
  typeId: number;
  type: IMasterValue;
  level: number;
  note: string;
}

export const LevelColumnSchemaPart = {
  planLandId: {
    name: "plan_land_id",
    type: Number,
    nullable: true,
  } as EntitySchemaColumnOptions,
  groupId: {
    name: "group_id",
    type: Number,
    nullable: true,
  } as EntitySchemaColumnOptions,
  typeId: {
    name: "type_id",
    type: Number,
    nullable: true,
  } as EntitySchemaColumnOptions,
  level: {
    name: "level",
    type: "float",
    nullable: true,
  } as EntitySchemaColumnOptions,
  note: {
    name: "note",
    type: String,
    default: "",
  } as EntitySchemaColumnOptions,
};

export const LevelRelationColumnSchemaPart = {
  group: {
    type: "many-to-one",
    target: "masterValue",
    joinColumn: { name: "group_id", referencedColumnName: "id" },
  } as EntitySchemaRelationOptions,
  type: {
    type: "many-to-one",
    target: "masterValue",
    joinColumn: { name: "type_id", referencedColumnName: "id" },
  } as EntitySchemaRelationOptions,
};

export const InspectionExpectationDisadvantageLevel = new EntitySchema<InspectionExpectationLevel>({
  name: "inspection_expectation_disadvantage_level",
  tableName: "inspection_expectation_disadvantage_levels",
  columns: {
    ...BaseColumnSchemaPart,
    ...LevelColumnSchemaPart,
  },
  relations: {
    planLand: {
      type: "many-to-one",
      target: "inspection_expectation_plan_land",
      inverseSide: "inspectionExpectationDisadvantageLevels",
      joinColumn: { name: "plan_land_id", referencedColumnName: "id" },
      nullable: true,
      onDelete: "CASCADE"
    },
    ...LevelRelationColumnSchemaPart
  }
});

export const InspectionExpectationAdvantageLevel = new EntitySchema<InspectionExpectationLevel>({
  name: "inspection_expectation_advantage_level",
  tableName: "inspection_expectation_advantage_levels",
  columns: {
    ...BaseColumnSchemaPart,
    ...LevelColumnSchemaPart,
  },
  relations: {
    planLand: {
      type: "many-to-one",
      target: "inspection_expectation_plan_land",
      inverseSide: "inspectionExpectationAdvantageLevels",
      joinColumn: { name: "plan_land_id", referencedColumnName: "id" },
      nullable: true,
      onDelete: "CASCADE"
    },
    ...LevelRelationColumnSchemaPart
  }
});
