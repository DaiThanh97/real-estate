import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForPoliciesDeleteKSHT1616391097305 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await PolicySeed.run(queryRunner);
    // await EndpointPermissionSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }

}
