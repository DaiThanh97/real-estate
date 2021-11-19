import { IBaseRepository } from "./IBaseRepository";

export interface IAccountEventRepository extends IBaseRepository {
  updateOrCreate(data: {
    referenceId: number,
    accountId: number,
    model: string,
    type: string,
    createdBy?: number,
    updatedBy?: number,
  }): Promise<any>;
}
