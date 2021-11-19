import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForFeature1614243658340 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await FeatureSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }

}
