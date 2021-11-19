import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInvestmentAtForInspectionExpectationPlanItemsTable1605597333377 implements MigrationInterface {
    name = "addColumnInvestmentAtForInspectionExpectationPlanItemsTable1605597333377"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD \"investment_at\" TIMESTAMP");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP COLUMN \"investment_at\"");
    }

}
