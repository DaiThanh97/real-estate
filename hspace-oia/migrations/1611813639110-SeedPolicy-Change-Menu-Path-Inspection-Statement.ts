import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPolicyChangeMenuPathInspectionStatement1611813639110 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // update max id auto for table features
    await queryRunner.query("SELECT setval('features_id_seq', (SELECT MAX(id) from \"features\"));");
    await queryRunner.query("SELECT setval('resources_id_seq', (SELECT MAX(id) from \"resources\"));");
    // await ResourceSeed.run(queryRunner);
    // await FeatureSeed.run(queryRunner);
    // await MenuSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
