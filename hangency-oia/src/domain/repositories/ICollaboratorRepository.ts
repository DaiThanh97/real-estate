import { IRepository } from "./IRepository";
import { Collaborator } from "../models/Collaborator";

export interface ICollaboratorRepository extends IRepository<Collaborator> {
  findById(id: string): Promise<Collaborator | undefined>;
  findByPhone(phone: string): Promise<Collaborator | undefined>;
  findByEmail(email: string): Promise<Collaborator | undefined>;
}
