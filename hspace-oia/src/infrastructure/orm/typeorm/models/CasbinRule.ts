import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "./Base";


export interface ICasbinRule {
  id: number;
  pType: string;
  v0: string;
  v1: string;
  v2: string;
  v3: string;
  v4: string;
  v5: string;
}

export const CasbinRule = new EntitySchema<ICasbinRule>({
  name: "casbin_rule",
  tableName: "casbin_rule",
  columns: {
    ...BaseColumnSchemaPart,
    pType: {
      name: "ptype",
      type: String,
      default: "",
    },
    v0: {
      name: "v0",
      type: String,
      default: "",
    },
    v1: {
      name: "v1",
      type: String,
      default: "",
    },
    v2: {
      name: "v2",
      type: String,
      default: "",
    },
    v3: {
      name: "v3",
      type: String,
      default: "",
    },
    v4: {
      name: "v4",
      type: String,
      default: "",
    },
    v5: {
      name: "v5",
      type: String,
      default: "",
    },
  }
});
