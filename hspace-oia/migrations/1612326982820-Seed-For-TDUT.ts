import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForTDUT1612326982820 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // reset id account_group_resources_id_seq
    await queryRunner.query(
      "SELECT setval('account_group_resources_id_seq', (SELECT MAX(id) from \"account_group_resources\"));"
    );
    // await ResourceSeed.run(queryRunner);
    // await FeatureSeed.run(queryRunner);
    // await PolicySeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
