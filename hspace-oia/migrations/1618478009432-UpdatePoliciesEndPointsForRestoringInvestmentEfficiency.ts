import {MigrationInterface, QueryRunner} from "typeorm";
import EndpointPermissionSeed from "../src/infrastructure/orm/typeorm/seed/endpointPermission";
import PolicySeed from "../src/infrastructure/orm/typeorm/seed/policy";

export class UpdatePoliciesEndPointsForRestoringInvestmentEfficiency1618478009432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await EndpointPermissionSeed.run(queryRunner);
        await PolicySeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
