import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTypeInvestmentTimeForInspectionExpectationNotesTable1605248409925 implements MigrationInterface {
    name = "ChangeTypeInvestmentTimeForInspectionExpectationNotesTable1605248409925"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP COLUMN \"investment_time\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD \"investment_time\" double precision");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP COLUMN \"investment_time\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD \"investment_time\" date");
    }

}
