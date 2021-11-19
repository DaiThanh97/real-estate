import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedFeaturesForTLDA1615523815161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await FeatureSeed.run(queryRunner);
    // await PolicySeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
