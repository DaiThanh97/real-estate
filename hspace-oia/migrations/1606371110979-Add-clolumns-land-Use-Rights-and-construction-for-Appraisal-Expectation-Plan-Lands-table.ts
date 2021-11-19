import {MigrationInterface, QueryRunner} from "typeorm";

export class AddClolumnsLandUseRightsAndConstructionForAppraisalExpectationPlanLandsTable1606371110979 implements MigrationInterface {
    name = "AddClolumnsLandUseRightsAndConstructionForAppraisalExpectationPlanLandsTable1606371110979"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_lands\" ADD \"expectation_info\" jsonb");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_lands\" ADD \"land_use_rights\" jsonb");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_lands\" DROP COLUMN \"land_use_rights\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_lands\" DROP COLUMN \"expectation_info\"");
    }

}
