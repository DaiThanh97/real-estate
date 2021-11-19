import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedResourcesFeaturesForMobile1614848283088
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await ResourceSeed.run(queryRunner);
    // await FeatureSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
