import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectNegotiationPlanStep1607341073421 implements MigrationInterface {
  name = "ProjectNegotiationPlanStep1607341073421";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "project_negotiation_action_details"
                             (
                                 "id"         SERIAL    NOT NULL,
                                 "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                                 "action"     character varying,
                                 "created_by" integer,
                                 "updated_by" integer,
                                 CONSTRAINT "PK_8646af501bdaf9f04501436911b" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "project_negotiation_opinion_details"
                             (
                                 "id"         SERIAL    NOT NULL,
                                 "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                                 "opinion"    character varying,
                                 "created_by" integer,
                                 "updated_by" integer,
                                 CONSTRAINT "PK_9e82fd30cea3357a0367ace5edd" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "project_negotiation_plan_steps"
                             (
                                 "id"                     SERIAL    NOT NULL,
                                 "created_at"             TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at"             TIMESTAMP NOT NULL DEFAULT now(),
                                 "category_id"            integer,
                                 "project_negotiation_id" integer,
                                 "target"                 character varying,
                                 "result"                 character varying,
                                 "start_date"             date,
                                 "end_date"               date,
                                 "broker_id"              integer,
                                 "action_detail_id"       integer,
                                 "opinion_detail_id"      integer,
                                 "created_by"             integer,
                                 "updated_by"             integer,
                                 CONSTRAINT "REL_73a8a08c1b51f0c660df1c2f74" UNIQUE ("action_detail_id"),
                                 CONSTRAINT "REL_8af20d498d761263dcd0ab66cd" UNIQUE ("opinion_detail_id"),
                                 CONSTRAINT "PK_7aa823e1b9c5f624f5ba73b84c6" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_action_details"
        ADD CONSTRAINT "FK_ff0ebe6f7ef4ad47122847f47c1" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_action_details"
        ADD CONSTRAINT "FK_4b2c1c91843d52a57cba3b3038e" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_opinion_details"
        ADD CONSTRAINT "FK_5143d37cfb7689804726afe644e" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_opinion_details"
        ADD CONSTRAINT "FK_32f111f6a2e7a60794a985ddb36" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_plan_steps"
        ADD CONSTRAINT "FK_de520ea9c3f2827de2535753727" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_plan_steps"
        ADD CONSTRAINT "FK_e9c32639ce04198e011de5d01f1" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_plan_steps"
        ADD CONSTRAINT "FK_4717af23731e0b1de42ef38c14d" FOREIGN KEY ("project_negotiation_id") REFERENCES "project_negotiation_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_plan_steps"
        ADD CONSTRAINT "FK_daefd4513a2e96a9340cd73b4a8" FOREIGN KEY ("category_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_plan_steps"
        ADD CONSTRAINT "FK_e7c11130be21c6bf312c868772b" FOREIGN KEY ("broker_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_plan_steps"
        ADD CONSTRAINT "FK_73a8a08c1b51f0c660df1c2f74e" FOREIGN KEY ("action_detail_id") REFERENCES "project_negotiation_action_details" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_plan_steps"
        ADD CONSTRAINT "FK_8af20d498d761263dcd0ab66cd7" FOREIGN KEY ("opinion_detail_id") REFERENCES "project_negotiation_opinion_details" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "project_negotiation_plan_steps"
        DROP CONSTRAINT "FK_8af20d498d761263dcd0ab66cd7"`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_plan_steps"
        DROP CONSTRAINT "FK_73a8a08c1b51f0c660df1c2f74e"`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_plan_steps"
        DROP CONSTRAINT "FK_e7c11130be21c6bf312c868772b"`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_plan_steps"
        DROP CONSTRAINT "FK_daefd4513a2e96a9340cd73b4a8"`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_plan_steps"
        DROP CONSTRAINT "FK_4717af23731e0b1de42ef38c14d"`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_plan_steps"
        DROP CONSTRAINT "FK_e9c32639ce04198e011de5d01f1"`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_plan_steps"
        DROP CONSTRAINT "FK_de520ea9c3f2827de2535753727"`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_opinion_details"
        DROP CONSTRAINT "FK_32f111f6a2e7a60794a985ddb36"`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_opinion_details"
        DROP CONSTRAINT "FK_5143d37cfb7689804726afe644e"`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_action_details"
        DROP CONSTRAINT "FK_4b2c1c91843d52a57cba3b3038e"`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_action_details"
        DROP CONSTRAINT "FK_ff0ebe6f7ef4ad47122847f47c1"`);
    await queryRunner.query("DROP TABLE \"project_negotiation_plan_steps\"");
    await queryRunner.query("DROP TABLE \"project_negotiation_opinion_details\"");
    await queryRunner.query("DROP TABLE \"project_negotiation_action_details\"");
  }

}
