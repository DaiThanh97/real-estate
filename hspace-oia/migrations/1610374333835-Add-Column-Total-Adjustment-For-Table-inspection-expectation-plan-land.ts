import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnTotalAdjustmentForTableInspectionExpectationPlanLand1610374333835 implements MigrationInterface {
    name = "AddColumnTotalAdjustmentForTableInspectionExpectationPlanLand1610374333835"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" ADD \"total_adjustment\" double precision");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" DROP COLUMN \"total_adjustment\"");
    }

}
