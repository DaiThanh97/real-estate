import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForPADTPolicy1612410913499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await ResourceSeed.run(queryRunner);
        // await FeatureSeed.run(queryRunner);
        // await EndpointPermissionSeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
