import {MigrationInterface, QueryRunner} from "typeorm";

export class updateColumnsTypeJsonbForAppraisalStatmentTable1604244699911 implements MigrationInterface {
    name = "updateColumnsTypeJsonbForAppraisalStatmentTable1604244699911"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"property_info\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"property_info\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"use_right_certificate\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"use_right_certificate\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"construction\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"construction\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"general_dis_and_advantages\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"general_dis_and_advantages\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"advantages\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"advantages\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"disadvantages\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"disadvantages\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"adjustments\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"adjustments\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"comments\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"comments\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"result_audit_ppss\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"result_audit_ppss\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"info_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"info_ppdg\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"adjust_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"adjust_ppdg\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"result_audit_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"result_audit_ppdg\" jsonb");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"result_audit_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"result_audit_ppdg\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"adjust_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"adjust_ppdg\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"info_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"info_ppdg\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"result_audit_ppss\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"result_audit_ppss\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"comments\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"comments\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"adjustments\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"adjustments\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"disadvantages\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"disadvantages\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"advantages\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"advantages\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"general_dis_and_advantages\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"general_dis_and_advantages\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"construction\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"construction\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"use_right_certificate\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"use_right_certificate\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"property_info\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"property_info\" text");
    }

}
