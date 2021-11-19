import {MigrationInterface, QueryRunner} from "typeorm";

export class addUpdateColumnsLandPropertyPriceForAppraisalStatementTable1604153218347 implements MigrationInterface {
    name = "addUpdateColumnsLandPropertyPriceForAppraisalStatementTable1604153218347"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"value_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"value_ppss\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"land_price_ppss\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"valued_property_ppss\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"land_price_ppdg\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"valued_property_ppdg\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP CONSTRAINT \"FK_7f3e4172dd5307fcb7b036f03c7\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ALTER COLUMN \"appraisal_statement_id\" DROP NOT NULL");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD CONSTRAINT \"FK_7f3e4172dd5307fcb7b036f03c7\" FOREIGN KEY (\"appraisal_statement_id\") REFERENCES \"appraisal_statement_notes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP CONSTRAINT \"FK_7f3e4172dd5307fcb7b036f03c7\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ALTER COLUMN \"appraisal_statement_id\" SET NOT NULL");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD CONSTRAINT \"FK_7f3e4172dd5307fcb7b036f03c7\" FOREIGN KEY (\"appraisal_statement_id\") REFERENCES \"appraisal_statement_notes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"valued_property_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"land_price_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"valued_property_ppss\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"land_price_ppss\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"value_ppss\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"value_ppdg\" integer");
    }

}
