import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnsAddressForAppraisalStatementsTable1604037526825 implements MigrationInterface {
    name = "AddColumnsAddressForAppraisalStatementsTable1604037526825"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"street_number\" character varying(64)");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"district_id\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"street_id\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_a3d4e3c23b62ba110fe0b29d488\" FOREIGN KEY (\"district_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD CONSTRAINT \"FK_02988166a518849e42cbe0f1573\" FOREIGN KEY (\"street_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_02988166a518849e42cbe0f1573\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP CONSTRAINT \"FK_a3d4e3c23b62ba110fe0b29d488\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"street_id\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"district_id\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"street_number\"");
    }

}
