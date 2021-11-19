import { MigrationInterface, QueryRunner } from "typeorm";

export class EndpointPermission1611891900137 implements MigrationInterface {
  name = "EndpointPermission1611891900137";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "endpoint_permissions"
                             (
                                 "id"          SERIAL            NOT NULL,
                                 "created_at"  TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updated_at"  TIMESTAMP         NOT NULL DEFAULT now(),
                                 "is_active"   boolean           NOT NULL DEFAULT true,
                                 "resource_id" integer           NOT NULL,
                                 "api"         character varying NOT NULL,
                                 "method"      character varying NOT NULL,
                                 "created_by"  integer,
                                 "updated_by"  integer,
                                 CONSTRAINT "PK_1681f7bd3a2a5d9fcfc20c4e6e3" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "endpoint_permissions"
        ADD CONSTRAINT "FK_b7844c852aa1daeabc662a9df8d" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "endpoint_permissions"
        ADD CONSTRAINT "FK_7b5ad0a8ae25c477366844ffc2c" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "endpoint_permissions"
        ADD CONSTRAINT "FK_e7fff71c6889cb745d480b6b934" FOREIGN KEY ("resource_id") REFERENCES "resources" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    // await EndpointPermissionSeed.run(queryRunner);
    // await NotificationTemplateSeed.seedForBDS(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "endpoint_permissions"
        DROP CONSTRAINT "FK_e7fff71c6889cb745d480b6b934"`);
    await queryRunner.query(`ALTER TABLE "endpoint_permissions"
        DROP CONSTRAINT "FK_7b5ad0a8ae25c477366844ffc2c"`);
    await queryRunner.query(`ALTER TABLE "endpoint_permissions"
        DROP CONSTRAINT "FK_b7844c852aa1daeabc662a9df8d"`);
    await queryRunner.query("DROP TABLE \"endpoint_permissions\"");
  }
}
