import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePoliciesEndPointsForDeletingInvestmentEfficiency1617000959247 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await EndpointPermissionSeed.run(queryRunner);
        // await PolicySeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
