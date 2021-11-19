import { MigrationInterface, QueryRunner } from "typeorm";

export class InvestmentPlanGeneralInfo1605514937648 implements MigrationInterface {
  name = "InvestmentPlanGeneralInfo1605514937648";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        ADD "address" character varying NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        ADD "description" character varying NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        ADD "plan_type_id" integer`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        ADD "construction_type_id" integer`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        ADD "general" jsonb`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        ADD "attachments" jsonb`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        ADD "land_use_rights" jsonb`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        ADD CONSTRAINT "FK_e32ac420204c4d06cf457b4539d" FOREIGN KEY ("plan_type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        ADD CONSTRAINT "FK_709fee7efab2ca1f2b810a11470" FOREIGN KEY ("construction_type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        DROP CONSTRAINT "FK_709fee7efab2ca1f2b810a11470"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        DROP CONSTRAINT "FK_e32ac420204c4d06cf457b4539d"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        DROP COLUMN "land_use_rights"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        DROP COLUMN "attachments"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        DROP COLUMN "general"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        DROP COLUMN "construction_type_id"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        DROP COLUMN "plan_type_id"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_lands"
        DROP COLUMN "address"`);
  }

}
