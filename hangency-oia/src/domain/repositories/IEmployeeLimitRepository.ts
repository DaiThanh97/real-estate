import { IRepository } from "./IRepository";
import { EmployeeLimit } from "../models/EmployeeLimit";

export interface IEmployeeLimitRepository extends IRepository<EmployeeLimit> {
  findById(id: string): Promise<EmployeeLimit | undefined>;
}
