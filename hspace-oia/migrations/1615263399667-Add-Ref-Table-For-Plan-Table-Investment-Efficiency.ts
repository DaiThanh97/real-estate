import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRefTableForPlanTableInvestmentEfficiency1615263399667 implements MigrationInterface {
    name = "AddRefTableForPlanTableInvestmentEfficiency1615263399667"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"investment_efficiency_plan_items\" ADD \"ref_investment_efficiency_info\" jsonb");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"investment_efficiency_plan_items\" DROP COLUMN \"ref_investment_efficiency_info\"");
    }

}
