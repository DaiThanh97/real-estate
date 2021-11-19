import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeApprovedAtColumnToDate1604045940765 implements MigrationInterface {
    name = "ChangeApprovedAtColumnToDate1604045940765";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appraisal_statement_notes"
            DROP COLUMN "approved_at"`);
        await queryRunner.query(`ALTER TABLE "appraisal_statement_notes"
            ADD "approved_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
            DROP COLUMN "approved_at"`);
        await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
            ADD "approved_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
            DROP COLUMN "approved_at"`);
        await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
            ADD "approved_at" boolean`);
        await queryRunner.query(`ALTER TABLE "appraisal_statement_notes"
            DROP COLUMN "approved_at"`);
        await queryRunner.query(`ALTER TABLE "appraisal_statement_notes"
            ADD "approved_at" boolean`);
    }

}
