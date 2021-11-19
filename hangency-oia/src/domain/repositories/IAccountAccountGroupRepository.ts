import { IRepository } from "./IRepository";
import { AccountAccountGroup } from "../models/AccountAccountGroup";

export interface IAccountAccountGroupRepository extends IRepository<AccountAccountGroup> {
  findById(id: string): Promise<AccountAccountGroup | undefined>;
}
