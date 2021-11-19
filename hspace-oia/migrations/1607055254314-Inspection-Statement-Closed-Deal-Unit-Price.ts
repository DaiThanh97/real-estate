import { MigrationInterface, QueryRunner } from "typeorm";

export class InspectionStatementClosedDealUnitPrice1607055254314 implements MigrationInterface {
  name = "InspectionStatementClosedDealUnitPrice1607055254314";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "closed_deal_unit_price" double precision NOT NULL DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "closed_deal_unit_price"`);
  }

}
