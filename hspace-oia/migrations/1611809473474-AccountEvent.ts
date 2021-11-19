import { MigrationInterface, QueryRunner } from "typeorm";

export class AccountEvent1611809473474 implements MigrationInterface {
  name = "AccountEvent1611809473474";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "account_events"
                             (
                                 "id"           SERIAL            NOT NULL,
                                 "created_at"   TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updated_at"   TIMESTAMP         NOT NULL DEFAULT now(),
                                 "reference_id" integer,
                                 "model"        character varying NOT NULL,
                                 "type"         character varying NOT NULL,
                                 "account_id"   integer,
                                 "created_by"   integer,
                                 "updated_by"   integer,
                                 CONSTRAINT "PK_096b79d6426e443a0f0b096e7cf" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "account_events"
        ADD CONSTRAINT "FK_0c9ad3c97fd1fc376d172cd03e9" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_events"
        ADD CONSTRAINT "FK_47f4579492c65a481cbbd3d0c48" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "account_events"
        ADD CONSTRAINT "FK_2c3916581bee21ef0bff73d00e5" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    // await ResourceSeed.run(queryRunner);
    // await FeatureSeed.run(queryRunner);
    // await PolicySeed.run(queryRunner);
    // await NotificationTemplateSeed.seedForBDS(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account_events"
        DROP CONSTRAINT "FK_2c3916581bee21ef0bff73d00e5"`);
    await queryRunner.query(`ALTER TABLE "account_events"
        DROP CONSTRAINT "FK_47f4579492c65a481cbbd3d0c48"`);
    await queryRunner.query(`ALTER TABLE "account_events"
        DROP CONSTRAINT "FK_0c9ad3c97fd1fc376d172cd03e9"`);
    await queryRunner.query("DROP TABLE \"account_events\"");
  }
}
