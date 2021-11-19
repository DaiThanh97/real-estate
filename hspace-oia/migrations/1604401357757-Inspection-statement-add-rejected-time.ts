import { MigrationInterface, QueryRunner } from "typeorm";

export class InspectionStatementAddRejectedTime1604401357757 implements MigrationInterface {
  name = "InspectionStatementAddRejectedTime1604401357757";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "rejected_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "rejected_by" integer`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_76a505bc88dc60ba3e8c9922065" FOREIGN KEY ("rejected_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_76a505bc88dc60ba3e8c9922065"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "rejected_by"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "rejected_at"`);
  }

}
