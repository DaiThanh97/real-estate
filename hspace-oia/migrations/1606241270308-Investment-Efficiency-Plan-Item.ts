import { MigrationInterface, QueryRunner } from "typeorm";

export class InvestmentEfficiencyPlanItem1606241270308 implements MigrationInterface {
  name = "InvestmentEfficiencyPlanItem1606241270308";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_2d60d86a9a3556f5656df3db419"`);
    await queryRunner.query(`CREATE TABLE "investment_efficiency_lands"
                             (
                                 "id"           SERIAL    NOT NULL,
                                 "created_at"   TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at"   TIMESTAMP NOT NULL DEFAULT now(),
                                 "index"        integer,
                                 "plan_item_id" integer,
                                 CONSTRAINT "PK_b1890d388c38e8f423a1d584101" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "investment_efficiency_plan_items"
                             (
                                 "id"                       SERIAL            NOT NULL,
                                 "created_at"               TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updated_at"               TIMESTAMP         NOT NULL DEFAULT now(),
                                 "investment_efficiency_id" integer,
                                 "index"                    integer,
                                 "name"                     character varying NOT NULL DEFAULT '',
                                 "plan_type_id"             integer,
                                 "construction_type_id"     integer,
                                 "description"              character varying NOT NULL DEFAULT '',
                                 "price"                    double precision,
                                 "investment_time"          double precision,
                                 CONSTRAINT "PK_a993e48054ddb6dcf3dbd750239" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD "appraisal_expectation_id" integer`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_2d60d86a9a3556f5656df3db419" FOREIGN KEY ("inspection_expectation_id") REFERENCES "appraisal_expectation_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_lands"
        ADD CONSTRAINT "FK_4cfa6e44b22f8bc7c09e2a8b97c" FOREIGN KEY ("plan_item_id") REFERENCES "investment_efficiency_plan_items" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        ADD CONSTRAINT "FK_12e4a534d4c40ae1b64720a6d1c" FOREIGN KEY ("investment_efficiency_id") REFERENCES "investment_efficiency_notes" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        ADD CONSTRAINT "FK_8cb4c411b9ff03ba27cd87432d6" FOREIGN KEY ("plan_type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        ADD CONSTRAINT "FK_2e16e5dc3d0e9bdc7f76515ab91" FOREIGN KEY ("construction_type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        DROP CONSTRAINT "FK_2e16e5dc3d0e9bdc7f76515ab91"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        DROP CONSTRAINT "FK_8cb4c411b9ff03ba27cd87432d6"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_plan_items"
        DROP CONSTRAINT "FK_12e4a534d4c40ae1b64720a6d1c"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_lands"
        DROP CONSTRAINT "FK_4cfa6e44b22f8bc7c09e2a8b97c"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_2d60d86a9a3556f5656df3db419"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP COLUMN "appraisal_expectation_id"`);
    await queryRunner.query("DROP TABLE \"investment_efficiency_plan_items\"");
    await queryRunner.query("DROP TABLE \"investment_efficiency_lands\"");
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_2d60d86a9a3556f5656df3db419" FOREIGN KEY ("inspection_expectation_id") REFERENCES "inspection_expectation_notes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

}
