import {MigrationInterface, QueryRunner} from "typeorm";

export class chanageColumnsAdjustPricesForAppraisalStatementTable1604328996696 implements MigrationInterface {
    name = "chanageColumnsAdjustPricesForAppraisalStatementTable1604328996696"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_f1aeec5e8e8ec30ef3a786030cc\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"general_dis_and_advantages\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"advantages\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"disadvantages\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"adjustments\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"parent_note_id\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"land_price_ppss\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"valued_property_ppss\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"land_price_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"valued_property_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"info_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"adjust_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"address\" character varying");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"total_adjustment\" double precision");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"market_land_unit_price\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"advantage_levels\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"disadvantage_levels\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"inspection_statement_id\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"address\" character varying");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"rejected_at\" TIMESTAMP");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"land_unit_price_ppss\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"property_unit_price_ppss\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"land_unit_price_ppdg\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"property_unit_price_ppdg\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"general_info_ppdg\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"adjust_control_ppdg\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"rejected_by\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_f5a65f0d30cdc96fa9405c2ecb6\" FOREIGN KEY (\"inspection_statement_id\") REFERENCES \"inspection_statement_notes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_9b913aa831f4be70aab5ad233b6\" FOREIGN KEY (\"rejected_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_9b913aa831f4be70aab5ad233b6\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_f5a65f0d30cdc96fa9405c2ecb6\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"rejected_by\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"adjust_control_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"general_info_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"property_unit_price_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"land_unit_price_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"property_unit_price_ppss\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"land_unit_price_ppss\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"rejected_at\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"address\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"inspection_statement_id\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"disadvantage_levels\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"advantage_levels\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"market_land_unit_price\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"total_adjustment\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"address\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"adjust_ppdg\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"info_ppdg\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"valued_property_ppdg\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"land_price_ppdg\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"valued_property_ppss\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"land_price_ppss\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"parent_note_id\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"adjustments\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"disadvantages\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"advantages\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"general_dis_and_advantages\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_f1aeec5e8e8ec30ef3a786030cc\" FOREIGN KEY (\"parent_note_id\") REFERENCES \"inspection_statement_notes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
