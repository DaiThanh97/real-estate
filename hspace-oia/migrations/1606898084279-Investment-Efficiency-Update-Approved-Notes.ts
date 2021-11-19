import { MigrationInterface, QueryRunner } from "typeorm";

export class InvestmentEfficiencyUpdateApprovedNotes1606898084279 implements MigrationInterface {
  name = "InvestmentEfficiencyUpdateApprovedNotes1606898084279";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD "approved_plan_id" integer`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD "approved_plan_price" double precision`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD "approved_plan_type_id" integer`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD "approved_plan_name" character varying`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD "approved_plan_time" double precision`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD "approved_purchase_price" double precision`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        ADD "source_id" integer`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_5689a311aa105e0741c211c4def" FOREIGN KEY ("approved_plan_id") REFERENCES "investment_efficiency_plan_items" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_9e688bfac45682304e7f9de7f94" FOREIGN KEY ("approved_plan_type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        ADD CONSTRAINT "FK_2d26821bcb2eea129617ddf629a" FOREIGN KEY ("source_id") REFERENCES "investment_plan_items" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        DROP CONSTRAINT "FK_2d26821bcb2eea129617ddf629a"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_9e688bfac45682304e7f9de7f94"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_5689a311aa105e0741c211c4def"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        DROP COLUMN "source_id"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP COLUMN "approved_purchase_price"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP COLUMN "approved_plan_time"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP COLUMN "approved_plan_name"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP COLUMN "approved_plan_type_id"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP COLUMN "approved_plan_price"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP COLUMN "approved_plan_id"`);
  }

}
