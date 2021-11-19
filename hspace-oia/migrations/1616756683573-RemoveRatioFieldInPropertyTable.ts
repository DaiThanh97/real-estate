import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveRatioFieldInPropertyTable1616756683573 implements MigrationInterface {
  name = "RemoveRatioFieldInPropertyTable1616756683573";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "ratio_changeable_appraise"`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "ratio_changeable_buy"`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "difference_price"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "difference_price" double precision NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "ratio_changeable_buy" double precision NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "ratio_changeable_appraise" double precision NOT NULL DEFAULT '0'`);
  }

}
