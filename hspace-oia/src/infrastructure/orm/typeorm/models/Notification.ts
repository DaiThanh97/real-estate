import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { IProperty } from "./Property";

export const NotificationGroup = {
  BDS: "Bất động sản",
  KH: "Khảo sát hiện trạng",
  KU: "Khảo sát ước tính",
  TH: "Thẩm định hiện trạng",
  TU: "Thẩm định ước tính",
  PD: "Phương án đầu tư",
  HD: "Hiệu quả đầu tư",
  TL: "Thương lượng dự án",
  DH: "Đề xuất hiệu quả đầu tư",
};


export interface INotification {
  id: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  propertyId: number;
  group: string;
  refId: number;
  action: string;
  content: string;
  url: string;
  property: IProperty;
  refCode: string;
  isActive: boolean;
  data: string;
  streetNumber: string;
  street: string;
  ward: string;
  district: string;
}

export const Notification = new EntitySchema<INotification>({
  name: "notification",
  tableName: "notifications",
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
    url: {
      type: String,
      name: "url",
      nullable: true,
    },
    action: {
      type: "varchar",
      length: 128,
      nullable: true,
      name: "action",
    },
    isActive: {
      name: "is_active",
      type: Boolean,
      default: true,
      nullable: false,
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
