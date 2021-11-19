import { MigrationInterface, QueryRunner } from "typeorm";

export class InvestmentEfficiency1606202215599 implements MigrationInterface {
  name = "InvestmentEfficiency1606202215599";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "investment_efficiency_notes"
                             (
                                 "id"                        SERIAL            NOT NULL,
                                 "created_at"                TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updated_at"                TIMESTAMP         NOT NULL DEFAULT now(),
                                 "note_id"                   character varying,
                                 "note_type"                 character varying,
                                 "execution_date"            TIMESTAMP,
                                 "assignee_id"               integer,
                                 "company_id"                integer,
                                 "instructor_id"             integer,
                                 "status"                    character varying,
                                 "is_deleted"                boolean           NOT NULL DEFAULT false,
                                 "rejection_note"            character varying NOT NULL DEFAULT '',
                                 "property_id"               integer,
                                 "approved_at"               TIMESTAMP,
                                 "rejected_at"               TIMESTAMP,
                                 "inspection_expectation_id" integer,
                                 "created_by"                integer,
                                 "updated_by"                integer,
                                 "approved_by"               integer,
                                 "rejected_by"               integer,
                                 "city_id"                   integer,
                                 "district_id"               integer,
                                 "ward_id"                   integer,
                                 "street_id"                 integer,
                                 CONSTRAINT "UNIQUE_HD_NOTE_ID" UNIQUE ("note_id"),
                                 CONSTRAINT "PK_ccbfb052f1db670206252a10396" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_4b026de0d140ae0b537d9704842" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_10b6822fa9e2ea71e10f19bd31b" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_bdf6b016bcf35e46e9b596e7582" FOREIGN KEY ("approved_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_7b499760f219e4e0aa5a7933f9f" FOREIGN KEY ("property_id") REFERENCES "properties" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_7ca76ea75dc8d5dbe515b95cded" FOREIGN KEY ("assignee_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_b7ccaec57abdd7462f1d55d908f" FOREIGN KEY ("company_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_371b530788ab0403cd5f29a5edc" FOREIGN KEY ("instructor_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_861c8b3a8c61aba76d2ede8d2ab" FOREIGN KEY ("rejected_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_b0d5e1a6638ec71d33a6ae94e5a" FOREIGN KEY ("city_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_30bd586bc175d2d96b705ff9881" FOREIGN KEY ("district_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_ff1a028e2aabf8ec4d60fae56d8" FOREIGN KEY ("ward_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_40aea81c420e2d4f048d441cc65" FOREIGN KEY ("street_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_2d60d86a9a3556f5656df3db419" FOREIGN KEY ("inspection_expectation_id") REFERENCES "inspection_expectation_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_2d60d86a9a3556f5656df3db419"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_40aea81c420e2d4f048d441cc65"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_ff1a028e2aabf8ec4d60fae56d8"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_30bd586bc175d2d96b705ff9881"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_b0d5e1a6638ec71d33a6ae94e5a"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_861c8b3a8c61aba76d2ede8d2ab"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_371b530788ab0403cd5f29a5edc"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_b7ccaec57abdd7462f1d55d908f"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_7ca76ea75dc8d5dbe515b95cded"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_7b499760f219e4e0aa5a7933f9f"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_bdf6b016bcf35e46e9b596e7582"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_10b6822fa9e2ea71e10f19bd31b"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_4b026de0d140ae0b537d9704842"`);
    await queryRunner.query("DROP TABLE \"investment_efficiency_notes\"");
  }

}
