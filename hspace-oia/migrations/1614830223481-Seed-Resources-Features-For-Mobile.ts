import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedResourcesFeaturesForMobile1614830223481
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await ResourceSeed.run(queryRunner);
    // await FeatureSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
