import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAppraisalExpectationNotesTable1606146989387 implements MigrationInterface {
    name = "AddAppraisalExpectationNotesTable1606146989387"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE \"appraisal_expectation_notes\" (\"id\" SERIAL NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"note_id\" character varying, \"note_type\" character varying, \"execution_date\" TIMESTAMP, \"assignee_id\" integer, \"company_id\" integer, \"instructor_id\" integer, \"status\" character varying, \"is_deleted\" boolean NOT NULL DEFAULT false, \"rejection_note\" character varying NOT NULL DEFAULT '', \"property_id\" integer, \"approved_at\" TIMESTAMP, \"rejected_at\" TIMESTAMP, \"address\" character varying, \"street_number\" character varying(64), \"city_id\" integer, \"district_id\" integer, \"ward_id\" integer, \"street_id\" integer, \"inspection_expectation_id\" integer, \"created_by\" integer, \"updated_by\" integer, \"approved_by\" integer, \"rejected_by\" integer, CONSTRAINT \"UNIQUE_APPRAISAL_EXPECTATION_NOTE_ID\" UNIQUE (\"note_id\"), CONSTRAINT \"PK_e4e911a93b0005033d8c4b35423\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("CREATE TABLE \"appraisal_expectation_plan_items\" (\"id\" SERIAL NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"appraisal_expectation_id\" integer, \"index\" integer, \"name\" character varying, \"plan_type_id\" integer, \"construction_type_id\" integer, \"description\" character varying, \"investment_time\" double precision, \"investment_at\" TIMESTAMP, \"price\" double precision, \"expectation_info\" jsonb, CONSTRAINT \"PK_91d93d5d8c07648798ea3296804\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD CONSTRAINT \"FK_ab6477cfd172d4da11ff2667ab2\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD CONSTRAINT \"FK_19642b8d66cd0db35c78a73d486\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD CONSTRAINT \"FK_830d91e6b81a41b57fa851297e9\" FOREIGN KEY (\"approved_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD CONSTRAINT \"FK_e17457439038cf3c7b8b24bd148\" FOREIGN KEY (\"property_id\") REFERENCES \"properties\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD CONSTRAINT \"FK_26ed5b4261cf490b65948ec48b2\" FOREIGN KEY (\"assignee_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD CONSTRAINT \"FK_b020bcbe45952582fb5d8488bfa\" FOREIGN KEY (\"company_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD CONSTRAINT \"FK_cf189975e743742bfa687188925\" FOREIGN KEY (\"instructor_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD CONSTRAINT \"FK_0dfed38fdf90b159e1f405d50d6\" FOREIGN KEY (\"rejected_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD CONSTRAINT \"FK_2edf365c00d0c414eebe0536f94\" FOREIGN KEY (\"city_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD CONSTRAINT \"FK_e26b319e5b5b7b70fb6a7a53fc0\" FOREIGN KEY (\"district_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD CONSTRAINT \"FK_4d6b83b6ad1d6c3e42c6b57637c\" FOREIGN KEY (\"ward_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD CONSTRAINT \"FK_027d5bfe0e723baf07a980b355f\" FOREIGN KEY (\"street_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" ADD CONSTRAINT \"FK_15aa15c575deac660422c164518\" FOREIGN KEY (\"inspection_expectation_id\") REFERENCES \"inspection_expectation_notes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_items\" ADD CONSTRAINT \"FK_fd63b98ccf007dcf4d7f4112f8e\" FOREIGN KEY (\"appraisal_expectation_id\") REFERENCES \"appraisal_expectation_notes\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_items\" ADD CONSTRAINT \"FK_7ee6002094cf216e5eaf8aeb670\" FOREIGN KEY (\"plan_type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_items\" ADD CONSTRAINT \"FK_b0edb37e1de83a0e04bd2d77f05\" FOREIGN KEY (\"construction_type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_items\" DROP CONSTRAINT \"FK_b0edb37e1de83a0e04bd2d77f05\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_items\" DROP CONSTRAINT \"FK_7ee6002094cf216e5eaf8aeb670\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_items\" DROP CONSTRAINT \"FK_fd63b98ccf007dcf4d7f4112f8e\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP CONSTRAINT \"FK_15aa15c575deac660422c164518\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP CONSTRAINT \"FK_027d5bfe0e723baf07a980b355f\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP CONSTRAINT \"FK_4d6b83b6ad1d6c3e42c6b57637c\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP CONSTRAINT \"FK_e26b319e5b5b7b70fb6a7a53fc0\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP CONSTRAINT \"FK_2edf365c00d0c414eebe0536f94\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP CONSTRAINT \"FK_0dfed38fdf90b159e1f405d50d6\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP CONSTRAINT \"FK_cf189975e743742bfa687188925\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP CONSTRAINT \"FK_b020bcbe45952582fb5d8488bfa\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP CONSTRAINT \"FK_26ed5b4261cf490b65948ec48b2\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP CONSTRAINT \"FK_e17457439038cf3c7b8b24bd148\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP CONSTRAINT \"FK_830d91e6b81a41b57fa851297e9\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP CONSTRAINT \"FK_19642b8d66cd0db35c78a73d486\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_notes\" DROP CONSTRAINT \"FK_ab6477cfd172d4da11ff2667ab2\"");
        await queryRunner.query("DROP TABLE \"appraisal_expectation_plan_items\"");
        await queryRunner.query("DROP TABLE \"appraisal_expectation_notes\"");
    }

}
