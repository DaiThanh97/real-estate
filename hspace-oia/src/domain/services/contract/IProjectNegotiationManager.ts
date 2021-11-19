import { INoteManager } from "./INoteManager";

export interface IProjectNegotiationManager<StatusType> extends INoteManager<StatusType> {
  updateChangeablePrice(property: any): Promise<any>;
}
