import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedEndpointPermissionForTDUT1614666569489 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await EndpointPermissionSeed.run(queryRunner);
    // await FeatureSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}

