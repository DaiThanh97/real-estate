import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForTLDAEndpointPermission1614828702081 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await EndpointPermissionSeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
