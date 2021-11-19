import { MigrationInterface, QueryRunner } from "typeorm";

export class PropertyChangeFloatForNumberColumns1605817349657 implements MigrationInterface {
  name = "PropertyChangeFloatForNumberColumns1605817349657";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "horizontal_front"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "horizontal_front" double precision`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "horizontal_back"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "horizontal_back" double precision`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "height1"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "height1" double precision`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "height2"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "height2" double precision`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "recognized_area"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "recognized_area" double precision`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "unrecognized_area"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "unrecognized_area" double precision`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "recognized_planning_area"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "recognized_planning_area" double precision`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "recognized_floor_area"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "recognized_floor_area" double precision`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "unrecognized_floor_area"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "unrecognized_floor_area" double precision`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "unrecognized_floor_area"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "unrecognized_floor_area" integer`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "recognized_floor_area"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "recognized_floor_area" integer`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "recognized_planning_area"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "recognized_planning_area" integer`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "unrecognized_area"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "unrecognized_area" integer`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "recognized_area"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "recognized_area" integer`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "height2"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "height2" integer`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "height1"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "height1" integer`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "horizontal_back"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "horizontal_back" integer`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "horizontal_front"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "horizontal_front" integer`);
  }

}
