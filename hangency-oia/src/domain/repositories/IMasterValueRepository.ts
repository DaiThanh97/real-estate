import { IRepository } from "./IRepository";
import { MasterValue } from "../models/MasterValue";

export interface IMasterValueRepository extends IRepository<MasterValue> {
  findById(id: string): Promise<MasterValue | undefined>;
}
