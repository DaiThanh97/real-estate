import { MigrationInterface, QueryRunner } from "typeorm";

export class AppraisalStatementRatioView1616740409503 implements MigrationInterface {
  name = "AppraisalStatementRatioView1616740409503";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE
                             FROM "typeorm_metadata"
                             WHERE "type" = 'VIEW'
                               AND "schema" = $1
                               AND "name" = $2`, ["public", "property_price_view"]);
    await queryRunner.query("DROP MATERIALIZED VIEW \"property_price_view\"");

    await queryRunner.query("CREATE MATERIALIZED VIEW \"property_ratio_view\" AS SELECT \"property\".\"id\" AS \"id\", \"property\".\"closed_deal_value\" AS \"closed_deal_value\", \"property\".\"changeable_price\" AS \"changeable_price\", \"latestApprovedTH\".\"ref_id\" AS \"appraisal_statement_id\", \"latestApprovedHD\".\"ref_id\" AS \"investment_efficiency_id\", \"appraisalStatement\".\"property_unit_price_ppss\" AS \"property_unit_price_ppss\", \"investmentEfficiency\".\"approved_purchase_price\" AS \"approved_purchase_price\", changeable_price - approved_purchase_price AS \"difference_price\", CAST(changeable_price AS float)/CAST(approved_purchase_price AS float) AS \"ratio_changeable_buy\", CAST(changeable_price AS float)/CAST(property_unit_price_ppss AS float) AS \"ratio_changeable_appraise\", CAST(closed_deal_value AS float)/CAST(property_unit_price_ppss AS float) AS \"ratio_closed_deal_appraise\" FROM \"properties\" \"property\" LEFT JOIN \"latest_approved_notes\" \"latestApprovedTH\" ON \"latestApprovedTH\".\"type\" = 'TH' AND \"latestApprovedTH\".\"property_id\" = \"property\".\"id\"  LEFT JOIN \"latest_approved_notes\" \"latestApprovedHD\" ON \"latestApprovedHD\".\"type\" = 'HD' AND \"latestApprovedHD\".\"property_id\" = \"property\".\"id\"  LEFT JOIN \"appraisal_statement_notes\" \"appraisalStatement\" ON \"appraisalStatement\".\"id\" = \"latestApprovedTH\".\"ref_id\"  LEFT JOIN \"investment_efficiency_notes\" \"investmentEfficiency\" ON \"investmentEfficiency\".\"id\" = \"latestApprovedHD\".\"ref_id\" WHERE \"property\".\"is_active\" = true");
    await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value")
                             VALUES ($1, $2, $3, $4)`, ["VIEW", "public", "property_ratio_view", "SELECT \"property\".\"id\" AS \"id\", \"property\".\"closed_deal_value\" AS \"closed_deal_value\", \"property\".\"changeable_price\" AS \"changeable_price\", \"latestApprovedTH\".\"ref_id\" AS \"appraisal_statement_id\", \"latestApprovedHD\".\"ref_id\" AS \"investment_efficiency_id\", \"appraisalStatement\".\"property_unit_price_ppss\" AS \"property_unit_price_ppss\", \"investmentEfficiency\".\"approved_purchase_price\" AS \"approved_purchase_price\", changeable_price - approved_purchase_price AS \"difference_price\", CAST(changeable_price AS float)/CAST(approved_purchase_price AS float) AS \"ratio_changeable_buy\", CAST(changeable_price AS float)/CAST(property_unit_price_ppss AS float) AS \"ratio_changeable_appraise\", CAST(closed_deal_value AS float)/CAST(property_unit_price_ppss AS float) AS \"ratio_closed_deal_appraise\" FROM \"properties\" \"property\" LEFT JOIN \"latest_approved_notes\" \"latestApprovedTH\" ON \"latestApprovedTH\".\"type\" = 'TH' AND \"latestApprovedTH\".\"property_id\" = \"property\".\"id\"  LEFT JOIN \"latest_approved_notes\" \"latestApprovedHD\" ON \"latestApprovedHD\".\"type\" = 'HD' AND \"latestApprovedHD\".\"property_id\" = \"property\".\"id\"  LEFT JOIN \"appraisal_statement_notes\" \"appraisalStatement\" ON \"appraisalStatement\".\"id\" = \"latestApprovedTH\".\"ref_id\"  LEFT JOIN \"investment_efficiency_notes\" \"investmentEfficiency\" ON \"investmentEfficiency\".\"id\" = \"latestApprovedHD\".\"ref_id\" WHERE \"property\".\"is_active\" = true"]);
    await queryRunner.query("CREATE MATERIALIZED VIEW \"appraisal_statement_ratio_view\" AS SELECT \"appraisalStatement\".\"id\" AS \"id\", \"appraisalStatement\".\"property_id\" AS \"property_id\", CAST(closed_deal_value AS float)/CAST(property_unit_price_ppss AS float) AS \"ratio_closed_deal_appraise\" FROM \"appraisal_statement_notes\" \"appraisalStatement\" LEFT JOIN \"properties\" \"property\" ON \"property\".\"id\" = \"appraisalStatement\".\"property_id\" WHERE \"appraisalStatement\".\"status\" IN ('Đã duyệt', 'Đã xoá')");
    await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value")
                             VALUES ($1, $2, $3, $4)`, ["VIEW", "public", "appraisal_statement_ratio_view", "SELECT \"appraisalStatement\".\"id\" AS \"id\", \"appraisalStatement\".\"property_id\" AS \"property_id\", CAST(closed_deal_value AS float)/CAST(property_unit_price_ppss AS float) AS \"ratio_closed_deal_appraise\" FROM \"appraisal_statement_notes\" \"appraisalStatement\" LEFT JOIN \"properties\" \"property\" ON \"property\".\"id\" = \"appraisalStatement\".\"property_id\" WHERE \"appraisalStatement\".\"status\" IN ('Đã duyệt', 'Đã xoá')"]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE
                             FROM "typeorm_metadata"
                             WHERE "type" = 'VIEW'
                               AND "schema" = $1
                               AND "name" = $2`, ["public", "appraisal_statement_ratio_view"]);
    await queryRunner.query("DROP VIEW \"appraisal_statement_ratio_view\"");
    await queryRunner.query(`DELETE
                             FROM "typeorm_metadata"
                             WHERE "type" = 'VIEW'
                               AND "schema" = $1
                               AND "name" = $2`, ["public", "property_ratio_view"]);
    await queryRunner.query("DROP VIEW \"property_ratio_view\"");

    await queryRunner.query("CREATE MATERIALIZED VIEW \"property_price_view\" AS SELECT \"property\".\"id\" AS \"id\", \"property\".\"closed_deal_value\" AS \"closed_deal_value\", \"property\".\"changeable_price\" AS \"changeable_price\", \"latestApprovedTH\".\"ref_id\" AS \"appraisal_statement_id\", \"latestApprovedHD\".\"ref_id\" AS \"investment_efficiency_id\", \"appraisalStatement\".\"property_unit_price_ppss\" AS \"property_unit_price_ppss\", \"investmentEfficiency\".\"approved_purchase_price\" AS \"approved_purchase_price\", changeable_price - approved_purchase_price AS \"difference_price\", CAST(changeable_price AS float)/CAST(approved_purchase_price AS float) AS \"ratio_changeable_buy\", CAST(changeable_price AS float)/CAST(property_unit_price_ppss AS float) AS \"ratio_changeable_appraise\", CAST(closed_deal_value AS float)/CAST(property_unit_price_ppss AS float) AS \"ratio_closed_deal_appraise\" FROM \"properties\" \"property\" LEFT JOIN \"latest_approved_notes\" \"latestApprovedTH\" ON \"latestApprovedTH\".\"type\" = 'TH' AND \"latestApprovedTH\".\"property_id\" = \"property\".\"id\"  LEFT JOIN \"latest_approved_notes\" \"latestApprovedHD\" ON \"latestApprovedHD\".\"type\" = 'HD' AND \"latestApprovedHD\".\"property_id\" = \"property\".\"id\"  LEFT JOIN \"appraisal_statement_notes\" \"appraisalStatement\" ON \"appraisalStatement\".\"id\" = \"latestApprovedTH\".\"ref_id\"  LEFT JOIN \"investment_efficiency_notes\" \"investmentEfficiency\" ON \"investmentEfficiency\".\"id\" = \"latestApprovedHD\".\"ref_id\" WHERE \"property\".\"is_active\" = true");
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS typeorm_metadata
                             (
                                 "type"     varchar(255) NOT NULL,
                                 "database" varchar(255) DEFAULT NULL,
                                 "schema"   varchar(255) DEFAULT NULL,
                                 "table"    varchar(255) DEFAULT NULL,
                                 "name"     varchar(255) DEFAULT NULL,
                                 "value"    text
                             )`);
  }

}
