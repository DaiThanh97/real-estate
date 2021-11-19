import { MigrationInterface, QueryRunner } from "typeorm";

export class createInitTableAccounGroupsFeaturesResourcesMenus1634050160863 implements MigrationInterface {
  name = "createInitTableAccounGroupsFeaturesResourcesMenus1634050160863";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "resources" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "path" text NOT NULL, "name" text NOT NULL, "description" text DEFAULT '', "model" text, "group" text, "api" text, "seq" integer, "is_active" boolean NOT NULL DEFAULT true, "created_by" text, "updated_by" text, CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_group_resources" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "resource_id" text NOT NULL, "account_group_id" text NOT NULL, "created_by" text, "updated_by" text, "feature_id" text, CONSTRAINT "PK_9c9cfd12a7f0dbe558e9aedbcc3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "features" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "action" text NOT NULL, "name" text NOT NULL, "description" text DEFAULT '', "resource_id" text, "act" text, "notification_action" text, "group_class" text, "seq" integer, "is_active" boolean NOT NULL DEFAULT true, "created_by" text, "updated_by" text, CONSTRAINT "PK_5c1e336df2f4a7051e5bf08a941" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_group_features" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "feature_id" text NOT NULL, "account_group_id" text NOT NULL, "created_by" text, "updated_by" text, CONSTRAINT "PK_a5d94cea6fb86834624c1acf5a3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_groups" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "code" text NOT NULL, "name" text NOT NULL, "description" text DEFAULT '', "classes" jsonb, "is_deleted" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "created_by" text, "updated_by" text, CONSTRAINT "PK_297ac55323f43dcee271a4b10a1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "menus" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "path" text, "name" text NOT NULL, "description" text DEFAULT '', "is_active" boolean NOT NULL DEFAULT true, "seq" integer, "parent_id" text, "resource_id" text, "created_by" text, "updated_by" text, CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "resources" ADD CONSTRAINT "FK_e53ebff79b93bd89fbe2b54a75f" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "resources" ADD CONSTRAINT "FK_18b3ac444710d4288aca3defb4c" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_group_resources" ADD CONSTRAINT "FK_79744d23eee03592941f539567c" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_group_resources" ADD CONSTRAINT "FK_60ffcaf93e16b0444ecde137904" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_group_resources" ADD CONSTRAINT "FK_bb9db5bdf163653c370aad23b0f" FOREIGN KEY ("feature_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_group_resources" ADD CONSTRAINT "FK_835c92badef9f5303cd248c1869" FOREIGN KEY ("account_group_id") REFERENCES "account_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "features" ADD CONSTRAINT "FK_67c0e874b8456ab2a5b0949cd7d" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "features" ADD CONSTRAINT "FK_a8886c56ef3a5f19c35fb3b39c4" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "features" ADD CONSTRAINT "FK_929b48fded34ee7814af2b4adeb" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_group_features" ADD CONSTRAINT "FK_d5e75aa31ff4051986284b1b342" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_group_features" ADD CONSTRAINT "FK_bf304c7fcf49aeb34f0696710a6" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_group_features" ADD CONSTRAINT "FK_7d53023e31ed71c1da9d1f3d6a6" FOREIGN KEY ("feature_id") REFERENCES "features"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_group_features" ADD CONSTRAINT "FK_e19bad8d66915fcc714b165fbf8" FOREIGN KEY ("account_group_id") REFERENCES "account_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_groups" ADD CONSTRAINT "FK_f8b3e92de1c96dde69d145be9e9" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_groups" ADD CONSTRAINT "FK_952a06d88b2b42cf68f09cb2322" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "menus" ADD CONSTRAINT "FK_40114ecec7b4aa6504e77018fd3" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "menus" ADD CONSTRAINT "FK_815fafa70adc7f1ea45d9d444a8" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "menus" ADD CONSTRAINT "FK_00ccc1ed4e9fc23bc1246269359" FOREIGN KEY ("parent_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "menus" ADD CONSTRAINT "FK_22d671f3d850af56efff0231663" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "menus" DROP CONSTRAINT "FK_22d671f3d850af56efff0231663"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP CONSTRAINT "FK_00ccc1ed4e9fc23bc1246269359"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP CONSTRAINT "FK_815fafa70adc7f1ea45d9d444a8"`);
    await queryRunner.query(`ALTER TABLE "menus" DROP CONSTRAINT "FK_40114ecec7b4aa6504e77018fd3"`);
    await queryRunner.query(`ALTER TABLE "account_groups" DROP CONSTRAINT "FK_952a06d88b2b42cf68f09cb2322"`);
    await queryRunner.query(`ALTER TABLE "account_groups" DROP CONSTRAINT "FK_f8b3e92de1c96dde69d145be9e9"`);
    await queryRunner.query(`ALTER TABLE "account_group_features" DROP CONSTRAINT "FK_e19bad8d66915fcc714b165fbf8"`);
    await queryRunner.query(`ALTER TABLE "account_group_features" DROP CONSTRAINT "FK_7d53023e31ed71c1da9d1f3d6a6"`);
    await queryRunner.query(`ALTER TABLE "account_group_features" DROP CONSTRAINT "FK_bf304c7fcf49aeb34f0696710a6"`);
    await queryRunner.query(`ALTER TABLE "account_group_features" DROP CONSTRAINT "FK_d5e75aa31ff4051986284b1b342"`);
    await queryRunner.query(`ALTER TABLE "features" DROP CONSTRAINT "FK_929b48fded34ee7814af2b4adeb"`);
    await queryRunner.query(`ALTER TABLE "features" DROP CONSTRAINT "FK_a8886c56ef3a5f19c35fb3b39c4"`);
    await queryRunner.query(`ALTER TABLE "features" DROP CONSTRAINT "FK_67c0e874b8456ab2a5b0949cd7d"`);
    await queryRunner.query(`ALTER TABLE "account_group_resources" DROP CONSTRAINT "FK_835c92badef9f5303cd248c1869"`);
    await queryRunner.query(`ALTER TABLE "account_group_resources" DROP CONSTRAINT "FK_bb9db5bdf163653c370aad23b0f"`);
    await queryRunner.query(`ALTER TABLE "account_group_resources" DROP CONSTRAINT "FK_60ffcaf93e16b0444ecde137904"`);
    await queryRunner.query(`ALTER TABLE "account_group_resources" DROP CONSTRAINT "FK_79744d23eee03592941f539567c"`);
    await queryRunner.query(`ALTER TABLE "resources" DROP CONSTRAINT "FK_18b3ac444710d4288aca3defb4c"`);
    await queryRunner.query(`ALTER TABLE "resources" DROP CONSTRAINT "FK_e53ebff79b93bd89fbe2b54a75f"`);
    await queryRunner.query(`DROP TABLE "menus"`);
    await queryRunner.query(`DROP TABLE "account_groups"`);
    await queryRunner.query(`DROP TABLE "account_group_features"`);
    await queryRunner.query(`DROP TABLE "features"`);
    await queryRunner.query(`DROP TABLE "account_group_resources"`);
    await queryRunner.query(`DROP TABLE "resources"`);
  }
}
