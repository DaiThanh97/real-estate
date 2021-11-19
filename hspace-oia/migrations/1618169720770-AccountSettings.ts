import { MigrationInterface, QueryRunner } from "typeorm";
import DefaultAccountSettingSeed from "../src/infrastructure/orm/typeorm/seed/defaultAccountSetting";

export class AccountSettings1618169720770 implements MigrationInterface {
  name = "AccountSettings1618169720770";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "account_settings"
                             (
                                 "id"          SERIAL                NOT NULL,
                                 "created_at"  TIMESTAMP             NOT NULL DEFAULT now(),
                                 "updated_at"  TIMESTAMP             NOT NULL DEFAULT now(),
                                 "account_id"  integer               NOT NULL,
                                 "key"         character varying(64) NOT NULL,
                                 "data"        jsonb                 NOT NULL,
                                 "description" character varying,
                                 "folder"      character varying(64) NOT NULL,
                                 "is_active"   boolean               NOT NULL DEFAULT true,
                                 "created_by"  integer,
                                 "updated_by"  integer,
                                 CONSTRAINT "UNIQUE_ACCOUNT_SETTING" UNIQUE ("folder", "key", "account_id"),
                                 CONSTRAINT "PK_cede89a31d2392a1064087af67a" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "default_account_settings"
                             (
                                 "id"          SERIAL                NOT NULL,
                                 "created_at"  TIMESTAMP             NOT NULL DEFAULT now(),
                                 "updated_at"  TIMESTAMP             NOT NULL DEFAULT now(),
                                 "key"         character varying(64) NOT NULL,
                                 "data"        jsonb                 NOT NULL,
                                 "description" character varying,
                                 "folder"      character varying(64) NOT NULL,
                                 "is_active"   boolean               NOT NULL DEFAULT true,
                                 CONSTRAINT "UNIQUE_DEFAULT_ACCOUNT_SETTING" UNIQUE ("folder", "key"),
                                 CONSTRAINT "PK_d17bdec233aff57dc9c01e7c590" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "account_settings"
        ADD CONSTRAINT "FK_48be6ec7239aa77a3e6a485a15d" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_settings"
        ADD CONSTRAINT "FK_d2feb25df664d8ef59057372f5d" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_settings"
        ADD CONSTRAINT "FK_37b8bbe76d3f93380d01fc1bfff" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    await DefaultAccountSettingSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account_settings"
        DROP CONSTRAINT "FK_37b8bbe76d3f93380d01fc1bfff"`);
    await queryRunner.query(`ALTER TABLE "account_settings"
        DROP CONSTRAINT "FK_d2feb25df664d8ef59057372f5d"`);
    await queryRunner.query(`ALTER TABLE "account_settings"
        DROP CONSTRAINT "FK_48be6ec7239aa77a3e6a485a15d"`);
    await queryRunner.query("DROP TABLE \"default_account_settings\"");
    await queryRunner.query("DROP TABLE \"account_settings\"");
  }

}
