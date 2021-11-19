import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnsCompletedAtCompletedByForAppraisalExpectationTable1606725122290 implements MigrationInterface {
    name = "AddColumnsCompletedAtCompletedByForAppraisalExpectationTable1606725122290"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD \"completed_at\" TIMESTAMP");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD \"completed_by\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD CONSTRAINT \"FK_f152c4ad6a1f3f9c9c22e1998cb\" FOREIGN KEY (\"completed_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP CONSTRAINT \"FK_f152c4ad6a1f3f9c9c22e1998cb\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP COLUMN \"completed_by\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP COLUMN \"completed_at\"");
    }

}
