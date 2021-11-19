import { IInvestmentPlanItem } from "./InvestmentPlanItem";
import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "./Base";
import { IMasterValue } from "./MasterValue";

export const ConstructionType = {
  None: "Không",
  Repair: "Sửa chữa",
  NewConstruction: "Xây mới",
  RepairAndBuild: "Sửa và xây"
} as const;

export interface IInvestmentPlanLand {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  planItemId: number;
  planItem: IInvestmentPlanItem;

  index: number;
  address: string;
  description: string;
  planTypeId: number;
  constructionType: string;
  planType: IMasterValue;
  general: string;
  attachments: {
    url: string,
    key: string,
    mimeType: string,
    size: string,
    fileName: string
  }[],
  landUseRights: string;
  construction: string;
  time: string;
}


export const InvestmentPlanLand = new EntitySchema<IInvestmentPlanLand>({
  name: "investment_plan_land",
  tableName: "investment_plan_lands",
  columns: {
    ...BaseColumnSchemaPart,
    index: {
      name: "index",
      type: Number,
      nullable: true,
    },
    address: {
      name: "address",
      type: String,
      default: "",
    },
    description: {
      name: "description",
      type: String,
      default: "",
    },
    planTypeId: {
      name: "plan_type_id",
      type: Number,
      nullable: true,
    },
    constructionType: {
      name: "construction_type",
      type: String,
      nullable: true,
    },
    general: {
      type: "jsonb",
      name: "general",
      nullable: true,
    },
    attachments: {
      type: "jsonb",
      name: "attachments",
      nullable: true
    },
    landUseRights: {
      type: "jsonb",
      name: "land_use_rights",
      nullable: true,
    },
    construction: {
      type: "jsonb",
      name: "construction",
      nullable: true,
    },
    time: {
      type: "jsonb",
      name: "time",
      nullable: true,
    },
    planItemId: {
      type: Number,
      name: "plan_item_id",
      nullable: true,
    }
  },
  relations: {
    planItem: {
      type: "many-to-one",
      target: "investment_plan_item",
      joinColumn: { name: "plan_item_id", referencedColumnName: "id" },
      inverseSide: "lands",
      nullable: true,
      onDelete: "CASCADE"
    },
    planType: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "plan_type_id", referencedColumnName: "id" },
    },
  }
});
