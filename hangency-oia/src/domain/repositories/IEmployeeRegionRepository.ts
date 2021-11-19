import { IRepository } from "./IRepository";
import { EmployeeRegion } from "../models/EmployeeRegion";

export interface IEmployeeRegionRepository extends IRepository<EmployeeRegion> {
  findById(id: string): Promise<EmployeeRegion | undefined>;
}
