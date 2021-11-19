import { MigrationInterface, QueryRunner } from "typeorm";

export class RecognizedAreaCanBeNull1601882349216 implements MigrationInterface {
  name = "RecognizedAreaCanBeNull1601882349216";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties"
        ALTER COLUMN "recognized_area" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties"
        ALTER COLUMN "recognized_area" SET NOT NULL`);
  }

}
