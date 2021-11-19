import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTableAccountGroupResourceAndMastervalueAndEmployee1634308175216 implements MigrationInterface {
  name = "updateTableAccountGroupResourceAndMastervalueAndEmployee1634308175216";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_bcdf921072a19dd2758a628c5c0"`);
    await queryRunner.query(`ALTER TABLE "account_group_resources" DROP CONSTRAINT "FK_bb9db5bdf163653c370aad23b0f"`);
    await queryRunner.query(`ALTER TABLE "account_group_resources" DROP COLUMN "feature_id"`);
    await queryRunner.query(`ALTER TABLE "master_values" ADD "is_active" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "account_account_groups" DROP CONSTRAINT "FK_4aba453f9b592e700a009883173"`);
    await queryRunner.query(`ALTER TABLE "account_account_groups" DROP CONSTRAINT "FK_1b463dec857c192a36ca6d2d111"`);
    await queryRunner.query(`ALTER TABLE "account_account_groups" DROP CONSTRAINT "REL_4aba453f9b592e700a00988317"`);
    await queryRunner.query(`ALTER TABLE "account_account_groups" DROP CONSTRAINT "REL_1b463dec857c192a36ca6d2d11"`);
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_bcdf921072a19dd2758a628c5c0" FOREIGN KEY ("manager_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_group_resources" ADD CONSTRAINT "FK_d514e7c34a1c3732c87fc9f03ae" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_account_groups" ADD CONSTRAINT "FK_4aba453f9b592e700a009883173" FOREIGN KEY ("account_group_id") REFERENCES "account_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_account_groups" ADD CONSTRAINT "FK_1b463dec857c192a36ca6d2d111" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account_account_groups" DROP CONSTRAINT "FK_1b463dec857c192a36ca6d2d111"`);
    await queryRunner.query(`ALTER TABLE "account_account_groups" DROP CONSTRAINT "FK_4aba453f9b592e700a009883173"`);
    await queryRunner.query(`ALTER TABLE "account_group_resources" DROP CONSTRAINT "FK_d514e7c34a1c3732c87fc9f03ae"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_bcdf921072a19dd2758a628c5c0"`);
    await queryRunner.query(
      `ALTER TABLE "account_account_groups" ADD CONSTRAINT "REL_1b463dec857c192a36ca6d2d11" UNIQUE ("account_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_account_groups" ADD CONSTRAINT "REL_4aba453f9b592e700a00988317" UNIQUE ("account_group_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_account_groups" ADD CONSTRAINT "FK_1b463dec857c192a36ca6d2d111" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_account_groups" ADD CONSTRAINT "FK_4aba453f9b592e700a009883173" FOREIGN KEY ("account_group_id") REFERENCES "account_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "master_values" DROP COLUMN "is_active"`);
    await queryRunner.query(`ALTER TABLE "account_group_resources" ADD "feature_id" text`);
    await queryRunner.query(
      `ALTER TABLE "account_group_resources" ADD CONSTRAINT "FK_bb9db5bdf163653c370aad23b0f" FOREIGN KEY ("feature_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_bcdf921072a19dd2758a628c5c0" FOREIGN KEY ("manager_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
