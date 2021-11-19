import { MigrationInterface, QueryRunner } from "typeorm";

export class InvestmentEfficiencyUpdateAddressNote1606797548998 implements MigrationInterface {
  name = "InvestmentEfficiencyUpdateAddressNote1606797548998";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD "address" character varying`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD "street_number" character varying(64)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP COLUMN "street_number"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP COLUMN "address"`);
  }

}
