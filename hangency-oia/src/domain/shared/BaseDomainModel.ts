import { IDomainModel } from "./IDomainModel";
export abstract class BaseDomainModel implements IDomainModel {
  id: string | number;
  createdAt: Date;
  updatedAt: Date;
  protected constructor(input: Pick<BaseDomainModel, "id" | "createdAt" | "updatedAt">) {
    this.id = input.id;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }
  abstract equals(entity: IDomainModel): boolean;
}
