export interface IDomainModel {
  id: string | number;
  createdAt: Date;
  updatedAt: Date;
  equals(entity: IDomainModel): boolean;
}
