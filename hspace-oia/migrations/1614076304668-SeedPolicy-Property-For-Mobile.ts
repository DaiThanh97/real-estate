import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPolicyPropertyForMobile1614076304668
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await PolicySeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
