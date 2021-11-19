import { MigrationInterface, QueryRunner } from "typeorm";

export class PropertyProgress1619507198439 implements MigrationInterface {
  name = "PropertyProgress1619507198439";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "property_progress"
                             (
                                 "id"          SERIAL                NOT NULL,
                                 "created_at"  TIMESTAMP             NOT NULL DEFAULT now(),
                                 "property_id" integer,
                                 "type"        character varying(10) NOT NULL,
                                 "created_by"  integer,
                                 CONSTRAINT "PK_ce5a1b1c2553a1c1f019cd526d4" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "property_progress"
        ADD CONSTRAINT "FK_fa9d34db8791455428eb1555ba5" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "property_progress"
        ADD CONSTRAINT "FK_039aeffc8271db4a26ae49ad5f2" FOREIGN KEY ("property_id") REFERENCES "properties" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "property_progress"
        DROP CONSTRAINT "FK_039aeffc8271db4a26ae49ad5f2"`);
    await queryRunner.query(`ALTER TABLE "property_progress"
        DROP CONSTRAINT "FK_fa9d34db8791455428eb1555ba5"`);
    await queryRunner.query(`DROP TABLE "property_progress"`);
  }

}
