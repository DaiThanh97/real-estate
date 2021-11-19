import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForPropertyNotification1614768695748
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await FeatureSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
