import { MigrationInterface, QueryRunner } from "typeorm";

export class InspectionStatementAddLandUseRightsColumn1604258780090 implements MigrationInterface {
  name = "InspectionStatementAddLandUseRightsColumn1604258780090";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "disadvantage_levels"
                             (
                                 "id"                      SERIAL            NOT NULL,
                                 "created_at"              TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updated_at"              TIMESTAMP         NOT NULL DEFAULT now(),
                                 "inspection_statement_id" integer           NOT NULL,
                                 "cons_group_id"           integer           NOT NULL,
                                 "cons_type_id"            integer           NOT NULL,
                                 "level"                   double precision  NOT NULL,
                                 "note"                    character varying NOT NULL DEFAULT '',
                                 CONSTRAINT "PK_d15a5bbde613cc7e17ced6fa286" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "advantage_levels"
                             (
                                 "id"                      SERIAL            NOT NULL,
                                 "created_at"              TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updated_at"              TIMESTAMP         NOT NULL DEFAULT now(),
                                 "inspection_statement_id" integer           NOT NULL,
                                 "cons_group_id"           integer           NOT NULL,
                                 "cons_type_id"            integer           NOT NULL,
                                 "level"                   double precision  NOT NULL,
                                 "note"                    character varying NOT NULL DEFAULT '',
                                 CONSTRAINT "PK_15f069a9c36db10c2955208315a" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "land_use_rights" jsonb`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "construction" jsonb`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "total_adjustment" double precision`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "market_land_unit_price" integer`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "total_advantage_level" double precision`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "total_disadvantage_level" double precision`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD CONSTRAINT "FK_cc62d032b1a00e7ca062d441eb8" FOREIGN KEY ("inspection_statement_id") REFERENCES "inspection_statement_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD CONSTRAINT "FK_2d7bca1bb020dc9392b692b2602" FOREIGN KEY ("cons_group_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD CONSTRAINT "FK_41c119ab4a354c1eb1d8b6c14ec" FOREIGN KEY ("cons_type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD CONSTRAINT "FK_dfc704e0d064f5ca14fb65485c4" FOREIGN KEY ("inspection_statement_id") REFERENCES "inspection_statement_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD CONSTRAINT "FK_d41b3ba201ce628aa9ce06404f9" FOREIGN KEY ("cons_group_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD CONSTRAINT "FK_e93bed3062e51ffa8b01b44dbce" FOREIGN KEY ("cons_type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP CONSTRAINT "FK_e93bed3062e51ffa8b01b44dbce"`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP CONSTRAINT "FK_d41b3ba201ce628aa9ce06404f9"`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP CONSTRAINT "FK_dfc704e0d064f5ca14fb65485c4"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP CONSTRAINT "FK_41c119ab4a354c1eb1d8b6c14ec"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP CONSTRAINT "FK_2d7bca1bb020dc9392b692b2602"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP CONSTRAINT "FK_cc62d032b1a00e7ca062d441eb8"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "total_disadvantage_level"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "total_advantage_level"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "market_land_unit_price"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "total_adjustment"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "construction"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "land_use_rights"`);
    await queryRunner.query("DROP TABLE \"advantage_levels\"");
    await queryRunner.query("DROP TABLE \"disadvantage_levels\"");
  }

}
