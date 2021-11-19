import {MigrationInterface, QueryRunner} from "typeorm";

export class InspectionExpectationStatisticsViewFixedStatus1618202071849 implements MigrationInterface {
    name = "InspectionExpectationStatisticsViewFixedStatus1618202071849"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM \"typeorm_metadata\" WHERE \"type\" = 'VIEW' AND \"schema\" = $1 AND \"name\" = $2", ["public","inspection_expectation_last_month_statistics_view"]);
        await queryRunner.query("DROP VIEW \"inspection_expectation_last_month_statistics_view\"");
        await queryRunner.query(`CREATE VIEW "inspection_expectation_last_month_statistics_view" AS 
    SELECT note.assignee_id AS account_id, account.display_name AS display_name, note.status AS status, COUNT(*) AS count
    FROM inspection_expectation_notes as note
    INNER JOIN accounts account ON account.id = note.assignee_id
    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')
      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
      AND note.status NOT IN ('Nháp','Chờ duyệt')
      AND note.is_deleted = false
      GROUP BY note.assignee_id, account.display_name, note.status
    UNION
    SELECT note.approved_by AS account_id, account.display_name AS display_name, 'Phê duyệt' AS status, COUNT(*) AS count
    FROM inspection_expectation_notes as note
    INNER JOIN accounts account ON account.id = note.approved_by
    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')
      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
      AND note.status = 'Đã duyệt'
      AND note.is_deleted = false
      GROUP BY note.approved_by, account.display_name, note.status
    UNION  
    SELECT note.assignee_id AS account_id, account.display_name AS display_name, note.status AS status, COUNT(*) AS count
    FROM inspection_expectation_notes as note
    INNER JOIN accounts account ON account.id = note.assignee_id
    WHERE note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
    AND note.status IN ('Nháp','Chờ duyệt')
      AND note.is_deleted = false
    GROUP BY note.assignee_id, account.display_name, note.status
    ORDER BY account_id, display_name;
    `);
        await queryRunner.query("INSERT INTO \"typeorm_metadata\"(\"type\", \"schema\", \"name\", \"value\") VALUES ($1, $2, $3, $4)", ["VIEW","public","inspection_expectation_last_month_statistics_view","SELECT note.assignee_id AS account_id, account.display_name AS display_name, note.status AS status, COUNT(*) AS count\n    FROM inspection_expectation_notes as note\n    INNER JOIN accounts account ON account.id = note.assignee_id\n    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')\n      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n      AND note.status NOT IN ('Nháp','Chờ duyệt')\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, account.display_name, note.status\n    UNION\n    SELECT note.approved_by AS account_id, account.display_name AS display_name, 'Phê duyệt' AS status, COUNT(*) AS count\n    FROM inspection_expectation_notes as note\n    INNER JOIN accounts account ON account.id = note.approved_by\n    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')\n      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n      AND note.status = 'Đã duyệt'\n      AND note.is_deleted = false\n      GROUP BY note.approved_by, account.display_name, note.status\n    UNION  \n    SELECT note.assignee_id AS account_id, account.display_name AS display_name, note.status AS status, COUNT(*) AS count\n    FROM inspection_expectation_notes as note\n    INNER JOIN accounts account ON account.id = note.assignee_id\n    WHERE note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n    AND note.status IN ('Nháp','Chờ duyệt')\n      AND note.is_deleted = false\n    GROUP BY note.assignee_id, account.display_name, note.status\n    ORDER BY account_id, display_name;"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM \"typeorm_metadata\" WHERE \"type\" = 'VIEW' AND \"schema\" = $1 AND \"name\" = $2", ["public","inspection_expectation_last_month_statistics_view"]);
        await queryRunner.query("DROP VIEW \"inspection_expectation_last_month_statistics_view\"");
        await queryRunner.query(`CREATE VIEW "inspection_expectation_last_month_statistics_view" AS SELECT note.assignee_id AS account_id, account.display_name AS display_name, note.status AS status, COUNT(*) AS count
    FROM inspection_expectation_notes as note
    INNER JOIN accounts account ON account.id = note.assignee_id
    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')
      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
      AND note.status NOT IN ('Nháp','Chờ duyệt')
      AND note.is_deleted = false
      GROUP BY note.assignee_id, account.display_name, note.status
    UNION
    SELECT note.approved_by AS account_id, account.display_name AS display_name, 'Phê duyệt' AS status, COUNT(*) AS count
    FROM inspection_expectation_notes as note
    INNER JOIN accounts account ON account.id = note.approved_by
    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')
      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
      AND note.status = 'Đã duyệt'
      AND note.is_deleted = false
      GROUP BY note.approved_by, account.display_name, note.status
    UNION  
    SELECT note.assignee_id AS account_id, account.display_name AS display_name, note.status AS status, COUNT(*) AS count
    FROM inspection_expectation_notes as note
    INNER JOIN accounts account ON account.id = note.assignee_id
    WHERE note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
    AND note.status IN ('Nháp','Chờ duyệt')
      AND note.is_deleted = true
    GROUP BY note.assignee_id, account.display_name, note.status
    ORDER BY account_id, display_name;`);
        await queryRunner.query("INSERT INTO \"typeorm_metadata\"(\"type\", \"schema\", \"name\", \"value\") VALUES ($1, $2, $3, $4)", ["VIEW","public","inspection_expectation_last_month_statistics_view","SELECT note.assignee_id AS account_id, account.display_name AS display_name, note.status AS status, COUNT(*) AS count\n    FROM inspection_expectation_notes as note\n    INNER JOIN accounts account ON account.id = note.assignee_id\n    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')\n      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n      AND note.status NOT IN ('Nháp','Chờ duyệt')\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, account.display_name, note.status\n    UNION\n    SELECT note.approved_by AS account_id, account.display_name AS display_name, 'Phê duyệt' AS status, COUNT(*) AS count\n    FROM inspection_expectation_notes as note\n    INNER JOIN accounts account ON account.id = note.approved_by\n    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')\n      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n      AND note.status = 'Đã duyệt'\n      AND note.is_deleted = false\n      GROUP BY note.approved_by, account.display_name, note.status\n    UNION  \n    SELECT note.assignee_id AS account_id, account.display_name AS display_name, note.status AS status, COUNT(*) AS count\n    FROM inspection_expectation_notes as note\n    INNER JOIN accounts account ON account.id = note.assignee_id\n    WHERE note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n    AND note.status IN ('Nháp','Chờ duyệt')\n      AND note.is_deleted = true\n    GROUP BY note.assignee_id, account.display_name, note.status\n    ORDER BY account_id, display_name;"]);
    }

}
