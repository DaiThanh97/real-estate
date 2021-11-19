import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnsAdjustmentsForAppraisalAuditDetailsTable1604654307186 implements MigrationInterface {
    name = "AddColumnsAdjustmentsForAppraisalAuditDetailsTable1604654307186"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"adjustments\" jsonb");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"adjustments\"");
    }

}
