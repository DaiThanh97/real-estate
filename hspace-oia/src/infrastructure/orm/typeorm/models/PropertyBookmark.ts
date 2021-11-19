import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart, ActiveStatusColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { IProperty } from "./Property";

export interface IPropertyBookmark {
  propertyId: number,
  bookmarkerId: number,
  bookmarkDate: Date;
  type: string;

  property: IProperty,
  bookmarker: IAccount,
  
  isActive: boolean,
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
}

export const PropertyBookmark = new EntitySchema<IPropertyBookmark>({
  name: "property_bookmark",
  tableName: "property_bookmarks",
  columns: {
    ...BaseColumnSchemaPart,
    ...ActiveStatusColumnSchemaPart,
    propertyId: {
      type: Number,
      name: "property_id",
      nullable: false,
    },
    bookmarkerId: {
      type: Number,
      name: "bookmarker_id",
      nullable: true,
    },
    bookmarkDate: {
      type: Date,
      name: "bookmark_date",
      nullable: true,
    },
    type: {
      type: String,
      name: "type",
      nullable: false,
      default: "A",
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    property: {
      type: "many-to-one",
      target: "property",
      joinColumn: {name: "property_id", referencedColumnName: "id"}
    },
    bookmarker: {
      type: "many-to-one",
      target: "account",
      joinColumn: {name: "bookmarker_id", referencedColumnName: "id"}
    },
  },
});
