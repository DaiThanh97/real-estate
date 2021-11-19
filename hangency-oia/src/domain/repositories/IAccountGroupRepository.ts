import { IRepository } from "./IRepository";
import { AccountGroup } from "../models/AccountGroup";

export interface IAccountGroupRepository extends IRepository<AccountGroup> {
  findById(id: string): Promise<AccountGroup | undefined>;
  getByIds(ids: string[]): Promise<AccountGroup[] | undefined>;
}
