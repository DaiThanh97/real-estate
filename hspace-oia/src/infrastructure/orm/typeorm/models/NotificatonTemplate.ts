import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart, BaseTemplate } from "./Base";

export interface INotificationTemplate {
  id: number;
  updatedAt: Date;
  createdAt: Date;
  raw: string;
  group: string;
  action: string;
  description: string;
  isActive: boolean;
}


export const NotificationTemplate = new EntitySchema<INotificationTemplate>({
  name: "notification_template",
  tableName: "notification_templates",
  columns: {
    ...BaseColumnSchemaPart,
    ...BaseTemplate,
  },
  uniques: [
    {
      name: "UNIQUE_NOTIFICATION_TEMPLATE_ACTION",
      columns: [
        "action",
      ]
    }
  ],
});
