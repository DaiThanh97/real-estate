import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInspectionStatementNotesTable1603789040047 implements MigrationInterface {
  name = "AddInspectionStatementNotesTable1603789040047";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "inspection_statement_notes"
                             (
                                 "id"             SERIAL            NOT NULL,
                                 "created_at"     TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updated_at"     TIMESTAMP         NOT NULL DEFAULT now(),
                                 "note_id"        character varying NOT NULL,
                                 "note_type"      character varying,
                                 "execution_date" TIMESTAMP,
                                 "assignee_id"    integer,
                                 "company_id"     integer,
                                 "instructor_id"  integer,
                                 "status"         character varying,
                                 "is_deleted"     boolean           NOT NULL DEFAULT false,
                                 "rejection_note" character varying NOT NULL DEFAULT '',
                                 "property_id"    integer,
                                 "approved_at"    boolean,
                                 "created_by"     integer,
                                 "updated_by"     integer,
                                 "approved_by"    integer,
                                 CONSTRAINT "UNIQUE_NOTE_ID" UNIQUE ("note_id"),
                                 CONSTRAINT "PK_b0a38f022e7c3468c503a8b26f5" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_fb499f168a7779a6b7d83462e97" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_5e0a9529ee0ea2426d623cb5b97" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_6b0efa5125a7a3f92a9085d3d3f" FOREIGN KEY ("approved_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_1591d2ca6e710a34efe8846182d" FOREIGN KEY ("property_id") REFERENCES "properties" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_6979bbf5dc3fe211d5182902a30" FOREIGN KEY ("assignee_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_8cb2219bfbaeb52fa72b66977c4" FOREIGN KEY ("company_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_5208bd94c9e4c43075034f6c5c5" FOREIGN KEY ("instructor_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_5208bd94c9e4c43075034f6c5c5"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_8cb2219bfbaeb52fa72b66977c4"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_6979bbf5dc3fe211d5182902a30"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_1591d2ca6e710a34efe8846182d"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_6b0efa5125a7a3f92a9085d3d3f"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_5e0a9529ee0ea2426d623cb5b97"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_fb499f168a7779a6b7d83462e97"`);
    await queryRunner.query("DROP TABLE \"inspection_statement_notes\"");
  }

}
