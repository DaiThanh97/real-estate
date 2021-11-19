import { MigrationInterface, QueryRunner } from "typeorm";

export class InspectionStatementLevelRelationCanBeNull1604300951534 implements MigrationInterface {
  name = "InspectionStatementLevelRelationCanBeNull1604300951534";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP CONSTRAINT "FK_cc62d032b1a00e7ca062d441eb8"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ALTER COLUMN "inspection_statement_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP CONSTRAINT "FK_dfc704e0d064f5ca14fb65485c4"`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ALTER COLUMN "inspection_statement_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD CONSTRAINT "FK_cc62d032b1a00e7ca062d441eb8" FOREIGN KEY ("inspection_statement_id") REFERENCES "inspection_statement_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD CONSTRAINT "FK_dfc704e0d064f5ca14fb65485c4" FOREIGN KEY ("inspection_statement_id") REFERENCES "inspection_statement_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        DROP CONSTRAINT "FK_dfc704e0d064f5ca14fb65485c4"`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        DROP CONSTRAINT "FK_cc62d032b1a00e7ca062d441eb8"`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ALTER COLUMN "inspection_statement_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "advantage_levels"
        ADD CONSTRAINT "FK_dfc704e0d064f5ca14fb65485c4" FOREIGN KEY ("inspection_statement_id") REFERENCES "inspection_statement_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ALTER COLUMN "inspection_statement_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "disadvantage_levels"
        ADD CONSTRAINT "FK_cc62d032b1a00e7ca062d441eb8" FOREIGN KEY ("inspection_statement_id") REFERENCES "inspection_statement_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

}
