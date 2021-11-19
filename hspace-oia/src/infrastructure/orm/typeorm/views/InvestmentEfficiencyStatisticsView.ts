import { ViewEntity } from "typeorm";
import { InvestmentEfficiencyStatusType } from "../../../types/Note";
import { NoteStatisticsQuery, NoteStatisticsView } from "./NoteStatisticsView";
import { InvestmentEfficiencyStatus, InvestmentEfficiencyTableName } from "../models/InvestmentEfficiency";

export const NoteThisMonthStatisticsViewName = "investment_efficiency_this_month_statistics_view" as const;
export const NoteLastMonthStatisticsViewName = "investment_efficiency_last_month_statistics_view" as const;
const noteTableName = InvestmentEfficiencyTableName;
const approvedStatus = InvestmentEfficiencyStatus.Approved;
const allowAllMonthsStatuses = [InvestmentEfficiencyStatus.Drafting, InvestmentEfficiencyStatus.Pending];

@ViewEntity({
  expression: NoteStatisticsQuery.generateQueryThisMonth(
    noteTableName,
    approvedStatus
  ),
  name: NoteThisMonthStatisticsViewName,
  materialized: false,
})
export class InvestmentEfficiencyThisMonthStatisticsView extends NoteStatisticsView<InvestmentEfficiencyStatusType> {
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
export class InvestmentEfficiencyLastMonthStatisticsView extends NoteStatisticsView<InvestmentEfficiencyStatusType> {
}
