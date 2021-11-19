import { MigrationInterface, QueryRunner } from "typeorm";

export class NoteIdCanBeNull1603869575932 implements MigrationInterface {
  name = "NoteIdCanBeNull1603869575932";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ALTER COLUMN "note_id" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ALTER COLUMN "note_id" SET NOT NULL`);
  }

}
