import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPolicyInspectionExpectation1612153231396 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await ResourceSeed.run(queryRunner);
    // await FeatureSeed.run(queryRunner);
    // await PolicySeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
