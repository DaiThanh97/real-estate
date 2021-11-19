import { IAccount } from "./Account";
import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IProperty } from "./Property";

export interface IPropertySale {
  id: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  price: number;
  date: Date;
  sellerId: number;
  seller: IAccount;
  saleSourceId: number;
  saleSource: IAccount;
  propertyId: number;
  property: IProperty;
}

export const PropertySale = new EntitySchema<IPropertySale>({
  name: "property_sale",
  tableName: "property_sales",
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
    sellerId: {
      name: "seller_id",
      type: Number,
      nullable: true,
    },
    saleSourceId: {
      name: "sale_source_id",
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
    seller: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "seller_id", referencedColumnName: "id" }
    },
    saleSource: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "sale_source_id", referencedColumnName: "id" }
    },
    property: {
      type: "many-to-one",
      target: "property",
      joinColumn: { name: "property_id", referencedColumnName: "id" }
    }
  }
});
