import { AccountLogColumnSchemaPart, ActiveStatusColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { EntitySchema } from "typeorm";
import { IFeature } from "./Feature";


export interface IResource {
  id: number;
  createdAt: Date,
  updatedAt: Date,
  path: string,
  name: string,
  description: string,
  features: IFeature[],
  isActive: boolean,
  model: string;
  group: string;
  api: string;
  seq: number;
}

export const Resource = new EntitySchema<IResource>({
  name: "resource",
  tableName: "resources",
  columns: {
    ...BaseColumnSchemaPart,
    ...ActiveStatusColumnSchemaPart,
    path: {
      type: String,
      name: "path",
      nullable: false,
    },
    name: {
      type: String,
      name: "name",
      nullable: false,
    },
    description: {
      type: String,
      name: "description",
      nullable: true,
      default: "",
    },
    model: {
      type: String,
      name: "model",
      nullable: true,
    },
    group: {
      type: String,
      name: "group",
      nullable: true,
    },
    api: {
      type: String,
      name: "api",
      nullable: true,
    },
    seq: {
      type: "int",
      name: "seq",
      nullable: true,
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    features: {
      type: "one-to-many",
      target: "feature",
      inverseSide: "resource",
      cascade: true,
      joinTable: true,
    }
  }
});
