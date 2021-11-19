import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAppraisalStatementNotedTable1603871758173 implements MigrationInterface {
    name = "AddAppraisalStatementNotedTable1603871758173"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE \"appraisal_statement_notes\" (\"id\" SERIAL NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"note_id\" character varying, \"note_type\" character varying(128) DEFAULT 'Hiện trạng', \"execution_date\" TIMESTAMP, \"assignee_id\" integer, \"company_id\" integer, \"instructor_id\" integer, \"status\" character varying(128) DEFAULT 'Nháp', \"is_deleted\" boolean NOT NULL DEFAULT false, \"rejection_note\" character varying NOT NULL DEFAULT '', \"property_id\" integer, \"approved_at\" boolean, \"parent_note_id\" integer, \"created_by\" integer, \"updated_by\" integer, \"approved_by\" integer, CONSTRAINT \"UNIQUE_APPRAISAL_STATEMENT_NOTE_ID\" UNIQUE (\"note_id\"), CONSTRAINT \"PK_4ee334813cc46169e30fd5a97ca\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("ALTER TABLE \"inspection_statement_notes\" ALTER COLUMN \"note_id\" DROP NOT NULL");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_294c8d280936fe76b26218a9184\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_e0a687a82bd18e152c00bf3ef80\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_03ab55b7ca56a7107e1dabe5a43\" FOREIGN KEY (\"approved_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_c0d4be9aece0d5e6d3061908861\" FOREIGN KEY (\"property_id\") REFERENCES \"properties\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_706169fd1147802394f34d73900\" FOREIGN KEY (\"assignee_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_54033e1b5a581c9a4ca782bc69c\" FOREIGN KEY (\"company_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_c5d6f03b0e28a39feb39ee62965\" FOREIGN KEY (\"instructor_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_f1aeec5e8e8ec30ef3a786030cc\" FOREIGN KEY (\"parent_note_id\") REFERENCES \"inspection_statement_notes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_f1aeec5e8e8ec30ef3a786030cc\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_c5d6f03b0e28a39feb39ee62965\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_54033e1b5a581c9a4ca782bc69c\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_706169fd1147802394f34d73900\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_c0d4be9aece0d5e6d3061908861\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_03ab55b7ca56a7107e1dabe5a43\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_e0a687a82bd18e152c00bf3ef80\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_294c8d280936fe76b26218a9184\"");
        await queryRunner.query("ALTER TABLE \"inspection_statement_notes\" ALTER COLUMN \"note_id\" SET NOT NULL");
        await queryRunner.query("DROP TABLE \"appraisal_statement_notes\"");
    }

}
