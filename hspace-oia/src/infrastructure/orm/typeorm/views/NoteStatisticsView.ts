import { ViewColumn } from "typeorm";
import _ from "lodash";
import { NoteTableNameType } from "../../../types/Note";

export class NoteStatisticsView<NoteStatus> {
  @ViewColumn({ name: "assignee_id" })
  assigneeId: number;

  @ViewColumn({ name: "approved_by" })
  approvedBy: number;

  @ViewColumn()
  status: NoteStatus;

  @ViewColumn()
  count: number;
}

export class NoteStatisticsQuery {
  public static generateQueryThisMonth<NoteStatus>(tableName: NoteTableNameType, approvedStatus: NoteStatus) {
    return `
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM ${tableName} as note
    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    UNION
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM ${tableName} as note
    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()
      AND note.is_deleted = false
      AND note.status = '${approvedStatus}'
      GROUP BY note.assignee_id, note.approved_by, note.status
    ORDER BY assignee_id;
    `;
  }

  public static generateQueryLastMonth<NoteStatus>(tableName: NoteTableNameType, allowAllMonthsStatuses: NoteStatus[], approvedStatus: NoteStatus) {
    return `
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM ${tableName} as note
    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')
      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
      AND note.status NOT IN (${_.map(allowAllMonthsStatuses, (status: NoteStatus) => `'${status}'`).join(",")})
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    UNION
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM ${tableName} as note
    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')
      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
      AND note.status = '${approvedStatus}'
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    UNION  
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM ${tableName} as note
    WHERE note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
    AND note.status IN (${_.map(allowAllMonthsStatuses, status => `'${status}'`).join(",")})
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    ORDER BY assignee_id;
    `;
  }
}
