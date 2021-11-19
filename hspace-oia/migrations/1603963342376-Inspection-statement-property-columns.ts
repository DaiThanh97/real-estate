import { MigrationInterface, QueryRunner } from "typeorm";

export class InspectionStatementPropertyColumns1603963342376 implements MigrationInterface {
  name = "InspectionStatementPropertyColumns1603963342376";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "street_number" character varying(64)`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "city_id" integer`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "ward_id" integer`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "district_id" integer`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "street_id" integer`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "street_group_id" integer`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "position_group_id" integer`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "address" character varying NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "other_address" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "location_description" character varying NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "closed_deal_value" integer`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "transaction_date" date`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "broker_id" integer`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_f2d62795b7b1aa815893f089635" FOREIGN KEY ("city_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_f68afd0878f39bc8b14a93d8c7c" FOREIGN KEY ("ward_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_6c4d9071bed4d40011feaf778d7" FOREIGN KEY ("district_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_17bfa65e396a03b9d03c308e49a" FOREIGN KEY ("street_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_2bf89f57b07bc7c24f4082a4a30" FOREIGN KEY ("street_group_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_b8becf4ef619dc9ec81af5dc3c2" FOREIGN KEY ("position_group_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_5e64c5062b0e2942304ad07c1ba" FOREIGN KEY ("broker_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_5e64c5062b0e2942304ad07c1ba"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_b8becf4ef619dc9ec81af5dc3c2"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_2bf89f57b07bc7c24f4082a4a30"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_17bfa65e396a03b9d03c308e49a"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_6c4d9071bed4d40011feaf778d7"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_f68afd0878f39bc8b14a93d8c7c"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_f2d62795b7b1aa815893f089635"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "broker_id"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "transaction_date"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "closed_deal_value"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "location_description"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "other_address"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "position_group_id"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "street_group_id"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "street_id"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "district_id"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "ward_id"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "city_id"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "street_number"`);
  }

}
