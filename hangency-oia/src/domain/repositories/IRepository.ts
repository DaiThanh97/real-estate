import { IDomainModel } from "../shared/IDomainModel";

export interface IRepository<Domain extends IDomainModel> {
  create(entity: Domain): Promise<void>;
  update(entity: Domain): Promise<void>;
  delete(id: string): Promise<void>;
}
