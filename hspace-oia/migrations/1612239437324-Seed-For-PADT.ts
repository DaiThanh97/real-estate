import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForPADT1612239437324 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // fixed update max id for account_group_features
        await queryRunner.query("SELECT setval('account_group_features_id_seq', (SELECT MAX(id) from \"account_group_features\"));");
        // await ResourceSeed.run(queryRunner);
        // await FeatureSeed.run(queryRunner);
        // await PolicySeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
