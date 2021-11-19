import { MigrationInterface, QueryRunner } from "typeorm";

export class InvestmentPlan1605005888361 implements MigrationInterface {
  name = "InvestmentPlan1605005888361";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "investment_plan_notes"
                             (
                                 "id"                     SERIAL            NOT NULL,
                                 "created_at"             TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updated_at"             TIMESTAMP         NOT NULL DEFAULT now(),
                                 "note_id"                character varying,
                                 "note_type"              character varying,
                                 "execution_date"         TIMESTAMP,
                                 "assignee_id"            integer,
                                 "company_id"             integer,
                                 "instructor_id"          integer,
                                 "status"                 character varying,
                                 "is_deleted"             boolean           NOT NULL DEFAULT false,
                                 "rejection_note"         character varying NOT NULL DEFAULT '',
                                 "property_id"            integer,
                                 "approved_at"            TIMESTAMP,
                                 "rejected_at"            TIMESTAMP,
                                 "appraisal_statement_id" integer,
                                 "created_by"             integer,
                                 "updated_by"             integer,
                                 "approved_by"            integer,
                                 "rejected_by"            integer,
                                 CONSTRAINT "UNIQUE_INVESTMENT_PLAN_NOTE_ID" UNIQUE ("note_id"),
                                 CONSTRAINT "PK_27c97db33439440a01cb5e8fb07" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "investment_plan_items"
                             (
                                 "id"                   SERIAL            NOT NULL,
                                 "created_at"           TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updated_at"           TIMESTAMP         NOT NULL DEFAULT now(),
                                 "investment_plan_id"   integer,
                                 "index"                integer,
                                 "name"                 character varying NOT NULL DEFAULT '',
                                 "plan_type_id"         integer,
                                 "construction_type_id" integer,
                                 "description"          character varying NOT NULL DEFAULT '',
                                 "price"                integer,
                                 "investment_time"      double precision,
                                 CONSTRAINT "PK_5b1802450fb98c4b331f1cb7be6" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "investment_plan_lands"
                             (
                                 "id"           SERIAL    NOT NULL,
                                 "created_at"   TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at"   TIMESTAMP NOT NULL DEFAULT now(),
                                 "index"        integer,
                                 "plan_item_id" integer,
                                 CONSTRAINT "PK_77c1e8b8c83fc73e82e086097a3" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD CONSTRAINT "FK_2fd2ccf70ebab8c5016611dc538" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD CONSTRAINT "FK_331c48b19a8037fee8d070c1134" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD CONSTRAINT "FK_8c0de13d5d4ad424daaa3c596bc" FOREIGN KEY ("approved_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD CONSTRAINT "FK_ee6ffeec8c121666de9d35d56ad" FOREIGN KEY ("property_id") REFERENCES "properties" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD CONSTRAINT "FK_876ef042441de9bacbe43b7a0eb" FOREIGN KEY ("assignee_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD CONSTRAINT "FK_e726b39b5157a6614af6c9992fe" FOREIGN KEY ("company_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD CONSTRAINT "FK_a2061b19701e6bd6a1a9d2704c5" FOREIGN KEY ("instructor_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD CONSTRAINT "FK_35b85b7ff8dd3cb302ddd97b01b" FOREIGN KEY ("rejected_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD CONSTRAINT "FK_749293e40a2beb2bf2cc469d78a" FOREIGN KEY ("appraisal_statement_id") REFERENCES "appraisal_statement_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_items"
        ADD CONSTRAINT "FK_c68a348beb2b0efa953fedc3f26" FOREIGN KEY ("investment_plan_id") REFERENCES "investment_plan_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_items"
        ADD CONSTRAINT "FK_e596d47e559f635b64441ef5296" FOREIGN KEY ("plan_type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_items"
        ADD CONSTRAINT "FK_1584fcff59365a78ab17980fed4" FOREIGN KEY ("construction_type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        ADD CONSTRAINT "FK_bed2f38d6d9751518b710951262" FOREIGN KEY ("plan_item_id") REFERENCES "investment_plan_items" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        DROP CONSTRAINT "FK_bed2f38d6d9751518b710951262"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_items"
        DROP CONSTRAINT "FK_1584fcff59365a78ab17980fed4"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_items"
        DROP CONSTRAINT "FK_e596d47e559f635b64441ef5296"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_items"
        DROP CONSTRAINT "FK_c68a348beb2b0efa953fedc3f26"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP CONSTRAINT "FK_749293e40a2beb2bf2cc469d78a"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP CONSTRAINT "FK_35b85b7ff8dd3cb302ddd97b01b"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP CONSTRAINT "FK_a2061b19701e6bd6a1a9d2704c5"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP CONSTRAINT "FK_e726b39b5157a6614af6c9992fe"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP CONSTRAINT "FK_876ef042441de9bacbe43b7a0eb"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP CONSTRAINT "FK_ee6ffeec8c121666de9d35d56ad"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP CONSTRAINT "FK_8c0de13d5d4ad424daaa3c596bc"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP CONSTRAINT "FK_331c48b19a8037fee8d070c1134"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP CONSTRAINT "FK_2fd2ccf70ebab8c5016611dc538"`);
    await queryRunner.query("DROP TABLE \"investment_plan_lands\"");
    await queryRunner.query("DROP TABLE \"investment_plan_items\"");
    await queryRunner.query("DROP TABLE \"investment_plan_notes\"");
  }

}
