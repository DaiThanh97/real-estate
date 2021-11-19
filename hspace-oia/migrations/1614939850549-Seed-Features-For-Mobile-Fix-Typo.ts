import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedFeaturesForMobileFixTypo1614939850549 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //await FeatureSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
