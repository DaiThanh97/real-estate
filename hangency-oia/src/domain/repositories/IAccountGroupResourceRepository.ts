import { IRepository } from "./IRepository";
import { AccountGroupResource } from "../models/AccountGroupResource";

export interface IAccountGroupResourceRepository extends IRepository<AccountGroupResource> {
  findById(id: string): Promise<AccountGroupResource | undefined>;
}
