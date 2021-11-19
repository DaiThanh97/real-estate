import { IBaseRepository } from "./IBaseRepository";

export interface IPropertyBookmarkRepository extends IBaseRepository {

  updateOrCreate(data: {
    propertyId: number,
    type: string,
    accountId: number,
    createdBy?: number,
    updatedBy?: number,
  }): Promise<any>;
}
