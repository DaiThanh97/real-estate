import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForPADTPolicy1612258397868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // fixed update max id for account_group_features
        await queryRunner.query("SELECT setval('account_groups_id_seq', (SELECT MAX(id) from \"account_groups\"));");
        // await ResourceSeed.run(queryRunner);
        // await FeatureSeed.run(queryRunner);
        // await PolicySeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
