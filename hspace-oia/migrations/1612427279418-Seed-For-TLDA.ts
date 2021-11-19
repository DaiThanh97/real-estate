import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForTLDA1612427279418 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await ResourceSeed.run(queryRunner);
        // await FeatureSeed.run(queryRunner);
        // await EndpointPermissionSeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
