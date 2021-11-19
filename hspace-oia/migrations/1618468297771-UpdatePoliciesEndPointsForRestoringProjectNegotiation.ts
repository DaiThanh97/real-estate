import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePoliciesEndPointsForRestoringProjectNegotiation1618468297771 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await EndpointPermissionSeed.run(queryRunner);
        // await PolicySeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
