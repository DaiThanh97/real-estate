import {MigrationInterface, QueryRunner} from "typeorm";

export class AddModelColumnSourceIdForNoteTable1606453625451 implements MigrationInterface {
    name = "AddModelColumnSourceIdForNoteTable1606453625451"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP CONSTRAINT \"FK_2a6c071a426d54bb3f256d977ac\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP CONSTRAINT \"FK_73ff9677b176fdff2bc08e32a3a\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP COLUMN \"is_active\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP COLUMN \"created_by\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP COLUMN \"updated_by\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_items\" ADD \"source_id\" integer");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD \"source_id\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_items\" ADD CONSTRAINT \"FK_06083dd64d127710003ac38801b\" FOREIGN KEY (\"source_id\") REFERENCES \"investment_plan_items\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD CONSTRAINT \"FK_95fe31b9b26c9edac10a4822fc3\" FOREIGN KEY (\"source_id\") REFERENCES \"investment_plan_items\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP CONSTRAINT \"FK_95fe31b9b26c9edac10a4822fc3\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_items\" DROP CONSTRAINT \"FK_06083dd64d127710003ac38801b\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP COLUMN \"source_id\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_items\" DROP COLUMN \"source_id\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD \"updated_by\" integer");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD \"created_by\" integer");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD \"is_active\" boolean NOT NULL DEFAULT true");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD CONSTRAINT \"FK_73ff9677b176fdff2bc08e32a3a\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD CONSTRAINT \"FK_2a6c071a426d54bb3f256d977ac\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
