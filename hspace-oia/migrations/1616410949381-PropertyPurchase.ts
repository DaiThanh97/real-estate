import { MigrationInterface, QueryRunner } from "typeorm";

export class PropertyPurchase1616410949381 implements MigrationInterface {
  name = "PropertyPurchase1616410949381";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "property_purchases"
                             (
                                 "id"           SERIAL           NOT NULL,
                                 "created_at"   TIMESTAMP        NOT NULL DEFAULT now(),
                                 "updated_at"   TIMESTAMP        NOT NULL DEFAULT now(),
                                 "price"        double precision NOT NULL DEFAULT '0',
                                 "date"         date             NOT NULL,
                                 "assignee_id"  integer,
                                 "supporter_id" integer,
                                 "property_id"  integer,
                                 "created_by"   integer,
                                 "updated_by"   integer,
                                 CONSTRAINT "PK_035ccef23305de878d00d168d59" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "property_purchases"
        ADD CONSTRAINT "FK_aaec80d8f21a4c3ab3e619f338a" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "property_purchases"
        ADD CONSTRAINT "FK_f9d01e03be01dab1c19a9f48497" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "property_purchases"
        ADD CONSTRAINT "FK_e09d5479910150254c924f57999" FOREIGN KEY ("assignee_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "property_purchases"
        ADD CONSTRAINT "FK_f56a995fdaf0e751eabfdf19b7d" FOREIGN KEY ("supporter_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "property_purchases"
        ADD CONSTRAINT "FK_d76596b403f64ee3da7f4546548" FOREIGN KEY ("property_id") REFERENCES "properties" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "property_purchases"
        DROP CONSTRAINT "FK_d76596b403f64ee3da7f4546548"`);
    await queryRunner.query(`ALTER TABLE "property_purchases"
        DROP CONSTRAINT "FK_f56a995fdaf0e751eabfdf19b7d"`);
    await queryRunner.query(`ALTER TABLE "property_purchases"
        DROP CONSTRAINT "FK_e09d5479910150254c924f57999"`);
    await queryRunner.query(`ALTER TABLE "property_purchases"
        DROP CONSTRAINT "FK_f9d01e03be01dab1c19a9f48497"`);
    await queryRunner.query(`ALTER TABLE "property_purchases"
        DROP CONSTRAINT "FK_aaec80d8f21a4c3ab3e619f338a"`);
    await queryRunner.query("DROP TABLE \"property_purchases\"");
  }

}
