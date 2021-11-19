import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsTotalLevelsForAppraisalAuditDetailTable1604391864101 implements MigrationInterface {
    name = "addColumnsTotalLevelsForAppraisalAuditDetailTable1604391864101"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"total_levels_advantage\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD \"total_levels_disadvantage\" integer");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"total_levels_disadvantage\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP COLUMN \"total_levels_advantage\"");
    }

}
