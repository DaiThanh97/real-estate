import { EntitySchema } from "typeorm";
import { IAccount } from "./Account";
import { AccountLogColumnSchemaPart, ActiveStatusColumnSchemaPart, BaseColumnSchemaPart } from "./Base";

export interface ISystemConfig {
  id: number;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  name: string;
  data: {
    value: any,
    type: string;
  };
  description: string;
  example: string;
  folder: string;
}

export const SystemConfig = new EntitySchema<ISystemConfig>({
    name: "system_config",
    tableName: "system_config",
    columns: {
      ...BaseColumnSchemaPart,
      ...ActiveStatusColumnSchemaPart,
      name: {
        name: "name",
        type: "varchar",
        length: 64,
        nullable: false,
        unique: true
      },
      data: {
        name: "data",
        nullable: false,
        type: "jsonb",
      },
      description: {
        name: "description",
        nullable: true,
        type: String,
      },
      folder: {
        name: "folder",
        nullable: false,
        type: String,
      },
      example: {
        name: "example",
        nullable: false,
        type: String,
      }
    },
    relations: {
      ...AccountLogColumnSchemaPart,
    }
  }
);
