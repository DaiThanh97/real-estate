import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotificationModel1610969168637 implements MigrationInterface {
  name = "AddNotificationModel1610969168637";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "account_notifications"
                             (
                                 "id"              SERIAL    NOT NULL,
                                 "created_at"      TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at"      TIMESTAMP NOT NULL DEFAULT now(),
                                 "notification_id" integer,
                                 "account_id"      integer,
                                 "mark_as_read"    boolean   NOT NULL DEFAULT false,
                                 "created_by"      integer,
                                 "updated_by"      integer,
                                 CONSTRAINT "PK_ed61a35bb088fff89b20dd5bd7c" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "notifications"
                             (
                                 "id"          SERIAL    NOT NULL,
                                 "created_at"  TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at"  TIMESTAMP NOT NULL DEFAULT now(),
                                 "property_id" integer,
                                 "group"       character varying(128),
                                 "ref_id"      integer,
                                 "ref_code"    character varying,
                                 "content"     character varying,
                                 "url"         character varying,
                                 "action"      character varying(128),
                                 "is_active"   boolean   NOT NULL DEFAULT true,
                                 "data"        jsonb,
                                 "created_by"  integer,
                                 "updated_by"  integer,
                                 CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "notification_templates"
                             (
                                 "id"          SERIAL    NOT NULL,
                                 "created_at"  TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at"  TIMESTAMP NOT NULL DEFAULT now(),
                                 "group"       character varying(128),
                                 "action"      character varying(128),
                                 "raw"         character varying,
                                 "is_active"   boolean   NOT NULL DEFAULT true,
                                 "description" character varying,
                                 CONSTRAINT "UNIQUE_NOTIFICATION_TEMPLATE_ACTION" UNIQUE ("action"),
                                 CONSTRAINT "PK_76f0fc48b8d057d2ae7f3a2848a" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "account_notifications"
        ADD CONSTRAINT "FK_6de9e2179d7116fb1dfdefe0508" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_notifications"
        ADD CONSTRAINT "FK_6efd6d3d45e51bc233d95460333" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_notifications"
        ADD CONSTRAINT "FK_f2c5027597112055def36ec7137" FOREIGN KEY ("notification_id") REFERENCES "notifications" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_notifications"
        ADD CONSTRAINT "FK_e0f8308d8c787c6cef63a5713c4" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "notifications"
        ADD CONSTRAINT "FK_19629e8eb1e6023c4c73e661c82" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "notifications"
        ADD CONSTRAINT "FK_e0517903116b233d60423efa296" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "notifications"
        ADD CONSTRAINT "FK_fb24cc1a30dea8ccb77e8f2a977" FOREIGN KEY ("property_id") REFERENCES "properties" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    // await NotificationTemplateSeed.seedForBDS(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications"
        DROP CONSTRAINT "FK_fb24cc1a30dea8ccb77e8f2a977"`);
    await queryRunner.query(`ALTER TABLE "notifications"
        DROP CONSTRAINT "FK_e0517903116b233d60423efa296"`);
    await queryRunner.query(`ALTER TABLE "notifications"
        DROP CONSTRAINT "FK_19629e8eb1e6023c4c73e661c82"`);
    await queryRunner.query(`ALTER TABLE "account_notifications"
        DROP CONSTRAINT "FK_e0f8308d8c787c6cef63a5713c4"`);
    await queryRunner.query(`ALTER TABLE "account_notifications"
        DROP CONSTRAINT "FK_f2c5027597112055def36ec7137"`);
    await queryRunner.query(`ALTER TABLE "account_notifications"
        DROP CONSTRAINT "FK_6efd6d3d45e51bc233d95460333"`);
    await queryRunner.query(`ALTER TABLE "account_notifications"
        DROP CONSTRAINT "FK_6de9e2179d7116fb1dfdefe0508"`);
    await queryRunner.query("DROP TABLE \"notification_templates\"");
    await queryRunner.query("DROP TABLE \"notifications\"");
    await queryRunner.query("DROP TABLE \"account_notifications\"");
  }

}
