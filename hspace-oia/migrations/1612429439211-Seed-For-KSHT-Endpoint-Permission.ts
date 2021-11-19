import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForKSHTEndpointPermission1612429439211 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await EndpointPermissionSeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
