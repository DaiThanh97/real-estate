import { IAccount } from "./Account";
import { IProperty } from "./Property";
import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";

export interface IAccountActivity {
  id: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  propertyId: number;
  property: IProperty;
  data: string;
  group: string;
  refId: number;
  refCode: string;
  action: string;
  content: string;
  quote: string;
}

export const AccountActivity = new EntitySchema<IAccountActivity>({
  name: "account_activity",
  tableName: "account_activities",
  columns: {
    ...BaseColumnSchemaPart,
    propertyId: {
      name: "property_id",
      type: Number,
      nullable: true,
    },
    group: {
      type: "varchar",
      length: 128,
      nullable: true,
      name: "group",
    },
    refId: {
      name: "ref_id",
      type: Number,
      nullable: true,
    },
    refCode: {
      name: "ref_code",
      type: String,
      nullable: true,
    },
    content: {
      type: String,
      name: "content",
      nullable: true,
    },
    quote: {
      type: String,
      name: "quote",
      nullable: true,
    },
    action: {
      type: "varchar",
      length: 128,
      nullable: true,
      name: "action",
    },
    data: {
      name: "data",
      type: "jsonb",
      nullable: true,
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    property: {
      type: "many-to-one",
      target: "property",
      joinColumn: { name: "property_id", referencedColumnName: "id" },
    }
  }
});
