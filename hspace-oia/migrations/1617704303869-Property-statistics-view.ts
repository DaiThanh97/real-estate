import { MigrationInterface, QueryRunner } from "typeorm";

export class PropertyStatisticsView1617704303869 implements MigrationInterface {
  name = "PropertyStatisticsView1617704303869";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE VIEW "property_last_month_statistics_view" AS 
  SELECT property.district_id AS district_id, property.status AS status, COUNT(*) AS count
  FROM properties as property
  WHERE property.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')
    AND property.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
    AND property.status NOT IN ('Nháp', 'Chờ duyệt')
    AND property.is_active = true
  GROUP BY property.district_id, property.status
  UNION
  SELECT property.district_id AS district_id, property.status AS status, COUNT(*) AS count
  FROM properties as property
  WHERE property.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
    AND property.status IN ('Nháp', 'Chờ duyệt')
    AND property.is_active = true
  GROUP BY property.district_id, property.status
  ORDER BY district_id;
  `);
    await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value")
                             VALUES ($1, $2, $3, $4)`, ["VIEW", "public", "property_last_month_statistics_view", "SELECT property.district_id AS district_id, property.status AS status, COUNT(*) AS count\n  FROM properties as property\n  WHERE property.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')\n    AND property.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n    AND property.status NOT IN ('Nháp', 'Chờ duyệt')\n    AND property.is_active = true\n  GROUP BY property.district_id, property.status\n  UNION\n  SELECT property.district_id AS district_id, property.status AS status, COUNT(*) AS count\n  FROM properties as property\n  WHERE property.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)\n    AND property.status IN ('Nháp', 'Chờ duyệt')\n    AND property.is_active = true\n  GROUP BY property.district_id, property.status\n  ORDER BY district_id;"]);
    await queryRunner.query("CREATE VIEW \"property_this_month_statistics_view\" AS SELECT \"property\".\"district_id\" AS \"district_id\", \"property\".\"status\" AS \"status\", COUNT(*) AS \"count\" FROM \"properties\" \"property\" WHERE \"property\".\"is_active\" = true AND  \"property\".\"changed_status_time\" BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW() GROUP BY district_id, status");
    await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value")
                             VALUES ($1, $2, $3, $4)`, ["VIEW", "public", "property_this_month_statistics_view", "SELECT \"property\".\"district_id\" AS \"district_id\", \"property\".\"status\" AS \"status\", COUNT(*) AS \"count\" FROM \"properties\" \"property\" WHERE \"property\".\"is_active\" = true AND  \"property\".\"changed_status_time\" BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW() GROUP BY district_id, status"]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE
                             FROM "typeorm_metadata"
                             WHERE "type" = 'VIEW'
                               AND "schema" = $1
                               AND "name" = $2`, ["public", "property_this_month_statistics_view"]);
    await queryRunner.query("DROP VIEW \"property_this_month_statistics_view\"");
    await queryRunner.query(`DELETE
                             FROM "typeorm_metadata"
                             WHERE "type" = 'VIEW'
                               AND "schema" = $1
                               AND "name" = $2`, ["public", "property_last_month_statistics_view"]);
    await queryRunner.query("DROP VIEW \"property_last_month_statistics_view\"");
  }

}
