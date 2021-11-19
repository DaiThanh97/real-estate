import { MigrationInterface, QueryRunner } from "typeorm";

export class InvestmentPlanContruction1605520247173 implements MigrationInterface {
  name = "InvestmentPlanContruction1605520247173";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        ADD "construction" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        DROP COLUMN "construction"`);
  }

}
