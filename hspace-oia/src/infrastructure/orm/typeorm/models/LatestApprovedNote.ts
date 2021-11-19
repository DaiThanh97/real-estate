import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { IProperty } from "./Property";

export const NoteType = {
  KH: "KH",
  TH: "TH",
  HD: "HD",
} as const;

export interface ILatestApprovedNote {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  refId: number;
  type: string;
  propertyId: number;
  property: IProperty;
}

export const LatestApprovedNote = new EntitySchema<ILatestApprovedNote>({
  name: "latest_approved_note",
  tableName: "latest_approved_notes",
  columns: {
    ...BaseColumnSchemaPart,
    refId: {
      type: Number,
      nullable: false,
      name: "ref_id",
    },
    type: {
      type: "varchar",
      length: 20,
      nullable: false,
      name: "type",
    },
    propertyId: {
      type: Number,
      nullable: false,
      name: "property_id",
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    property: {
      type: "many-to-one",
      target: "property",
      joinColumn: { name: "property_id", referencedColumnName: "id" }
    }
  }
});
