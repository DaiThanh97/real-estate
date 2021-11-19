import { MigrationInterface, QueryRunner } from "typeorm";

export class AccountActivity1615977616724 implements MigrationInterface {
  name = "AccountActivity1615977616724";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "account_activities"
                             (
                                 "id"          SERIAL    NOT NULL,
                                 "created_at"  TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at"  TIMESTAMP NOT NULL DEFAULT now(),
                                 "property_id" integer,
                                 "group"       character varying(128),
                                 "ref_id"      integer,
                                 "ref_code"    character varying,
                                 "content"     character varying,
                                 "quote"       character varying,
                                 "action"      character varying(128),
                                 "data"        jsonb,
                                 "created_by"  integer,
                                 "updated_by"  integer,
                                 CONSTRAINT "PK_8e992031417f94cd4cd7009ce84" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "activity_templates"
                             (
                                 "id"          SERIAL    NOT NULL,
                                 "created_at"  TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at"  TIMESTAMP NOT NULL DEFAULT now(),
                                 "group"       character varying(128),
                                 "action"      character varying(128),
                                 "raw"         character varying,
                                 "is_active"   boolean   NOT NULL DEFAULT true,
                                 "description" character varying,
                                 CONSTRAINT "UNIQUE_ACTIVITY_TEMPLATE_ACTION" UNIQUE ("action"),
                                 CONSTRAINT "PK_5b97772e9a57c3c087df8bf2b70" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "account_activities"
        ADD CONSTRAINT "FK_cce3a8e61836a842ed2dec074c7" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_activities"
        ADD CONSTRAINT "FK_e0f2a8ff1af825092d55f6f805a" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_activities"
        ADD CONSTRAINT "FK_e2459e0dbfa027aae78b7a3849d" FOREIGN KEY ("property_id") REFERENCES "properties" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    // await ActivityTemplateSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account_activities"
        DROP CONSTRAINT "FK_e2459e0dbfa027aae78b7a3849d"`);
    await queryRunner.query(`ALTER TABLE "account_activities"
        DROP CONSTRAINT "FK_e0f2a8ff1af825092d55f6f805a"`);
    await queryRunner.query(`ALTER TABLE "account_activities"
        DROP CONSTRAINT "FK_cce3a8e61836a842ed2dec074c7"`);
    await queryRunner.query("DROP TABLE \"activity_templates\"");
    await queryRunner.query("DROP TABLE \"account_activities\"");
  }

}
