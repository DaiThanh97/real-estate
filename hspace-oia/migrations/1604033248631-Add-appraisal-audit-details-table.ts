import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAppraisalAuditDetailsTable1604033248631 implements MigrationInterface {
    name = "AddAppraisalAuditDetailsTable1604033248631"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE \"appraisal_audit_details\" (\"id\" SERIAL NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"is_active\" boolean NOT NULL DEFAULT true, \"appraisal_statement_id\" integer NOT NULL, \"inspection_statement_id\" integer NOT NULL, \"property_id\" integer NOT NULL, \"type\" character varying(128), \"property_info\" text, \"use_right_certificate\" text, \"construction\" text, \"general_dis_and_advantages\" text, \"advantages\" text, \"disadvantages\" text, \"adjustments\" text, \"created_by\" integer, \"updated_by\" integer, CONSTRAINT \"PK_2e6a69fcd768b1a2ad98b9e320e\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"result_audit_ppss\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"value_ppss\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"info_ppdg\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"adjust_ppdg\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"result_audit_ppdg\" text");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" ADD \"value_ppdg\" integer");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD CONSTRAINT \"FK_be6c2f1f92312f10e5053ce9b21\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD CONSTRAINT \"FK_dd1fa898835c4f06287bb3504ec\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD CONSTRAINT \"FK_81eb74601cfeffe33cd30f4b38d\" FOREIGN KEY (\"inspection_statement_id\") REFERENCES \"inspection_statement_notes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD CONSTRAINT \"FK_7f3e4172dd5307fcb7b036f03c7\" FOREIGN KEY (\"appraisal_statement_id\") REFERENCES \"appraisal_statement_notes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" ADD CONSTRAINT \"FK_8a0626ce8a3e64a80eec211e61d\" FOREIGN KEY (\"property_id\") REFERENCES \"properties\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP CONSTRAINT \"FK_8a0626ce8a3e64a80eec211e61d\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP CONSTRAINT \"FK_7f3e4172dd5307fcb7b036f03c7\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP CONSTRAINT \"FK_81eb74601cfeffe33cd30f4b38d\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP CONSTRAINT \"FK_dd1fa898835c4f06287bb3504ec\"");
        await queryRunner.query("ALTER TABLE \"appraisal_audit_details\" DROP CONSTRAINT \"FK_be6c2f1f92312f10e5053ce9b21\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"value_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"result_audit_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"adjust_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"info_ppdg\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"value_ppss\"");
        await queryRunner.query("ALTER TABLE \"appraisal_statement_notes\" DROP COLUMN \"result_audit_ppss\"");
        await queryRunner.query("DROP TABLE \"appraisal_audit_details\"");
    }

}
