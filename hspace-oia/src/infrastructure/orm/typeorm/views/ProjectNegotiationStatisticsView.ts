import { ViewEntity } from "typeorm";
import { ProjectNegotiationStatusType } from "../../../types/Note";
import { NoteStatisticsQuery, NoteStatisticsView } from "./NoteStatisticsView";
import { ProjectNegotiationStatus, ProjectNegotiationTableName } from "../models/ProjectNegotiation";

export const NoteThisMonthStatisticsViewName = "project_negotiation_this_month_statistics_view" as const;
export const NoteLastMonthStatisticsViewName = "project_negotiation_last_month_statistics_view" as const;
const noteTableName = ProjectNegotiationTableName;
const approvedStatus = ProjectNegotiationStatus.Approved;
const allowAllMonthsStatuses = [ProjectNegotiationStatus.Drafting, ProjectNegotiationStatus.Pending];

@ViewEntity({
  expression: NoteStatisticsQuery.generateQueryThisMonth(
    noteTableName,
    approvedStatus
  ),
  name: NoteThisMonthStatisticsViewName,
  materialized: false,
})
export class ProjectNegotiationThisMonthStatisticsView extends NoteStatisticsView<ProjectNegotiationStatusType> {
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
export class ProjectNegotiationLastMonthStatisticsView extends NoteStatisticsView<ProjectNegotiationStatusType> {
}
