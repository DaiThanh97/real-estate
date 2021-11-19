import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnsCommentsForTableAppraisalStatement1603936035686 implements MigrationInterface {
    name = "AddColumnsCommentsForTableAppraisalStatement1603936035686"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"comments\" text");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"comments\"");
    }

}
