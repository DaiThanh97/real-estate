import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForFeaturesEndpointPermissions1613988759226 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await FeatureSeed.run(queryRunner);
    // await EndpointPermissionSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }

}
