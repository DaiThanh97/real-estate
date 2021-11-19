import { EntitySchema, EntitySchemaColumnOptions, EntitySchemaRelationOptions } from "typeorm";
import { BaseColumnSchemaPart } from "./Base";
import { IInspectionStatement } from "./InspectionStatement";
import { IMasterValue } from "./MasterValue";

export interface InspectionStatementLevel {
  id: number;
  inspectionStatementId: number;
  inspectionStatement: IInspectionStatement;
  groupId: number;
  group: IMasterValue;
  typeId: number;
  type: IMasterValue;
  level: number;
  note: string;
}

export const LevelColumnSchemaPart = {
  inspectionStatementId: {
    type: Number,
    name: "inspection_statement_id",
    nullable: true,
  } as EntitySchemaColumnOptions,
  groupId: {
    type: Number,
    name: "group_id",
    nullable: true,
  } as EntitySchemaColumnOptions,
  typeId: {
    type: Number,
    name: "type_id",
    nullable: true,
  } as EntitySchemaColumnOptions,
  level: {
    type: "float",
    name: "level",
    nullable: true,
  } as EntitySchemaColumnOptions,
  note: {
    type: String,
    name: "note",
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

export const DisadvantageLevel = new EntitySchema<InspectionStatementLevel>({
  name: "disadvantage_level",
  tableName: "disadvantage_levels",
  columns: {
    ...BaseColumnSchemaPart,
    ...LevelColumnSchemaPart,
  },
  relations: {
    inspectionStatement: {
      type: "many-to-one",
      target: "inspection_statement",
      inverseSide: "disadvantageLevels",
      joinColumn: { name: "inspection_statement_id", referencedColumnName: "id" },
      nullable: true,
    },
    ...LevelRelationColumnSchemaPart
  }
});

export const AdvantageLevel = new EntitySchema<InspectionStatementLevel>({
  name: "advantage_level",
  tableName: "advantage_levels",
  columns: {
    ...BaseColumnSchemaPart,
    ...LevelColumnSchemaPart,
  },
  relations: {
    inspectionStatement: {
      type: "many-to-one",
      target: "inspection_statement",
      inverseSide: "advantageLevels",
      joinColumn: { name: "inspection_statement_id", referencedColumnName: "id" },
      nullable: true,
    },
    ...LevelRelationColumnSchemaPart
  }
});
