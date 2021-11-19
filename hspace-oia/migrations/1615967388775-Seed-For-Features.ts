import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForFeatures1615967388775 implements MigrationInterface {
    name = "SeedForFeatures1615967388775";

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await FeatureSeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       return;
    }

}
