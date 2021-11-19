import { ViewEntity } from "typeorm";
import { InvestmentPlanStatusType } from "../../../types/Note";
import { NoteStatisticsQuery, NoteStatisticsView } from "./NoteStatisticsView";
import { InvestmentPlanStatus, InvestmentPlanTableName } from "../models/InvestmentPlan";

export const NoteThisMonthStatisticsViewName = "investment_plan_this_month_statistics_view" as const;
export const NoteLastMonthStatisticsViewName = "investment_plan_last_month_statistics_view" as const;
const noteTableName = InvestmentPlanTableName;
const approvedStatus = InvestmentPlanStatus.Approved;
const allowAllMonthsStatuses = [InvestmentPlanStatus.Drafting, InvestmentPlanStatus.Pending];

@ViewEntity({
  expression: NoteStatisticsQuery.generateQueryThisMonth(
    noteTableName,
    approvedStatus
  ),
  name: NoteThisMonthStatisticsViewName,
  materialized: false,
})
export class InvestmentPlanThisMonthStatisticsView extends NoteStatisticsView<InvestmentPlanStatusType> {
}

@ViewEntity({
  expression: NoteStatisticsQuery.generateQueryLastMonth(
    noteTableName,
    allowAllMonthsStatuses,
    approvedStatus
  ),
  name: NoteLastMonthStatisticsViewName,
  materialized: false,
})
export class InvestmentPlanLastMonthStatisticsView extends NoteStatisticsView<InvestmentPlanStatusType> {
}
