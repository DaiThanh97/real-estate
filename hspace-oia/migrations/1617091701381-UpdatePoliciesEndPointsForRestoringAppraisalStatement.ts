import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePoliciesEndPointsForRestoringAppraisalStatement1617091701381 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await EndpointPermissionSeed.run(queryRunner);
        // await PolicySeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
