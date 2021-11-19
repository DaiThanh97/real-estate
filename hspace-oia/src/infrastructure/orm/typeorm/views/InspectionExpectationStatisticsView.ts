import { ViewEntity } from "typeorm";
import { InspectionExpectationStatus } from "../../../../domain/models/InspectionExpectation";
import { InspectionExpectationStatusType } from "../../../types/Note";
import { NoteStatisticsView, NoteStatisticsQuery } from "./NoteStatisticsView";
import { InspectionExpectationTableName } from "../models/InspectionExpectation";

export const NoteThisMonthStatisticsViewName = "inspection_expectation_this_month_statistics_view" as const;
export const NoteLastMonthStatisticsViewName = "inspection_expectation_last_month_statistics_view" as const;
const noteTableName = InspectionExpectationTableName;
const approvedStatus = InspectionExpectationStatus.Approved;
const allowAllMonthsStatuses = [InspectionExpectationStatus.Drafting, InspectionExpectationStatus.Pending];

@ViewEntity({
  expression: NoteStatisticsQuery.generateQueryThisMonth(
    noteTableName,
    approvedStatus
  ),
  name: NoteThisMonthStatisticsViewName,
  materialized: false,
})
export class InspectionExpectationThisMonthStatisticsView extends NoteStatisticsView<InspectionExpectationStatusType> {}

@ViewEntity({
  expression: NoteStatisticsQuery.generateQueryLastMonth(
    noteTableName,
    allowAllMonthsStatuses,
    approvedStatus
  ),
  name: NoteLastMonthStatisticsViewName,
  materialized: false,
})
export class InspectionExpectationLastMonthStatisticsView extends NoteStatisticsView<InspectionExpectationStatusType>  {}
