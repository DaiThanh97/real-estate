import { ViewEntity } from "typeorm";
import { AppraisalExpectationStatus, AppraisalExpectationTableName } from "../models/AppraisalExpectation";
import { AppraisalExpectationStatusType } from "../../../types/Note";
import { NoteStatisticsView, NoteStatisticsQuery } from "./NoteStatisticsView";

export const NoteThisMonthStatisticsViewName = "appraisal_expectation_this_month_statistics_view" as const;
export const NoteLastMonthStatisticsViewName = "appraisal_expectation_last_month_statistics_view" as const;
const noteTableName = AppraisalExpectationTableName;
const approvedStatus = AppraisalExpectationStatus.Approved;
const allowAllMonthsStatuses = [AppraisalExpectationStatus.Drafting, AppraisalExpectationStatus.Finished, AppraisalExpectationStatus.Pending];

@ViewEntity({
  expression: NoteStatisticsQuery.generateQueryThisMonth(
    noteTableName,
    approvedStatus
  ),
  name: NoteThisMonthStatisticsViewName,
  materialized: false,
})
export class AppraisalExpectationThisMonthStatisticsView extends NoteStatisticsView<AppraisalExpectationStatusType> {}

@ViewEntity({
  expression: NoteStatisticsQuery.generateQueryLastMonth(
    noteTableName,
    allowAllMonthsStatuses,
    approvedStatus
  ),
  name: NoteLastMonthStatisticsViewName,
  materialized: false,
})
export class AppraisalExpectationLastMonthStatisticsView extends NoteStatisticsView<AppraisalExpectationStatusType>  {}
