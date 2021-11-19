import { MigrationInterface, QueryRunner } from "typeorm";

export class InvestmentPlanItemRefConstructionInfo1605673855733 implements MigrationInterface {
    name = "InvestmentPlanItemRefConstructionInfo1605673855733";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "investment_plan_items"
            ADD "ref_construction_info" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "investment_plan_items"
            DROP COLUMN "ref_construction_info"`);
    }

}
