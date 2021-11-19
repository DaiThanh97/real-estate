import {MigrationInterface, QueryRunner} from "typeorm";
import MenuSeed from "../src/infrastructure/orm/typeorm/seed/menu";

export class AppraisalExpectationStatisticsView1618303070957 implements MigrationInterface {
    name = "AppraisalExpectationStatisticsView1618303070957"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE VIEW "appraisal_expectation_this_month_statistics_view" AS 
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM appraisal_expectation_notes as note
    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    UNION
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM appraisal_expectation_notes as note
    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()
      AND note.is_deleted = false
      AND note.status = 'Đã duyệt'
      GROUP BY note.assignee_id, note.approved_by, note.status
    ORDER BY assignee_id;
    `);
        await queryRunner.query("INSERT INTO \"typeorm_metadata\"(\"type\", \"schema\", \"name\", \"value\") VALUES ($1, $2, $3, $4)", ["VIEW","public","appraisal_expectation_this_month_statistics_view","SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM appraisal_expectation_notes as note\n    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    UNION\n    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM appraisal_expectation_notes as note\n    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()\n      AND note.is_deleted = false\n      AND note.status = 'Đã duyệt'\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    ORDER BY assignee_id;"]);
        await queryRunner.query(`CREATE VIEW "appraisal_expectation_last_month_statistics_view" AS 
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM appraisal_expectation_notes as note
    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')
      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
      AND note.status NOT IN ('Nháp','Hoàn thành','Chờ duyệt')
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    UNION
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM appraisal_expectation_notes as note
    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')
      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
      AND note.status = 'Đã duyệt'
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    UNION  
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM appraisal_expectation_notes as note
    WHERE note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
    AND note.status IN ('Nháp','Hoàn thành','Chờ duyệt')
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    ORDER BY assignee_id;
    `);
      await queryRunner.query("INSERT INTO \"typeorm_metadata\"(\"type\", \"schema\", \"name\", \"value\") VALUES ($1, $2, $3, $4)", ["VIEW","public","appraisal_expectation_last_month_statistics_view","SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM appraisal_expectation_notes as note\n    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')\n      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n      AND note.status NOT IN ('Nháp','Hoàn thành','Chờ duyệt')\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    UNION\n    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM appraisal_expectation_notes as note\n    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')\n      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n      AND note.status = 'Đã duyệt'\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    UNION  \n    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM appraisal_expectation_notes as note\n    WHERE note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n    AND note.status IN ('Nháp','Hoàn thành','Chờ duyệt')\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    ORDER BY assignee_id;"]);
    
      await MenuSeed.run(queryRunner); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM \"typeorm_metadata\" WHERE \"type\" = 'VIEW' AND \"schema\" = $1 AND \"name\" = $2", ["public","appraisal_expectation_last_month_statistics_view"]);
        await queryRunner.query("DROP VIEW \"appraisal_expectation_last_month_statistics_view\"");
        await queryRunner.query("DELETE FROM \"typeorm_metadata\" WHERE \"type\" = 'VIEW' AND \"schema\" = $1 AND \"name\" = $2", ["public","appraisal_expectation_this_month_statistics_view"]);
        await queryRunner.query("DROP VIEW \"appraisal_expectation_this_month_statistics_view\"");
    }

}
