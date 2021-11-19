import { MigrationInterface, QueryRunner } from "typeorm";

export class AccountGroup1600568008656 implements MigrationInterface {
  name = "AccountGroup1600568008656";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "account_groups"
                             (
                                 "id"          SERIAL            NOT NULL,
                                 "created_at"  TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updated_at"  TIMESTAMP         NOT NULL DEFAULT now(),
                                 "is_active"   boolean           NOT NULL DEFAULT true,
                                 "code"        character varying NOT NULL,
                                 "name"        character varying NOT NULL,
                                 "description" character varying          DEFAULT '',
                                 "created_by"  integer,
                                 "updated_by"  integer,
                                 CONSTRAINT "PK_297ac55323f43dcee271a4b10a1" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "features"
                             (
                                 "id"          SERIAL            NOT NULL,
                                 "created_at"  TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updated_at"  TIMESTAMP         NOT NULL DEFAULT now(),
                                 "is_active"   boolean           NOT NULL DEFAULT true,
                                 "action"      character varying NOT NULL,
                                 "name"        character varying NOT NULL,
                                 "description" character varying          DEFAULT '',
                                 "resource_id" integer,
                                 "created_by"  integer,
                                 "updated_by"  integer,
                                 CONSTRAINT "PK_5c1e336df2f4a7051e5bf08a941" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "resources"
                             (
                                 "id"          SERIAL            NOT NULL,
                                 "created_at"  TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updated_at"  TIMESTAMP         NOT NULL DEFAULT now(),
                                 "is_active"   boolean           NOT NULL DEFAULT true,
                                 "path"        character varying NOT NULL,
                                 "name"        character varying NOT NULL,
                                 "description" character varying          DEFAULT '',
                                 "created_by"  integer,
                                 "updated_by"  integer,
                                 CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "account_groups"
        ADD CONSTRAINT "FK_f8b3e92de1c96dde69d145be9e9" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_groups"
        ADD CONSTRAINT "FK_952a06d88b2b42cf68f09cb2322" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "features"
        ADD CONSTRAINT "FK_67c0e874b8456ab2a5b0949cd7d" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "features"
        ADD CONSTRAINT "FK_a8886c56ef3a5f19c35fb3b39c4" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "features"
        ADD CONSTRAINT "FK_929b48fded34ee7814af2b4adeb" FOREIGN KEY ("resource_id") REFERENCES "resources" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "resources"
        ADD CONSTRAINT "FK_e53ebff79b93bd89fbe2b54a75f" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "resources"
        ADD CONSTRAINT "FK_18b3ac444710d4288aca3defb4c" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "resources"
        DROP CONSTRAINT "FK_18b3ac444710d4288aca3defb4c"`);
    await queryRunner.query(`ALTER TABLE "resources"
        DROP CONSTRAINT "FK_e53ebff79b93bd89fbe2b54a75f"`);
    await queryRunner.query(`ALTER TABLE "features"
        DROP CONSTRAINT "FK_929b48fded34ee7814af2b4adeb"`);
    await queryRunner.query(`ALTER TABLE "features"
        DROP CONSTRAINT "FK_a8886c56ef3a5f19c35fb3b39c4"`);
    await queryRunner.query(`ALTER TABLE "features"
        DROP CONSTRAINT "FK_67c0e874b8456ab2a5b0949cd7d"`);
    await queryRunner.query(`ALTER TABLE "account_groups"
        DROP CONSTRAINT "FK_952a06d88b2b42cf68f09cb2322"`);
    await queryRunner.query(`ALTER TABLE "account_groups"
        DROP CONSTRAINT "FK_f8b3e92de1c96dde69d145be9e9"`);
    await queryRunner.query("DROP TABLE \"resources\"");
    await queryRunner.query("DROP TABLE \"features\"");
    await queryRunner.query("DROP TABLE \"account_groups\"");
  }

}
