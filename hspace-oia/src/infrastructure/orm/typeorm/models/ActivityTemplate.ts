import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart, BaseTemplate } from "./Base";

export const ActivityGroup = {
  BDS: "Bất động sản",
  KH: "Khảo sát hiện trạng",
  KU: "Khảo sát ước tính",
  TH: "Thẩm định hiện trạng",
  TU: "Thẩm định ước tính",
  PD: "Phương án đầu tư",
  HD: "Hiệu quả đầu tư",
  TL: "Thương lượng dự án",
  DH: "Đề xuất hiệu quả đầu tư",
} as const;

export interface IActivityTemplate {
  id: number;
  updatedAt: Date;
  createdAt: Date;
  raw: string;
  group: string;
  action: string;
  description: string;
  isActive: boolean;
}


export const ActivityTemplate = new EntitySchema<IActivityTemplate>({
  name: "activity_template",
  tableName: "activity_templates",
  columns: {
    ...BaseColumnSchemaPart,
    ...BaseTemplate,
  },
  uniques: [
    {
      name: "UNIQUE_ACTIVITY_TEMPLATE_ACTION",
      columns: [
        "action",
      ]
    }
  ],
});