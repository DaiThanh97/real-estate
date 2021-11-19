import { ObjectLiteral } from "typeorm";
import { AccountEntity } from "./AccountEntity";

export interface IBaseAssigned extends ObjectLiteral {
  createdBy: AccountEntity;
  updatedBy: AccountEntity;
}
