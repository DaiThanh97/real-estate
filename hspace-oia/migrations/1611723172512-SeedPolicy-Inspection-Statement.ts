import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPolicyInspectionStatemen1611723172512 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // update max id auto for table features
    await queryRunner.query("SELECT setval('features_id_seq', (SELECT MAX(id) from \"features\"));");
    // await ResourceSeed.run(queryRunner);
    // await FeatureSeed.run(queryRunner);
    // await PolicySeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
