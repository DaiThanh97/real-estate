import { IRepository } from "./IRepository";
import { AccountMenu } from "../models/AccountMenu";

export interface IAccountMenuRepository extends IRepository<AccountMenu> {
  findById(id: string): Promise<AccountMenu | undefined>;
}
