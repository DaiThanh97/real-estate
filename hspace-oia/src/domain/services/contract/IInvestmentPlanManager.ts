import { INoteManager } from "./INoteManager";

export interface IInvestmentPlanManager<NoteStatusType> extends INoteManager<NoteStatusType> {
    updatePlanItemPriceWhenApprovedTUNote(planItems: any): Promise<any>;
}
