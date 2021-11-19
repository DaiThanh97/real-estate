import { MigrationInterface, QueryRunner } from "typeorm";

export class InvestmentEfficiencyUpdateAppraisalExpectation1606461485973 implements MigrationInterface {
  name = "InvestmentEfficiencyUpdateAppraisalExpectation1606461485973";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_2d60d86a9a3556f5656df3db419"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP COLUMN "inspection_expectation_id"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_aadfd12e9dd485a7ba74f34f659" FOREIGN KEY ("appraisal_expectation_id") REFERENCES "appraisal_expectation_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_aadfd12e9dd485a7ba74f34f659"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD "inspection_expectation_id" integer`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_2d60d86a9a3556f5656df3db419" FOREIGN KEY ("inspection_expectation_id") REFERENCES "appraisal_expectation_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

}
