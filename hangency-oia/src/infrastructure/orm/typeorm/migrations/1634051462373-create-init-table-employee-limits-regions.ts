import { MigrationInterface, QueryRunner } from "typeorm";

export class createInitTableEmployeeLimitsRegions1634051462373 implements MigrationInterface {
  name = "createInitTableEmployeeLimitsRegions1634051462373";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employee_limits" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "type_id" text NOT NULL, "employee_id" text NOT NULL, "value" double precision NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_by" text, "updated_by" text, CONSTRAINT "PK_13759155a8a08c21f8051f8eccf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee_regions" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "city_id" text, "ward_id" text, "district_id" text, "employee_id" text NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_by" text, "updated_by" text, CONSTRAINT "PK_190dc2a2f5d8ed8f5a703872140" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_limits" ADD CONSTRAINT "FK_9941600a57aa3d50717093146f6" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_limits" ADD CONSTRAINT "FK_cd6cc27a5135d789fe18ffef2c4" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_limits" ADD CONSTRAINT "FK_d199a6730d8656afad29711d48d" FOREIGN KEY ("type_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_limits" ADD CONSTRAINT "FK_2aa4139f95956b00572031e64c2" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_regions" ADD CONSTRAINT "FK_2b1d33155f9b075b4f23e9a5f36" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_regions" ADD CONSTRAINT "FK_b7c5e81c46d8821604971a4d8fe" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_regions" ADD CONSTRAINT "FK_4c46b094d7169473e37f6902e7d" FOREIGN KEY ("city_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_regions" ADD CONSTRAINT "FK_2cb570210778638846613ad1b8a" FOREIGN KEY ("ward_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_regions" ADD CONSTRAINT "FK_c506d6dd7db93068d8499e76949" FOREIGN KEY ("district_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_regions" ADD CONSTRAINT "FK_af6acf9f2c28d64672afb7ab951" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP CONSTRAINT "FK_af6acf9f2c28d64672afb7ab951"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP CONSTRAINT "FK_c506d6dd7db93068d8499e76949"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP CONSTRAINT "FK_2cb570210778638846613ad1b8a"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP CONSTRAINT "FK_4c46b094d7169473e37f6902e7d"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP CONSTRAINT "FK_b7c5e81c46d8821604971a4d8fe"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP CONSTRAINT "FK_2b1d33155f9b075b4f23e9a5f36"`);
    await queryRunner.query(`ALTER TABLE "employee_limits" DROP CONSTRAINT "FK_2aa4139f95956b00572031e64c2"`);
    await queryRunner.query(`ALTER TABLE "employee_limits" DROP CONSTRAINT "FK_d199a6730d8656afad29711d48d"`);
    await queryRunner.query(`ALTER TABLE "employee_limits" DROP CONSTRAINT "FK_cd6cc27a5135d789fe18ffef2c4"`);
    await queryRunner.query(`ALTER TABLE "employee_limits" DROP CONSTRAINT "FK_9941600a57aa3d50717093146f6"`);
    await queryRunner.query(`DROP TABLE "employee_regions"`);
    await queryRunner.query(`DROP TABLE "employee_limits"`);
  }
}
