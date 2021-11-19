import { IRepository } from "./IRepository";
import { Menu } from "../models/Menu";

export interface IMenuRepository extends IRepository<Menu> {
  findById(id: string): Promise<Menu | undefined>;
}
