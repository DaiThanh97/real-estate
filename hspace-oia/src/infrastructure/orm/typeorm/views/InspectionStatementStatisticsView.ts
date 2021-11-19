import { ViewEntity } from "typeorm";
import { InspectionStatementStatusType } from "../../../types/Note";
import { NoteStatisticsQuery, NoteStatisticsView } from "./NoteStatisticsView";
import { InspectionStatementStatus, InspectionStatementTableName } from "../models/InspectionStatement";

export const NoteThisMonthStatisticsViewName = "inspection_statement_this_month_statistics_view" as const;
export const NoteLastMonthStatisticsViewName = "inspection_statement_last_month_statistics_view" as const;
const noteTableName = InspectionStatementTableName;
const approvedStatus = InspectionStatementStatus.Approved;
const allowAllMonthsStatuses = [InspectionStatementStatus.Drafting, InspectionStatementStatus.Pending];

@ViewEntity({
  expression: NoteStatisticsQuery.generateQueryThisMonth(
    noteTableName,
    approvedStatus
  ),
  name: NoteThisMonthStatisticsViewName,
  materialized: false,
})
export class InspectionStatementThisMonthStatisticsView extends NoteStatisticsView<InspectionStatementStatusType> {
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
export class InspectionStatementLastMonthStatisticsView extends NoteStatisticsView<InspectionStatementStatusType> {
}
