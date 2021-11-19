import {MigrationInterface, QueryRunner} from "typeorm";

export class InspectionExpectationStatisticsViewUpdateLogic1618223532013 implements MigrationInterface {
    name = "InspectionExpectationStatisticsViewUpdateLogic1618223532013"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM \"typeorm_metadata\" WHERE \"type\" = 'VIEW' AND \"schema\" = $1 AND \"name\" = $2", ["public","inspection_expectation_this_month_statistics_view"]);
        await queryRunner.query("DROP VIEW \"inspection_expectation_this_month_statistics_view\"");
        await queryRunner.query(`CREATE VIEW "inspection_expectation_this_month_statistics_view" AS 
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM inspection_expectation_notes as note
    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    UNION
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM inspection_expectation_notes as note
    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()
      AND note.is_deleted = false
      AND note.status = 'Đã duyệt'
      GROUP BY note.assignee_id, note.approved_by, note.status
    ORDER BY assignee_id;
    `);
        await queryRunner.query("INSERT INTO \"typeorm_metadata\"(\"type\", \"schema\", \"name\", \"value\") VALUES ($1, $2, $3, $4)", ["VIEW","public","inspection_expectation_this_month_statistics_view","SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM inspection_expectation_notes as note\n    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    UNION\n    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM inspection_expectation_notes as note\n    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()\n      AND note.is_deleted = false\n      AND note.status = 'Đã duyệt'\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    ORDER BY assignee_id;"]);
        
        await queryRunner.query("DELETE FROM \"typeorm_metadata\" WHERE \"type\" = 'VIEW' AND \"schema\" = $1 AND \"name\" = $2", ["public","inspection_expectation_last_month_statistics_view"]);
        await queryRunner.query("DROP VIEW \"inspection_expectation_last_month_statistics_view\"");
        await queryRunner.query(`CREATE VIEW "inspection_expectation_last_month_statistics_view" AS 
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM inspection_expectation_notes as note
    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')
      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
      AND note.status NOT IN ('Nháp','Chờ duyệt')
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    UNION
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM inspection_expectation_notes as note
    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')
      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
      AND note.status = 'Đã duyệt'
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    UNION  
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM inspection_expectation_notes as note
    WHERE note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
    AND note.status IN ('Nháp','Chờ duyệt')
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    ORDER BY assignee_id;
    `);
        await queryRunner.query("INSERT INTO \"typeorm_metadata\"(\"type\", \"schema\", \"name\", \"value\") VALUES ($1, $2, $3, $4)", ["VIEW","public","inspection_expectation_last_month_statistics_view","SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM inspection_expectation_notes as note\n    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')\n      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n      AND note.status NOT IN ('Nháp','Chờ duyệt')\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    UNION\n    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM inspection_expectation_notes as note\n    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')\n      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n      AND note.status = 'Đã duyệt'\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    UNION  \n    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM inspection_expectation_notes as note\n    WHERE note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n    AND note.status IN ('Nháp','Chờ duyệt')\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    ORDER BY assignee_id;"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM \"typeorm_metadata\" WHERE \"type\" = 'VIEW' AND \"schema\" = $1 AND \"name\" = $2", ["public","inspection_expectation_last_month_statistics_view"]);
        await queryRunner.query("DROP VIEW \"inspection_expectation_last_month_statistics_view\"");
        await queryRunner.query("DELETE FROM \"typeorm_metadata\" WHERE \"type\" = 'VIEW' AND \"schema\" = $1 AND \"name\" = $2", ["public","inspection_expectation_this_month_statistics_view"]);
        await queryRunner.query("DROP VIEW \"inspection_expectation_this_month_statistics_view\"");
        await queryRunner.query(`CREATE VIEW "inspection_expectation_this_month_statistics_view" AS SELECT note.assignee_id AS account_id, account.display_name AS display_name, note.status AS status, COUNT(*) AS count
    FROM inspection_expectation_notes as note
    INNER JOIN accounts account ON account.id = note.assignee_id
    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()
      AND note.is_deleted = false
      GROUP BY note.assignee_id, account.display_name, note.status
    UNION
    SELECT note.approved_by AS account_id, account.display_name AS display_name, 'Phê duyệt' AS status, COUNT(*) AS count
    FROM inspection_expectation_notes as note
    INNER JOIN accounts account ON account.id = note.approved_by
    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()
      AND note.is_deleted = false
      AND note.status = 'Đã duyệt'
      GROUP BY note.approved_by, account.display_name, note.status
    ORDER BY account_id, display_name;`);
        await queryRunner.query("INSERT INTO \"typeorm_metadata\"(\"type\", \"schema\", \"name\", \"value\") VALUES ($1, $2, $3, $4)", ["VIEW","public","inspection_expectation_this_month_statistics_view","SELECT note.assignee_id AS account_id, account.display_name AS display_name, note.status AS status, COUNT(*) AS count\n    FROM inspection_expectation_notes as note\n    INNER JOIN accounts account ON account.id = note.assignee_id\n    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, account.display_name, note.status\n    UNION\n    SELECT note.approved_by AS account_id, account.display_name AS display_name, 'Phê duyệt' AS status, COUNT(*) AS count\n    FROM inspection_expectation_notes as note\n    INNER JOIN accounts account ON account.id = note.approved_by\n    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()\n      AND note.is_deleted = false\n      AND note.status = 'Đã duyệt'\n      GROUP BY note.approved_by, account.display_name, note.status\n    ORDER BY account_id, display_name;"]);
    }

}
