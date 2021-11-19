import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsCityWardCompletedForAppraisalStatmentTable1604290289418 implements MigrationInterface {
    name = "addColumnsCityWardCompletedForAppraisalStatmentTable1604290289418"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"city_id\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"ward_id\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"completed_at\" TIMESTAMP");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"completed_by\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"execution_by\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_573531627060a6f191e98e30427\" FOREIGN KEY (\"city_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_f628e911c65084cbd98141c6bf5\" FOREIGN KEY (\"ward_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_9419e728ba26daeb0ee99a5677f\" FOREIGN KEY (\"completed_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_ccae8406ca45e0a4a892f0631e3\" FOREIGN KEY (\"execution_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_ccae8406ca45e0a4a892f0631e3\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_9419e728ba26daeb0ee99a5677f\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_f628e911c65084cbd98141c6bf5\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_573531627060a6f191e98e30427\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"execution_by\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"completed_by\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"completed_at\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"ward_id\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"city_id\"");
    }

}
