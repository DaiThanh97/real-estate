import { IRepository } from "./IRepository";
import { GroupValue } from "../models/GroupValue";

export interface IGroupValueRepository extends IRepository<GroupValue> {
  findById(id: string): Promise<GroupValue | undefined>;
}
