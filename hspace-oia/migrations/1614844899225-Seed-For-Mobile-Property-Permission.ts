import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForMobilePropertyPermission1614844899225 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await ResourceSeed.run(queryRunner);
        // await PolicySeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
