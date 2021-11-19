import { IProperty } from "./Property";
import { IAccount } from "./Account";
import { EntitySchema } from "typeorm";

export const PropertyProgressType = {
  BDS: "BDS",
  KSHT: "KSHT",
  TDHT: "TDHT",
  PADT: "PADT",
  KSUT: "KSUT",
  TDUT: "TDUT",
  HQDT: "HQDT",
  TLDA: "TLDA"
} as const;

export interface IPropertyProgress {
  id: number;
  createdBy: IAccount;
  createdAt: Date;
  propertyId: number;
  property: IProperty;
  type: string;
}

export const PropertyProgress = new EntitySchema<IPropertyProgress>({
  name: "property_progress",
  tableName: "property_progress",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    createdAt: {
      name: "created_at",
      type: "timestamp without time zone",
      createDate: true,
    },
    propertyId: {
      name: "property_id",
      type: Number,
      nullable: true,
    },
    type: {
      type: "varchar",
      name: "type",
      length: 10,
      nullable: false,
    },
  },
  relations: {
    createdBy: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "created_by" },
    },
    property: {
      type: "many-to-one",
      target: "property",
      joinColumn: { name: "property_id", referencedColumnName: "id" }
    }
  }
});
