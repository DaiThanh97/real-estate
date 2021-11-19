import { MigrationInterface, QueryRunner } from "typeorm";

export class InvestmentPlanAddAddress1605164098418 implements MigrationInterface {
  name = "InvestmentPlanAddAddress1605164098418";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD "address" character varying`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD "street_number" character varying(64)`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD "city_id" integer`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD "district_id" integer`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD "ward_id" integer`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD "street_id" integer`);
    await queryRunner.query(`ALTER TABLE "investment_plan_items"
        DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_items"
        ADD "price" double precision`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD CONSTRAINT "FK_0512d521f238de160bcb35c28b2" FOREIGN KEY ("city_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD CONSTRAINT "FK_b4ad0b798a095b37cde6d07318f" FOREIGN KEY ("district_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD CONSTRAINT "FK_512a7eed38fb494e4de74bc5379" FOREIGN KEY ("ward_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD CONSTRAINT "FK_dadbe9a7868559cad70ebf90b4e" FOREIGN KEY ("street_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP CONSTRAINT "FK_dadbe9a7868559cad70ebf90b4e"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP CONSTRAINT "FK_512a7eed38fb494e4de74bc5379"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP CONSTRAINT "FK_b4ad0b798a095b37cde6d07318f"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP CONSTRAINT "FK_0512d521f238de160bcb35c28b2"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_items"
        DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_items"
        ADD "price" integer`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP COLUMN "street_id"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP COLUMN "ward_id"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP COLUMN "district_id"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP COLUMN "city_id"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP COLUMN "street_number"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP COLUMN "address"`);
  }

}
