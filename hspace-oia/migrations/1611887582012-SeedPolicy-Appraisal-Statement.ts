import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPolicyAppraisalStatement1611887582012 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Note: remove data mapping feature vs resource
    await queryRunner.query("DELETE FROM account_group_features WHERE feature_id=73;");
    // await ResourceSeed.run(queryRunner);
    // await FeatureSeed.run(queryRunner);
    // await MenuSeed.run(queryRunner);
    // await PolicySeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
