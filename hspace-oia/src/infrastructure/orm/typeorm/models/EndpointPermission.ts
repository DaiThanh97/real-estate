import { IAccount } from "./Account";
import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, ActiveStatusColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IResource } from "./Resource";

export const EndpointMethod = {
  GET: "GET",
};


export interface IEndpointPermission {
  id: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  resourceId: number;
  resource: IResource;
  api: string;
  method: string;
}

export const EndpointPermission = new EntitySchema<IEndpointPermission>({
  name: "endpoint_permission",
  tableName: "endpoint_permissions",
  columns: {
    ...BaseColumnSchemaPart,
    ...ActiveStatusColumnSchemaPart,
    resourceId: {
      type: Number,
      name: "resource_id",
      nullable: false,
    },
    api: {
      type: String,
      name: "api",
      nullable: false,
    },
    method: {
      type: String,
      name: "method",
      nullable: false,
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    resource: {
      type: "many-to-one",
      target: "resource",
      inverseSide: "features",
      joinColumn: { name: "resource_id", referencedColumnName: "id" },
    },
  }
});
