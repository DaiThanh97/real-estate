import { MigrationInterface, QueryRunner } from "typeorm";
import SystemConfigSeed from "../src/infrastructure/orm/typeorm/seed/systemConfig";

export class SystemConfig1611906743537 implements MigrationInterface {
  name = "SystemConfig1611906743537";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "system_config"
                             (
                                 "id"          SERIAL                NOT NULL,
                                 "created_at"  TIMESTAMP             NOT NULL DEFAULT now(),
                                 "updated_at"  TIMESTAMP             NOT NULL DEFAULT now(),
                                 "is_active"   boolean               NOT NULL DEFAULT true,
                                 "name"        character varying(64) NOT NULL,
                                 "data"        jsonb                 NOT NULL,
                                 "description" character varying,
                                 "folder"      character varying     NOT NULL,
                                 "example"     character varying     NOT NULL,
                                 "created_by"  integer,
                                 "updated_by"  integer,
                                 CONSTRAINT "UQ_88709a12d5666c0137bdc15a856" UNIQUE ("name"),
                                 CONSTRAINT "PK_db4e70ac0d27e588176e9bb44a0" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "system_config"
        ADD CONSTRAINT "FK_67098b57e7e7c5f4096581589d0" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "system_config"
        ADD CONSTRAINT "FK_674473bbaa9859ba7e7d9f7ea9e" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await SystemConfigSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "system_config"
        DROP CONSTRAINT "FK_674473bbaa9859ba7e7d9f7ea9e"`);
    await queryRunner.query(`ALTER TABLE "system_config"
        DROP CONSTRAINT "FK_67098b57e7e7c5f4096581589d0"`);
    await queryRunner.query("DROP TABLE \"system_config\"");
  }

}
