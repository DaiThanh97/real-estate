import { MigrationInterface, QueryRunner } from "typeorm";

export class ConversationMessage1603104339648 implements MigrationInterface {
  name = "ConversationMessage1603104339648";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "conversations"
                             (
                                 "id"         SERIAL                 NOT NULL,
                                 "created_at" TIMESTAMP              NOT NULL DEFAULT now(),
                                 "updated_at" TIMESTAMP              NOT NULL DEFAULT now(),
                                 "snapshot"   character varying(255) NOT NULL DEFAULT '',
                                 "created_by" integer,
                                 "updated_by" integer,
                                 CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "messages"
                             (
                                 "id"              SERIAL                NOT NULL,
                                 "created_at"      TIMESTAMP             NOT NULL DEFAULT now(),
                                 "updated_at"      TIMESTAMP             NOT NULL DEFAULT now(),
                                 "content"         text                  NOT NULL,
                                 "status"          character varying(20) NOT NULL DEFAULT 'Sent',
                                 "conversation_id" integer               NOT NULL,
                                 "created_by"      integer,
                                 "updated_by"      integer,
                                 CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "participants"
                             (
                                 "id"              SERIAL    NOT NULL,
                                 "created_at"      TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at"      TIMESTAMP NOT NULL DEFAULT now(),
                                 "conversation_id" integer   NOT NULL,
                                 "account_id"      integer   NOT NULL,
                                 CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "conversations"
        ADD CONSTRAINT "FK_81d92d15c62b3fff79c617c9043" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "conversations"
        ADD CONSTRAINT "FK_61ba6fe3fb80ea3012866880bf9" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "messages"
        ADD CONSTRAINT "FK_4d025b3431171ff016586ba81ad" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "messages"
        ADD CONSTRAINT "FK_bd66b84a312d9bf0e64b2e81902" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "messages"
        ADD CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23" FOREIGN KEY ("conversation_id") REFERENCES "conversations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "participants"
        ADD CONSTRAINT "FK_de8978490834e2e9cb3c3fc8066" FOREIGN KEY ("conversation_id") REFERENCES "conversations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "participants"
        ADD CONSTRAINT "FK_5bbc467af441253dc9216386d8b" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "participants"
        DROP CONSTRAINT "FK_5bbc467af441253dc9216386d8b"`);
    await queryRunner.query(`ALTER TABLE "participants"
        DROP CONSTRAINT "FK_de8978490834e2e9cb3c3fc8066"`);
    await queryRunner.query(`ALTER TABLE "messages"
        DROP CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23"`);
    await queryRunner.query(`ALTER TABLE "messages"
        DROP CONSTRAINT "FK_bd66b84a312d9bf0e64b2e81902"`);
    await queryRunner.query(`ALTER TABLE "messages"
        DROP CONSTRAINT "FK_4d025b3431171ff016586ba81ad"`);
    await queryRunner.query(`ALTER TABLE "conversations"
        DROP CONSTRAINT "FK_61ba6fe3fb80ea3012866880bf9"`);
    await queryRunner.query(`ALTER TABLE "conversations"
        DROP CONSTRAINT "FK_81d92d15c62b3fff79c617c9043"`);
    await queryRunner.query("DROP TABLE \"participants\"");
    await queryRunner.query("DROP TABLE \"messages\"");
    await queryRunner.query("DROP TABLE \"conversations\"");
  }

}
