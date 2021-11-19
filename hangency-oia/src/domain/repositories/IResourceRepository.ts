import { IRepository } from "./IRepository";
import { Resource } from "../models/Resource";

export interface IResourceRepository extends IRepository<Resource> {
  findById(id: string): Promise<Resource | undefined>;
}
