import { IRepository } from "./IRepository";
import { Account } from "../models/Account";

export interface IAccountRepository extends IRepository<Account> {
  save(entity: Account): Promise<void>;
  findById(id: string): Promise<Account | undefined>;
  findByIdentityName(identityName: string): Promise<Account | undefined>;
  findByAuthId(authId: string): Promise<Account | undefined>;
  getByCode(code: string): Promise<Account[] | undefined>;
}
