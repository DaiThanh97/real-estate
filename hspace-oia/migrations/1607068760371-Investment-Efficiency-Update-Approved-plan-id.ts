import { MigrationInterface, QueryRunner } from "typeorm";

export class InvestmentEfficiencyUpdateApprovedPlanId1607068760371 implements MigrationInterface {
  name = "InvestmentEfficiencyUpdateApprovedPlanId1607068760371";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_5689a311aa105e0741c211c4def"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_5689a311aa105e0741c211c4def" FOREIGN KEY ("approved_plan_id") REFERENCES "investment_efficiency_plan_items" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

}
