import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChangeablePriceOfTheProperty1607584451125 implements MigrationInterface {
  name = "AddChangeablePriceOfTheProperty1607584451125";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "changeable_price" double precision NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "sale_broker_id" integer`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP CONSTRAINT "FK_e15d756cd47156e61279e23967d"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP CONSTRAINT "FK_80db44884234087a0d638deaae7"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ALTER COLUMN "group_id" DROP NOT NULL`);
    await queryRunner.query("COMMENT ON COLUMN \"disadvantage_levels\".\"group_id\" IS NULL");
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ALTER COLUMN "type_id" DROP NOT NULL`);
    await queryRunner.query("COMMENT ON COLUMN \"disadvantage_levels\".\"type_id\" IS NULL");
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ALTER COLUMN "level" DROP NOT NULL`);
    await queryRunner.query("COMMENT ON COLUMN \"disadvantage_levels\".\"level\" IS NULL");
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP CONSTRAINT "FK_1e06e5803c5047d8e4fa63c430f"`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP CONSTRAINT "FK_7b2abadde4f2b1e3d1d8f1119e3"`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ALTER COLUMN "group_id" DROP NOT NULL`);
    await queryRunner.query("COMMENT ON COLUMN \"advantage_levels\".\"group_id\" IS NULL");
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ALTER COLUMN "type_id" DROP NOT NULL`);
    await queryRunner.query("COMMENT ON COLUMN \"advantage_levels\".\"type_id\" IS NULL");
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ALTER COLUMN "level" DROP NOT NULL`);
    await queryRunner.query("COMMENT ON COLUMN \"advantage_levels\".\"level\" IS NULL");
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD CONSTRAINT "FK_e15d756cd47156e61279e23967d" FOREIGN KEY ("group_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD CONSTRAINT "FK_80db44884234087a0d638deaae7" FOREIGN KEY ("type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD CONSTRAINT "FK_1e06e5803c5047d8e4fa63c430f" FOREIGN KEY ("group_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD CONSTRAINT "FK_7b2abadde4f2b1e3d1d8f1119e3" FOREIGN KEY ("type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`UPDATE properties pro
                             SET changeable_price = pro.price`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP CONSTRAINT "FK_7b2abadde4f2b1e3d1d8f1119e3"`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP CONSTRAINT "FK_1e06e5803c5047d8e4fa63c430f"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP CONSTRAINT "FK_80db44884234087a0d638deaae7"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP CONSTRAINT "FK_e15d756cd47156e61279e23967d"`);
    await queryRunner.query("COMMENT ON COLUMN \"advantage_levels\".\"level\" IS NULL");
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ALTER COLUMN "level" SET NOT NULL`);
    await queryRunner.query("COMMENT ON COLUMN \"advantage_levels\".\"type_id\" IS NULL");
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ALTER COLUMN "type_id" SET NOT NULL`);
    await queryRunner.query("COMMENT ON COLUMN \"advantage_levels\".\"group_id\" IS NULL");
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ALTER COLUMN "group_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD CONSTRAINT "FK_7b2abadde4f2b1e3d1d8f1119e3" FOREIGN KEY ("type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD CONSTRAINT "FK_1e06e5803c5047d8e4fa63c430f" FOREIGN KEY ("group_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query("COMMENT ON COLUMN \"disadvantage_levels\".\"level\" IS NULL");
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ALTER COLUMN "level" SET NOT NULL`);
    await queryRunner.query("COMMENT ON COLUMN \"disadvantage_levels\".\"type_id\" IS NULL");
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ALTER COLUMN "type_id" SET NOT NULL`);
    await queryRunner.query("COMMENT ON COLUMN \"disadvantage_levels\".\"group_id\" IS NULL");
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ALTER COLUMN "group_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD CONSTRAINT "FK_80db44884234087a0d638deaae7" FOREIGN KEY ("type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD CONSTRAINT "FK_e15d756cd47156e61279e23967d" FOREIGN KEY ("group_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "sale_broker_id"`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "changeable_price"`);
  }

}
