import { IMasterValue } from "./MasterValue";
import { IProjectNegotiation } from "./ProjectNegotiation";
import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart, AccountLogColumnSchemaPart, ActiveStatusColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";

export interface IProjectNegotiationReferItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  isActive: boolean,

  projectNegotiationId: number;
  projectNegotiation: IProjectNegotiation;
  negotiationReferId: number;
  negotiationRefer: IMasterValue;
  explain: string;
  referAt: Date;
  referSourceId: number;
  referSource: IAccount;
}

export const ProjectNegotiationReferItem = new EntitySchema<IProjectNegotiationReferItem>({
  name: "project_negotiation_refer_item",
  tableName: "project_negotiation_refer_items",
  columns: {
    ...BaseColumnSchemaPart,
    ...ActiveStatusColumnSchemaPart,
    projectNegotiationId: {
      name: "project_negotiation_id",
      type: Number,
      nullable: true,
    },
    negotiationReferId: {
      name: "negotiation_refer_id",
      type: Number,
      nullable: true,
    },
    explain: {
      name: "explain",
      type: String,
      default: "",
    },
    referAt: {
      name: "refer_at",
      type: Date,
      nullable: true,
    },
    referSourceId: {
      name: "refer_source_id",
      type: Number,
      nullable: true,
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    projectNegotiation: {
      type: "many-to-one",
      target: "project_negotiation",
      joinColumn: {name: "project_negotiation_id", referencedColumnName: "id"}
    },
    negotiationRefer: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "negotiation_refer_id", referencedColumnName: "id" },
    },
    referSource: {
      type: "many-to-one",
      target: "account",
      joinColumn: {name: "refer_source_id", referencedColumnName: "id"}
    },
  }
});
