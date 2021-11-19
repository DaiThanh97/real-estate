import { IRepository } from "./IRepository";
import { Employee } from "../models/Employee";

export interface IEmployeeRepository extends IRepository<Employee> {
  findById(id: string): Promise<Employee | undefined>;
}
