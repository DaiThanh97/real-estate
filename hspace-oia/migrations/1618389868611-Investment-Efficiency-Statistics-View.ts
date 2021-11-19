import {MigrationInterface, QueryRunner} from "typeorm";

export class InvestmentEfficiencyStatisticsView1618389868611 implements MigrationInterface {
    name = "InvestmentEfficiencyStatisticsView1618389868611"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE VIEW "investment_efficiency_this_month_statistics_view" AS 
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM investment_efficiency_notes as note
    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    UNION
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM investment_efficiency_notes as note
    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()
      AND note.is_deleted = false
      AND note.status = 'Đã duyệt'
      GROUP BY note.assignee_id, note.approved_by, note.status
    ORDER BY assignee_id;
    `);
        await queryRunner.query("INSERT INTO \"typeorm_metadata\"(\"type\", \"schema\", \"name\", \"value\") VALUES ($1, $2, $3, $4)", ["VIEW","public","investment_efficiency_this_month_statistics_view","SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM investment_efficiency_notes as note\n    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    UNION\n    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM investment_efficiency_notes as note\n    WHERE note.changed_status_time BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()\n      AND note.is_deleted = false\n      AND note.status = 'Đã duyệt'\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    ORDER BY assignee_id;"]);
        await queryRunner.query(`CREATE VIEW "investment_efficiency_last_month_statistics_view" AS 
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM investment_efficiency_notes as note
    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')
      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
      AND note.status NOT IN ('Nháp','Chờ duyệt')
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    UNION
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM investment_efficiency_notes as note
    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')
      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
      AND note.status = 'Đã duyệt'
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    UNION  
    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count
    FROM investment_efficiency_notes as note
    WHERE note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
    AND note.status IN ('Nháp','Chờ duyệt')
      AND note.is_deleted = false
      GROUP BY note.assignee_id, note.approved_by, note.status
    ORDER BY assignee_id;
    `);
        await queryRunner.query("INSERT INTO \"typeorm_metadata\"(\"type\", \"schema\", \"name\", \"value\") VALUES ($1, $2, $3, $4)", ["VIEW","public","investment_efficiency_last_month_statistics_view","SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM investment_efficiency_notes as note\n    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')\n      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n      AND note.status NOT IN ('Nháp','Chờ duyệt')\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    UNION\n    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM investment_efficiency_notes as note\n    WHERE note.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')\n      AND note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n      AND note.status = 'Đã duyệt'\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    UNION  \n    SELECT note.assignee_id, note.approved_by, note.status AS status, COUNT(*) AS count\n    FROM investment_efficiency_notes as note\n    WHERE note.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n    AND note.status IN ('Nháp','Chờ duyệt')\n      AND note.is_deleted = false\n      GROUP BY note.assignee_id, note.approved_by, note.status\n    ORDER BY assignee_id;"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM \"typeorm_metadata\" WHERE \"type\" = 'VIEW' AND \"schema\" = $1 AND \"name\" = $2", ["public","investment_efficiency_last_month_statistics_view"]);
        await queryRunner.query("DROP VIEW \"investment_efficiency_last_month_statistics_view\"");
        await queryRunner.query("DELETE FROM \"typeorm_metadata\" WHERE \"type\" = 'VIEW' AND \"schema\" = $1 AND \"name\" = $2", ["public","investment_efficiency_this_month_statistics_view"]);
        await queryRunner.query("DROP VIEW \"investment_efficiency_this_month_statistics_view\"");
    }

}
