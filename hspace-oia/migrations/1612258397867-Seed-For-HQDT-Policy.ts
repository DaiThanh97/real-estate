import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForHQDTPolicy1612258397867 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await PolicySeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
