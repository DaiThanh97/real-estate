import { ObjectLiteral } from "typeorm";

export interface IBaseEntity extends ObjectLiteral {
  id: string | number;
  updatedAt: Date;
  createdAt: Date;
}
