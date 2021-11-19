import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedStatusTime1617611570507 implements MigrationInterface {
  name = "ChangedStatusTime1617611570507";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "appraisal_expectation_notes"
        ADD "changed_status_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "appraisal_statement_notes"
        ADD "changed_status_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "inspection_expectation_notes"
        ADD "changed_status_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "changed_status_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD "changed_status_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD "changed_status_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_notes"
        ADD "changed_status_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "changed_status_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "changed_status_time"`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_notes"
        DROP COLUMN "changed_status_time"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP COLUMN "changed_status_time"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP COLUMN "changed_status_time"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "changed_status_time"`);
    await queryRunner.query(`ALTER TABLE "inspection_expectation_notes"
        DROP COLUMN "changed_status_time"`);
    await queryRunner.query(`ALTER TABLE "appraisal_statement_notes"
        DROP COLUMN "changed_status_time"`);
    await queryRunner.query(`ALTER TABLE "appraisal_expectation_notes"
        DROP COLUMN "changed_status_time"`);
  }

}
