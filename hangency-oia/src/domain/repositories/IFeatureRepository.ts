import { IRepository } from "./IRepository";
import { Feature } from "../models/Feature";

export interface IFeatureRepository extends IRepository<Feature> {
  findById(id: string): Promise<Feature | undefined>;
}
