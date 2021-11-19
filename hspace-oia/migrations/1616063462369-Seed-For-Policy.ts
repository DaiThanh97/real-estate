import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForPolicy1616063462369 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await PolicySeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }

}
