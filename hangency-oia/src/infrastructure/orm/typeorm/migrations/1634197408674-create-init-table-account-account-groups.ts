import { MigrationInterface, QueryRunner } from "typeorm";

export class createInitTableAccountAccountGroups1634197408674 implements MigrationInterface {
  name = "createInitTableAccountAccountGroups1634197408674";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account_account_groups" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "account_group_id" text NOT NULL, "account_id" text NOT NULL, "created_by" text, "updated_by" text, CONSTRAINT "REL_4aba453f9b592e700a00988317" UNIQUE ("account_group_id"), CONSTRAINT "REL_1b463dec857c192a36ca6d2d11" UNIQUE ("account_id"), CONSTRAINT "PK_9f0d2962f1615dc58c7a0996373" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_account_groups" ADD CONSTRAINT "FK_4aba453f9b592e700a009883173" FOREIGN KEY ("account_group_id") REFERENCES "account_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_account_groups" ADD CONSTRAINT "FK_1b463dec857c192a36ca6d2d111" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_account_groups" ADD CONSTRAINT "FK_41c1762a81152b084f7891b5542" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_account_groups" ADD CONSTRAINT "FK_b547839735830a82f8257558821" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account_account_groups" DROP CONSTRAINT "FK_b547839735830a82f8257558821"`);
    await queryRunner.query(`ALTER TABLE "account_account_groups" DROP CONSTRAINT "FK_41c1762a81152b084f7891b5542"`);
    await queryRunner.query(`ALTER TABLE "account_account_groups" DROP CONSTRAINT "FK_1b463dec857c192a36ca6d2d111"`);
    await queryRunner.query(`ALTER TABLE "account_account_groups" DROP CONSTRAINT "FK_4aba453f9b592e700a009883173"`);
    await queryRunner.query(`DROP TABLE "account_account_groups"`);
  }
}
