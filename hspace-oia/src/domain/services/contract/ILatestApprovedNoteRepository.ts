import { IBaseRepository } from "./IBaseRepository";

export interface ILatestApprovedNoteRepository extends IBaseRepository {
  updateOrCreate(data: {
    refId: number,
    type: string,
    propertyId: number,
    accountId?: number,
  }): Promise<any>;
}
