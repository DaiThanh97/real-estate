import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPrice1605263948636 implements MigrationInterface {
  name = "FixPrice1605263948636";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"inspection_statement_notes\" DROP COLUMN \"closed_deal_value\"");
    await queryRunner.query("ALTER TABLE \"inspection_statement_notes\" ADD \"closed_deal_value\" double precision NOT NULL DEFAULT '0'");
    await queryRunner.query("ALTER TABLE \"inspection_statement_notes\" DROP COLUMN \"market_land_unit_price\"");
    await queryRunner.query("ALTER TABLE \"inspection_statement_notes\" ADD \"market_land_unit_price\" double precision NOT NULL DEFAULT '0'");
    await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"price\"");
    await queryRunner.query("ALTER TABLE \"properties\" ADD \"price\" double precision NOT NULL DEFAULT '0'");
    await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"closed_deal_value\"");
    await queryRunner.query("ALTER TABLE \"properties\" ADD \"closed_deal_value\" double precision NOT NULL DEFAULT '0'");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"closed_deal_value\"");
    await queryRunner.query("ALTER TABLE \"properties\" ADD \"closed_deal_value\" integer");
    await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"price\"");
    await queryRunner.query("ALTER TABLE \"properties\" ADD \"price\" integer NOT NULL");
    await queryRunner.query("ALTER TABLE \"inspection_statement_notes\" DROP COLUMN \"market_land_unit_price\"");
    await queryRunner.query("ALTER TABLE \"inspection_statement_notes\" ADD \"market_land_unit_price\" integer");
    await queryRunner.query("ALTER TABLE \"inspection_statement_notes\" DROP COLUMN \"closed_deal_value\"");
    await queryRunner.query("ALTER TABLE \"inspection_statement_notes\" ADD \"closed_deal_value\" integer");
  }

}
