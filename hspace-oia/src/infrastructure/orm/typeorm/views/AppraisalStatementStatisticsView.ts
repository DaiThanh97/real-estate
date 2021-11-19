import { ViewEntity } from "typeorm";
import { InspectionExpectationStatusType } from "../../../types/Note";
import { NoteStatisticsQuery, NoteStatisticsView } from "./NoteStatisticsView";
import { AppraisalStatementTableName } from "../models/AppraisalStatement";
import { AppraisalStatementStatus } from "../../../../domain/models/AppraisalStatement";

export const NoteThisMonthStatisticsViewName = "appraisal_statement_this_month_statistics_view" as const;
export const NoteLastMonthStatisticsViewName = "appraisal_statement_last_month_statistics_view" as const;
const noteTableName = AppraisalStatementTableName;
const approvedStatus = AppraisalStatementStatus.Approved;
const allowAllMonthsStatuses = [
  AppraisalStatementStatus.Drafting,
  AppraisalStatementStatus.Pending,
  AppraisalStatementStatus.Finished
];

@ViewEntity({
  expression: NoteStatisticsQuery.generateQueryThisMonth(
    noteTableName,
    approvedStatus
  ),
  name: NoteThisMonthStatisticsViewName,
  materialized: false,
})
export class AppraisalStatementThisMonthStatisticsView extends NoteStatisticsView<InspectionExpectationStatusType> {
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
export class AppraisalStatementLastMonthStatisticsView extends NoteStatisticsView<InspectionExpectationStatusType> {
}
