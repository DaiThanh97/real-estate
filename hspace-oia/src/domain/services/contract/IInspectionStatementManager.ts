import { INoteManager } from "./INoteManager";

export interface IInspectionStatementManager<StatusType> extends INoteManager<StatusType> {
  updateUnitPrice(property: Readonly<any>, accountId: number): Promise<void>;
}
