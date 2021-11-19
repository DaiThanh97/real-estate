import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForHQDT1612176885400 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await ResourceSeed.run(queryRunner);
        // await FeatureSeed.run(queryRunner);
        // await PolicySeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
