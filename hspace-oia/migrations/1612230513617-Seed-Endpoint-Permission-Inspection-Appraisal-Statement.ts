import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedEndpointPermissionInspectionAppraisalStatement1612230513617 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await EndpointPermissionSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
