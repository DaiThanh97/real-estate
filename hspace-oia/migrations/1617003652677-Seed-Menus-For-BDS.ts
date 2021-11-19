import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedMenusForBDS1617003652677 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "SELECT setval('menu_id_seq', (SELECT MAX(id) from \"menu\"));"
    );
    // await ResourceSeed.run(queryRunner);
    //await FeatureSeed.run(queryRunner);
    // await MenuSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
