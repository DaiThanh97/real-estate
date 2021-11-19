import { MigrationInterface, QueryRunner } from "typeorm";

export class PropertyAndNoteVersion1619068747761 implements MigrationInterface {
  name = "PropertyAndNoteVersion1619068747761";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "appraisal_expectation_notes"
        ADD "version" character varying(8) NOT NULL DEFAULT '1.000'`);
    await queryRunner.query(`ALTER TABLE "appraisal_statement_notes"
        ADD "version" character varying(8) NOT NULL DEFAULT '1.000'`);
    await queryRunner.query(`ALTER TABLE "inspection_expectation_notes"
        ADD "version" character varying(8) NOT NULL DEFAULT '1.000'`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "version" character varying(8) NOT NULL DEFAULT '1.000'`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD "version" character varying(8) NOT NULL DEFAULT '1.000'`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD "version" character varying(8) NOT NULL DEFAULT '1.000'`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_notes"
        ADD "version" character varying(8) NOT NULL DEFAULT '1.000'`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "version" character varying(8) NOT NULL DEFAULT '1.000'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "version"`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_notes"
        DROP COLUMN "version"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP COLUMN "version"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP COLUMN "version"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "version"`);
    await queryRunner.query(`ALTER TABLE "inspection_expectation_notes"
        DROP COLUMN "version"`);
    await queryRunner.query(`ALTER TABLE "appraisal_statement_notes"
        DROP COLUMN "version"`);
    await queryRunner.query(`ALTER TABLE "appraisal_expectation_notes"
        DROP COLUMN "version"`);
  }

}
