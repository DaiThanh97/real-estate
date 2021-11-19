import { IAccount } from "./Account";
import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IProperty } from "./Property";

export interface IPropertyPurchase {
  id: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  price: number;
  date: Date;
  assigneeId: number;
  assignee: IAccount;
  supporterId: number;
  supporter: IAccount;
  propertyId: number;
  property: IProperty;
}

export const PropertyPurchase = new EntitySchema<IPropertyPurchase>({
  name: "property_purchase",
  tableName: "property_purchases",
  columns: {
    ...BaseColumnSchemaPart,
    price: {
      type: "float",
      name: "price",
      default: 0,
    },
    date: {
      name: "date",
      type: "date",
      nullable: false,
    },
    assigneeId: {
      name: "assignee_id",
      type: Number,
      nullable: true,
    },
    supporterId: {
      name: "supporter_id",
      type: Number,
      nullable: true,
    },
    propertyId: {
      name: "property_id",
      type: Number,
      nullable: true,
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    assignee: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "assignee_id", referencedColumnName: "id" }
    },
    supporter: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "supporter_id", referencedColumnName: "id" }
    },
    property: {
      type: "many-to-one",
      target: "property",
      joinColumn: { name: "property_id", referencedColumnName: "id" }
    }
  }
});
