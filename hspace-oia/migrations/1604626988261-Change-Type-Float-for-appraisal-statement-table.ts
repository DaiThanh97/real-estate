import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTypeFloatForAppraisalStatementTable1604626988261 implements MigrationInterface {
    name = "ChangeTypeFloatForAppraisalStatementTable1604626988261"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"market_land_unit_price\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"market_land_unit_price\" double precision");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"total_levels_advantage\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"total_levels_advantage\" double precision");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"total_levels_disadvantage\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"total_levels_disadvantage\" double precision");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"land_unit_price_ppss\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"land_unit_price_ppss\" double precision");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"property_unit_price_ppss\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"property_unit_price_ppss\" double precision");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"land_unit_price_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"land_unit_price_ppdg\" double precision");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"property_unit_price_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"property_unit_price_ppdg\" double precision");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"property_unit_price_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"property_unit_price_ppdg\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"land_unit_price_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"land_unit_price_ppdg\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"property_unit_price_ppss\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"property_unit_price_ppss\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"land_unit_price_ppss\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"land_unit_price_ppss\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"total_levels_disadvantage\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"total_levels_disadvantage\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"total_levels_advantage\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"total_levels_advantage\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"market_land_unit_price\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"market_land_unit_price\" integer");
    }

}
