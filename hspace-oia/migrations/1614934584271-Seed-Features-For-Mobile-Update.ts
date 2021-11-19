import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedFeaturesForMobile1614934584271 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await FeatureSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
