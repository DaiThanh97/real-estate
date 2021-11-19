import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPoliciesForUpdatePropertyOnMobile1616042287857
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await PolicySeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
