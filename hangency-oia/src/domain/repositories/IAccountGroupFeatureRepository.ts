import { IRepository } from "./IRepository";
import { AccountGroupFeature } from "../models/AccountGroupFeature";

export interface IAccountGroupFeatureRepository extends IRepository<AccountGroupFeature> {
  findById(id: string): Promise<AccountGroupFeature | undefined>;
}
