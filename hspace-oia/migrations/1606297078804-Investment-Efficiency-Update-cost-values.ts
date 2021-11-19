import { MigrationInterface, QueryRunner } from "typeorm";

export class InvestmentEfficiencyUpdateCostValues1606297078804 implements MigrationInterface {
  name = "InvestmentEfficiencyUpdateCostValues1606297078804";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_efficiency_lands"
        ADD "investment_costs" jsonb`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_lands"
        ADD "purchase_price_analysis" jsonb`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        ADD "is_approved" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        ADD "investment_cost_total" jsonb`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        ADD "purchase_price_analysis_total" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        DROP COLUMN "purchase_price_analysis_total"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        DROP COLUMN "investment_cost_total"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        DROP COLUMN "is_approved"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_lands"
        DROP COLUMN "purchase_price_analysis"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_lands"
        DROP COLUMN "investment_costs"`);
  }

}
