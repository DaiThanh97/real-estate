import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProjectNegotiationNoteTable1606717427973 implements MigrationInterface {
    name = "AddProjectNegotiationNoteTable1606717427973"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`create table "project_negotiation_notes" (
            "id" SERIAL not null, 
            "created_at" TIMESTAMP not null default now(), 
            "updated_at" TIMESTAMP not null default now(), 
            "note_id" character varying, 
            "note_type" character varying, 
            "execution_date" TIMESTAMP, 
            "assignee_id" integer, 
            "company_id" integer, 
            "instructor_id" integer, 
            "status" character varying, 
            "is_deleted" boolean not null default false, 
            "rejection_note" character varying not null default '', 
            "property_id" integer, 
            "approved_at" TIMESTAMP, 
            "rejected_at" TIMESTAMP, 
            "investment_efficiency_id" integer, 
            "price" double precision, 
            "price_update" double precision, 
            "price_appraisal_statement" double precision, 
            "price_approved" double precision, 
            "priority" character varying, 
            "created_by" integer, 
            "updated_by" integer, 
            "approved_by" integer, 
            "rejected_by" integer, 
            "city_id" integer, 
            "district_id" integer, 
            "ward_id" integer, 
            "street_id" integer, 
            constraint "UNIQUE_PROJECT_NEGOTIATION_NOTE_ID" unique ("note_id"), 
            constraint "PK_bbfaf826bc1451c062f73b8c2e4" primary key ("id")
          )
          `);
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD CONSTRAINT \"FK_5b82faa243cab079ba06b04b8e8\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD CONSTRAINT \"FK_1eda16052dec6cfc5cc1f2a4e46\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD CONSTRAINT \"FK_a9cebf5b8667ad1a8610fe91cc2\" FOREIGN KEY (\"approved_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD CONSTRAINT \"FK_60f755d5ac1e69ffc9b5b708b3d\" FOREIGN KEY (\"property_id\") REFERENCES \"properties\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD CONSTRAINT \"FK_4833c0a4aaf63fe20ef64e77f2e\" FOREIGN KEY (\"assignee_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD CONSTRAINT \"FK_bd86dda35149416c00c2542077e\" FOREIGN KEY (\"company_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD CONSTRAINT \"FK_3f12b9bba077e615e60a55877fb\" FOREIGN KEY (\"instructor_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD CONSTRAINT \"FK_dc9c438854a1cdfb60ca3cded77\" FOREIGN KEY (\"rejected_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD CONSTRAINT \"FK_f46f2e2edcb906b21549aba5b51\" FOREIGN KEY (\"city_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD CONSTRAINT \"FK_4813472720492cdf28445581503\" FOREIGN KEY (\"district_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD CONSTRAINT \"FK_e12fee3e5b1d2421a82b57457b1\" FOREIGN KEY (\"ward_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD CONSTRAINT \"FK_7f7e6ad4ed97469ae7495cec298\" FOREIGN KEY (\"street_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD CONSTRAINT \"FK_4a5c37a8aa3a40ad6b5b27bea3a\" FOREIGN KEY (\"investment_efficiency_id\") REFERENCES \"investment_efficiency_notes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP CONSTRAINT \"FK_4a5c37a8aa3a40ad6b5b27bea3a\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP CONSTRAINT \"FK_7f7e6ad4ed97469ae7495cec298\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP CONSTRAINT \"FK_e12fee3e5b1d2421a82b57457b1\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP CONSTRAINT \"FK_4813472720492cdf28445581503\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP CONSTRAINT \"FK_f46f2e2edcb906b21549aba5b51\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP CONSTRAINT \"FK_dc9c438854a1cdfb60ca3cded77\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP CONSTRAINT \"FK_3f12b9bba077e615e60a55877fb\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP CONSTRAINT \"FK_bd86dda35149416c00c2542077e\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP CONSTRAINT \"FK_4833c0a4aaf63fe20ef64e77f2e\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP CONSTRAINT \"FK_60f755d5ac1e69ffc9b5b708b3d\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP CONSTRAINT \"FK_a9cebf5b8667ad1a8610fe91cc2\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP CONSTRAINT \"FK_1eda16052dec6cfc5cc1f2a4e46\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP CONSTRAINT \"FK_5b82faa243cab079ba06b04b8e8\"");
        await queryRunner.query("DROP TABLE \"project_negotiation_notes\"");
    }

}
