import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueAccountGroupCode1600682277049 implements MigrationInterface {
  name = "UniqueAccountGroupCode1600682277049";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account_groups"
        ADD CONSTRAINT "UQ_bcbc2c59c6b8787d5aa463fa19e" UNIQUE ("code")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account_groups"
        DROP CONSTRAINT "UQ_bcbc2c59c6b8787d5aa463fa19e"`);
  }

}
