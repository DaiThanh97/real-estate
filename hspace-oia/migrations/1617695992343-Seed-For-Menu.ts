import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForMenu1617695992343 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await ResourceSeed.run(queryRunner);
    // await MenuSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
