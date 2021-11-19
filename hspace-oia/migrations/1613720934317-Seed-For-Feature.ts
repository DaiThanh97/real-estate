import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForFeature1613720934317 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await FeatureSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }

}
