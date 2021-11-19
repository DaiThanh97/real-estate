import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationNull1600847762477 implements MigrationInterface {
  name = "UpdateRelationNull1600847762477";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account_group_features"
        DROP CONSTRAINT "FK_e19bad8d66915fcc714b165fbf8"`);
    await queryRunner.query(`ALTER TABLE "account_group_features"
        ALTER COLUMN "account_group_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "account_group_resources"
        DROP CONSTRAINT "FK_835c92badef9f5303cd248c1869"`);
    await queryRunner.query(`ALTER TABLE "account_group_resources"
        ALTER COLUMN "account_group_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        DROP CONSTRAINT "FK_2aa4139f95956b00572031e64c2"`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        ALTER COLUMN "employee_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        DROP CONSTRAINT "FK_af6acf9f2c28d64672afb7ab951"`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ALTER COLUMN "employee_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "account_group_features"
        ADD CONSTRAINT "FK_e19bad8d66915fcc714b165fbf8" FOREIGN KEY ("account_group_id") REFERENCES "account_groups" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_group_resources"
        ADD CONSTRAINT "FK_835c92badef9f5303cd248c1869" FOREIGN KEY ("account_group_id") REFERENCES "account_groups" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        ADD CONSTRAINT "FK_2aa4139f95956b00572031e64c2" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ADD CONSTRAINT "FK_af6acf9f2c28d64672afb7ab951" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "group_values"
        ADD CONSTRAINT "FK_6358c723640928072ec28218c58" FOREIGN KEY ("parent_id") REFERENCES "group_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "group_values"
        DROP CONSTRAINT "FK_6358c723640928072ec28218c58"`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        DROP CONSTRAINT "FK_af6acf9f2c28d64672afb7ab951"`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        DROP CONSTRAINT "FK_2aa4139f95956b00572031e64c2"`);
    await queryRunner.query(`ALTER TABLE "account_group_resources"
        DROP CONSTRAINT "FK_835c92badef9f5303cd248c1869"`);
    await queryRunner.query(`ALTER TABLE "account_group_features"
        DROP CONSTRAINT "FK_e19bad8d66915fcc714b165fbf8"`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ALTER COLUMN "employee_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ADD CONSTRAINT "FK_af6acf9f2c28d64672afb7ab951" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        ALTER COLUMN "employee_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        ADD CONSTRAINT "FK_2aa4139f95956b00572031e64c2" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_group_resources"
        ALTER COLUMN "account_group_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "account_group_resources"
        ADD CONSTRAINT "FK_835c92badef9f5303cd248c1869" FOREIGN KEY ("account_group_id") REFERENCES "account_groups" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_group_features"
        ALTER COLUMN "account_group_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "account_group_features"
        ADD CONSTRAINT "FK_e19bad8d66915fcc714b165fbf8" FOREIGN KEY ("account_group_id") REFERENCES "account_groups" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
