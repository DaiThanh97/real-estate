import { MigrationInterface, QueryRunner } from "typeorm";

export class InvestmentPlanPlanLandTime1605609270993 implements MigrationInterface {
  name = "InvestmentPlanPlanLandTime1605609270993";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        ADD "time" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        DROP COLUMN "time"`);
  }

}
