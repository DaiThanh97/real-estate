import { MigrationInterface, QueryRunner } from "typeorm";
export class SeedForPADTEndpointPermission1612429439212 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await EndpointPermissionSeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
