import { MigrationInterface, QueryRunner } from "typeorm";

export class AccountGroupRelations1600617515059 implements MigrationInterface {
  name = "AccountGroupRelations1600617515059";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "account_group_features"
                             (
                                 "id"               SERIAL    NOT NULL,
                                 "created_at"       TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at"       TIMESTAMP NOT NULL DEFAULT now(),
                                 "feature_id"       integer   NOT NULL,
                                 "account_group_id" integer   NOT NULL,
                                 "created_by"       integer,
                                 "updated_by"       integer,
                                 CONSTRAINT "PK_a5d94cea6fb86834624c1acf5a3" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "account_group_resources"
                             (
                                 "id"               SERIAL    NOT NULL,
                                 "created_at"       TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at"       TIMESTAMP NOT NULL DEFAULT now(),
                                 "resource_id"      integer   NOT NULL,
                                 "account_group_id" integer   NOT NULL,
                                 "created_by"       integer,
                                 "updated_by"       integer,
                                 CONSTRAINT "PK_9c9cfd12a7f0dbe558e9aedbcc3" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "account_group_features"
        ADD CONSTRAINT "FK_d5e75aa31ff4051986284b1b342" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_group_features"
        ADD CONSTRAINT "FK_bf304c7fcf49aeb34f0696710a6" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_group_features"
        ADD CONSTRAINT "FK_7d53023e31ed71c1da9d1f3d6a6" FOREIGN KEY ("feature_id") REFERENCES "features" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_group_features"
        ADD CONSTRAINT "FK_e19bad8d66915fcc714b165fbf8" FOREIGN KEY ("account_group_id") REFERENCES "account_groups" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_group_resources"
        ADD CONSTRAINT "FK_79744d23eee03592941f539567c" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_group_resources"
        ADD CONSTRAINT "FK_60ffcaf93e16b0444ecde137904" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_group_resources"
        ADD CONSTRAINT "FK_d514e7c34a1c3732c87fc9f03ae" FOREIGN KEY ("resource_id") REFERENCES "resources" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_group_resources"
        ADD CONSTRAINT "FK_835c92badef9f5303cd248c1869" FOREIGN KEY ("account_group_id") REFERENCES "account_groups" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account_group_resources"
        DROP CONSTRAINT "FK_835c92badef9f5303cd248c1869"`);
    await queryRunner.query(`ALTER TABLE "account_group_resources"
        DROP CONSTRAINT "FK_d514e7c34a1c3732c87fc9f03ae"`);
    await queryRunner.query(`ALTER TABLE "account_group_resources"
        DROP CONSTRAINT "FK_60ffcaf93e16b0444ecde137904"`);
    await queryRunner.query(`ALTER TABLE "account_group_resources"
        DROP CONSTRAINT "FK_79744d23eee03592941f539567c"`);
    await queryRunner.query(`ALTER TABLE "account_group_features"
        DROP CONSTRAINT "FK_e19bad8d66915fcc714b165fbf8"`);
    await queryRunner.query(`ALTER TABLE "account_group_features"
        DROP CONSTRAINT "FK_7d53023e31ed71c1da9d1f3d6a6"`);
    await queryRunner.query(`ALTER TABLE "account_group_features"
        DROP CONSTRAINT "FK_bf304c7fcf49aeb34f0696710a6"`);
    await queryRunner.query(`ALTER TABLE "account_group_features"
        DROP CONSTRAINT "FK_d5e75aa31ff4051986284b1b342"`);
    await queryRunner.query("DROP TABLE \"account_group_resources\"");
    await queryRunner.query("DROP TABLE \"account_group_features\"");
  }

}
