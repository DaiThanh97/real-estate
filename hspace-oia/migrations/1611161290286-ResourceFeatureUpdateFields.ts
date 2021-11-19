import { MigrationInterface, QueryRunner } from "typeorm";

export class ResourceFeatureUpdateFields1611161290286 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "features"
        ADD "act" character varying`);
    await queryRunner.query(`ALTER TABLE "features"
        ADD "notification_action" character varying`);
    await queryRunner.query(`ALTER TABLE "resources"
        ADD "model" character varying`);
    await queryRunner.query(`ALTER TABLE "resources"
        ADD "group" character varying`);
    await queryRunner.query(`ALTER TABLE "resources"
        ADD "api" character varying`);

    // seed resource and feature
    // await ResourceSeed.run(queryRunner);
    // await FeatureSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "resources"
        DROP COLUMN "api"`);
    await queryRunner.query(`ALTER TABLE "resources"
        DROP COLUMN "group"`);
    await queryRunner.query(`ALTER TABLE "resources"
        DROP COLUMN "model"`);
    await queryRunner.query(`ALTER TABLE "features"
        DROP COLUMN "notification_action"`);
    await queryRunner.query(`ALTER TABLE "features"
        DROP COLUMN "act"`);
  }

}
