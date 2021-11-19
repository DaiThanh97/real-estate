import { MigrationInterface, Not, QueryRunner } from "typeorm";
import Beans from "../src/infrastructure/config/beans";
import buildBeans from "../src/infrastructure/config/service-locator";
import { PropertyStatus } from "../src/infrastructure/orm/typeorm/models/Property";
import { InspectionStatementStatus } from "../src/infrastructure/orm/typeorm/models/InspectionStatement";
import { NoteType } from "../src/infrastructure/orm/typeorm/models/LatestApprovedNote";
import { AppraisalStatementStatus } from "../src/domain/models/AppraisalStatement";
import { InvestmentEfficiencyStatus } from "../src/infrastructure/orm/typeorm/models/InvestmentEfficiency";


async function seedLatestApprovedNotes(queryRunner: QueryRunner) {
  const beans: Beans = await buildBeans(queryRunner.manager);
  const properties = await beans.propertyRepository.find({
    select: ["id", "status"],
    where: {
      status: Not(PropertyStatus.Drafting)
    }
  });
  for (const property of properties) {
    const kh = await beans.inspectionStatementRepository.findOne({
      select: ["id", "approvedAt"],
      where: {
        propertyId: property.id,
        status: InspectionStatementStatus.Approved,
      },
      order: { approvedAt: "DESC" }
    });
    if (kh) {
      await beans.latestApprovedNoteRepository.updateOrCreate({
        refId: kh.id,
        type: NoteType.KH,
        propertyId: property.id,
      });
    }

    const th = await beans.appraisalStatementRepository.findOne({
      select: ["id", "approvedAt"],
      where: {
        propertyId: property.id,
        status: AppraisalStatementStatus.Approved,
      },
      order: { approvedAt: "DESC" }
    });
    if (th) {
      await beans.latestApprovedNoteRepository.updateOrCreate({
        refId: th.id,
        type: NoteType.TH,
        propertyId: property.id,
      });
    }

    const hd = await beans.investmentEfficiencyRepository.findOne({
      select: ["id", "approvedAt"],
      where: {
        propertyId: property.id,
        status: InvestmentEfficiencyStatus.Approved,
      },
      order: { approvedAt: "DESC" }
    });
    if (hd) {
      await beans.latestApprovedNoteRepository.updateOrCreate({
        refId: hd.id,
        type: NoteType.HD,
        propertyId: property.id,
      });
    }
  }
}


export class LatestApprovedNotes1616648270900 implements MigrationInterface {
  name = "LatestApprovedNotes1616648270900";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "latest_approved_notes"
                             (
                                 "id"          SERIAL                NOT NULL,
                                 "created_at"  TIMESTAMP             NOT NULL DEFAULT now(),
                                 "updated_at"  TIMESTAMP             NOT NULL DEFAULT now(),
                                 "ref_id"      integer               NOT NULL,
                                 "type"        character varying(20) NOT NULL,
                                 "property_id" integer               NOT NULL,
                                 "created_by"  integer,
                                 "updated_by"  integer,
                                 CONSTRAINT "PK_a73de3c42d6bccb4185d1409ad4" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "latest_approved_notes"
        ADD CONSTRAINT "FK_109366412cde96c2aeec3d7d554" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "latest_approved_notes"
        ADD CONSTRAINT "FK_f89f7c6f608ba4c9ef8b6fa8178" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "latest_approved_notes"
        ADD CONSTRAINT "FK_8e2b8737a8071bb7664e1716705" FOREIGN KEY ("property_id") REFERENCES "properties" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
    await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value")
                             VALUES ($1, $2, $3, $4)`, ["VIEW", "public", "property_price_view", "SELECT \"property\".\"id\" AS \"id\", \"property\".\"closed_deal_value\" AS \"closed_deal_value\", \"property\".\"changeable_price\" AS \"changeable_price\", \"latestApprovedTH\".\"ref_id\" AS \"appraisal_statement_id\", \"latestApprovedHD\".\"ref_id\" AS \"investment_efficiency_id\", \"appraisalStatement\".\"property_unit_price_ppss\" AS \"property_unit_price_ppss\", \"investmentEfficiency\".\"approved_purchase_price\" AS \"approved_purchase_price\", changeable_price - approved_purchase_price AS \"difference_price\", CAST(changeable_price AS float)/CAST(approved_purchase_price AS float) AS \"ratio_changeable_buy\", CAST(changeable_price AS float)/CAST(property_unit_price_ppss AS float) AS \"ratio_changeable_appraise\", CAST(closed_deal_value AS float)/CAST(property_unit_price_ppss AS float) AS \"ratio_closed_deal_appraise\" FROM \"properties\" \"property\" LEFT JOIN \"latest_approved_notes\" \"latestApprovedTH\" ON \"latestApprovedTH\".\"type\" = 'TH' AND \"latestApprovedTH\".\"property_id\" = \"property\".\"id\"  LEFT JOIN \"latest_approved_notes\" \"latestApprovedHD\" ON \"latestApprovedHD\".\"type\" = 'HD' AND \"latestApprovedHD\".\"property_id\" = \"property\".\"id\"  LEFT JOIN \"appraisal_statement_notes\" \"appraisalStatement\" ON \"appraisalStatement\".\"id\" = \"latestApprovedTH\".\"ref_id\"  LEFT JOIN \"investment_efficiency_notes\" \"investmentEfficiency\" ON \"investmentEfficiency\".\"id\" = \"latestApprovedHD\".\"ref_id\" WHERE \"property\".\"is_active\" = true"]);
    await queryRunner.query("CREATE VIEW \"property_view\" AS SELECT \"property\".\"id\" AS \"id\", \"property\".\"updated_at\" AS \"updated_at\", \"property\".\"street_number\" AS \"street_number\", \"property\".\"price\" AS \"price\", \"property\".\"ward_id\" AS \"ward_id\", \"property\".\"district_id\" AS \"district_id\", \"property\".\"street_id\" AS \"street_id\", \"property\".\"business_status\" AS \"business_status\", \"property\".\"status\" AS \"status\", \"property\".\"code\" AS \"code\", \"property\".\"broker_id\" AS \"broker_id\", \"property\".\"changeable_price\" AS \"changeable_price\", \"street\".\"value_name\" AS \"street_name\", \"district\".\"value_name\" AS \"district_name\", \"ward\".\"value_name\" AS \"ward_name\", \"broker\".\"display_name\" AS \"broker_display_name\", \"bookmark\".\"id\" AS \"bookmark_id\", \"bookmark\".\"created_at\" AS \"bookmark_created_at\", \"bookmark\".\"updated_at\" AS \"bookmark_updated_at\", \"bookmark\".\"is_active\" AS \"bookmark_is_active\", \"bookmark\".\"property_id\" AS \"bookmark_property_id\", \"bookmark\".\"bookmarker_id\" AS \"bookmark_bookmarker_id\", \"bookmark\".\"bookmark_date\" AS \"bookmark_bookmark_date\", \"bookmark\".\"type\" AS \"bookmark_type\", \"bookmark\".\"created_by\" AS \"bookmark_created_by\", \"bookmark\".\"updated_by\" AS \"bookmark_updated_by\", \"maker\".\"display_name\" AS \"marker_display_name\" FROM \"properties\" \"property\" LEFT JOIN \"master_values\" \"street\" ON \"street\".\"id\" = \"property\".\"street_id\"  LEFT JOIN \"master_values\" \"district\" ON \"district\".\"id\" = \"property\".\"district_id\"  LEFT JOIN \"master_values\" \"ward\" ON \"ward\".\"id\" = \"property\".\"ward_id\"  LEFT JOIN \"accounts\" \"broker\" ON \"broker\".\"id\" = \"property\".\"broker_id\"  LEFT JOIN \"property_bookmarks\" \"bookmark\" ON \"bookmark\".\"property_id\"=\"property\".\"id\"  LEFT JOIN \"accounts\" \"maker\" ON \"maker\".\"id\" = \"bookmark\".\"bookmarker_id\" WHERE \"property\".\"is_active\" = true AND \"property\".\"status\" = 'Đã duyệt'");
    await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value")
                             VALUES ($1, $2, $3, $4)`, ["VIEW", "public", "property_view", "SELECT \"property\".\"id\" AS \"id\", \"property\".\"updated_at\" AS \"updated_at\", \"property\".\"street_number\" AS \"street_number\", \"property\".\"price\" AS \"price\", \"property\".\"ward_id\" AS \"ward_id\", \"property\".\"district_id\" AS \"district_id\", \"property\".\"street_id\" AS \"street_id\", \"property\".\"business_status\" AS \"business_status\", \"property\".\"status\" AS \"status\", \"property\".\"code\" AS \"code\", \"property\".\"broker_id\" AS \"broker_id\", \"property\".\"changeable_price\" AS \"changeable_price\", \"street\".\"value_name\" AS \"street_name\", \"district\".\"value_name\" AS \"district_name\", \"ward\".\"value_name\" AS \"ward_name\", \"broker\".\"display_name\" AS \"broker_display_name\", \"bookmark\".\"id\" AS \"bookmark_id\", \"bookmark\".\"created_at\" AS \"bookmark_created_at\", \"bookmark\".\"updated_at\" AS \"bookmark_updated_at\", \"bookmark\".\"is_active\" AS \"bookmark_is_active\", \"bookmark\".\"property_id\" AS \"bookmark_property_id\", \"bookmark\".\"bookmarker_id\" AS \"bookmark_bookmarker_id\", \"bookmark\".\"bookmark_date\" AS \"bookmark_bookmark_date\", \"bookmark\".\"type\" AS \"bookmark_type\", \"bookmark\".\"created_by\" AS \"bookmark_created_by\", \"bookmark\".\"updated_by\" AS \"bookmark_updated_by\", \"maker\".\"display_name\" AS \"marker_display_name\" FROM \"properties\" \"property\" LEFT JOIN \"master_values\" \"street\" ON \"street\".\"id\" = \"property\".\"street_id\"  LEFT JOIN \"master_values\" \"district\" ON \"district\".\"id\" = \"property\".\"district_id\"  LEFT JOIN \"master_values\" \"ward\" ON \"ward\".\"id\" = \"property\".\"ward_id\"  LEFT JOIN \"accounts\" \"broker\" ON \"broker\".\"id\" = \"property\".\"broker_id\"  LEFT JOIN \"property_bookmarks\" \"bookmark\" ON \"bookmark\".\"property_id\"=\"property\".\"id\"  LEFT JOIN \"accounts\" \"maker\" ON \"maker\".\"id\" = \"bookmark\".\"bookmarker_id\" WHERE \"property\".\"is_active\" = true AND \"property\".\"status\" = 'Đã duyệt'"]);
    await seedLatestApprovedNotes(queryRunner);
    await queryRunner.query("REFRESH MATERIALIZED VIEW property_price_view;");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE
                             FROM "typeorm_metadata"
                             WHERE "type" = 'VIEW'
                               AND "schema" = $1
                               AND "name" = $2`, ["public", "property_view"]);
    await queryRunner.query("DROP VIEW \"property_view\"");
    await queryRunner.query(`DELETE
                             FROM "typeorm_metadata"
                             WHERE "type" = 'VIEW'
                               AND "schema" = $1
                               AND "name" = $2`, ["public", "property_price_view"]);
    await queryRunner.query("DROP MATERIALIZED VIEW \"property_price_view\"");
    await queryRunner.query(`ALTER TABLE "latest_approved_notes"
        DROP CONSTRAINT "FK_8e2b8737a8071bb7664e1716705"`);
    await queryRunner.query(`ALTER TABLE "latest_approved_notes"
        DROP CONSTRAINT "FK_f89f7c6f608ba4c9ef8b6fa8178"`);
    await queryRunner.query(`ALTER TABLE "latest_approved_notes"
        DROP CONSTRAINT "FK_109366412cde96c2aeec3d7d554"`);
    await queryRunner.query("DROP TABLE \"latest_approved_notes\"");
  }

}
