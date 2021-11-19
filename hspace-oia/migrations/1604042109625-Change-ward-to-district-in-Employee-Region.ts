import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeWardToDistrictInEmployeeRegion1604042109625 implements MigrationInterface {
  name = "ChangeWardToDistrictInEmployeeRegion1604042109625";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ADD "district_id" integer`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ADD CONSTRAINT "FK_c506d6dd7db93068d8499e76949" FOREIGN KEY ("district_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`UPDATE employee_regions er
                             SET district_id = er.ward_id`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee_regions"
        DROP CONSTRAINT "FK_c506d6dd7db93068d8499e76949"`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        DROP COLUMN "district_id"`);
  }

}
