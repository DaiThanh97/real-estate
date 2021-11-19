import { MigrationInterface, QueryRunner } from "typeorm";

export class PropertyChangeBrokerID1606384655722 implements MigrationInterface {
  name = "PropertyChangeBrokerID1606384655722";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties"
        RENAME COLUMN "broker" TO "broker_id"`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "broker_id"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "broker_id" integer`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD CONSTRAINT "FK_a02edd2223c95a5a0952d3606cc" FOREIGN KEY ("broker_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties"
        DROP CONSTRAINT "FK_a02edd2223c95a5a0952d3606cc"`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "broker_id"`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "broker_id" character varying(256)`);
    await queryRunner.query(`ALTER TABLE "properties"
        RENAME COLUMN "broker_id" TO "broker"`);
  }

}
