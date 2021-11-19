import { IRepository } from "./IRepository";
import { Property } from "../models/Property";

export interface IPropertyRepository extends IRepository<Property> {
  findById(id: string): Promise<Property | undefined>;
}
