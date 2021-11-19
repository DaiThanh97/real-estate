import { MigrationInterface, QueryRunner } from "typeorm";

export class InspectionStatementLevelRenameMasterValueColumn1604390048450 implements MigrationInterface {
  name = "InspectionStatementLevelRenameMasterValueColumn1604390048450";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("truncate table appraisal_statement_notes restart identity cascade");
    await queryRunner.query("truncate table inspection_statement_notes restart identity cascade");
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP CONSTRAINT "FK_41c119ab4a354c1eb1d8b6c14ec"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP CONSTRAINT "FK_2d7bca1bb020dc9392b692b2602"`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP CONSTRAINT "FK_e93bed3062e51ffa8b01b44dbce"`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP CONSTRAINT "FK_d41b3ba201ce628aa9ce06404f9"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP COLUMN "cons_group_id"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP COLUMN "cons_type_id"`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP COLUMN "cons_group_id"`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP COLUMN "cons_type_id"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD "group_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD "type_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD "group_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD "type_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD CONSTRAINT "FK_e15d756cd47156e61279e23967d" FOREIGN KEY ("group_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD CONSTRAINT "FK_80db44884234087a0d638deaae7" FOREIGN KEY ("type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD CONSTRAINT "FK_1e06e5803c5047d8e4fa63c430f" FOREIGN KEY ("group_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD CONSTRAINT "FK_7b2abadde4f2b1e3d1d8f1119e3" FOREIGN KEY ("type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP COLUMN "type_id"`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP COLUMN "group_id"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP COLUMN "type_id"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP COLUMN "group_id"`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD "cons_type_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD "cons_group_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD "cons_type_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD "cons_group_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD CONSTRAINT "FK_d41b3ba201ce628aa9ce06404f9" FOREIGN KEY ("cons_group_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD CONSTRAINT "FK_e93bed3062e51ffa8b01b44dbce" FOREIGN KEY ("cons_type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD CONSTRAINT "FK_2d7bca1bb020dc9392b692b2602" FOREIGN KEY ("cons_group_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD CONSTRAINT "FK_41c119ab4a354c1eb1d8b6c14ec" FOREIGN KEY ("cons_type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

}
