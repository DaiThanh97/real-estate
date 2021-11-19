import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomDataForMasterValue1600947300643 implements MigrationInterface {
  name = "CustomDataForMasterValue1600947300643";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "master_values"
        DROP COLUMN "custom_fields"`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ADD "custom_data" json`);
    await queryRunner.query(`ALTER TABLE "group_values"
        DROP CONSTRAINT "FK_6358c723640928072ec28218c58"`);
    await queryRunner.query(`ALTER TABLE "master_values"
        DROP CONSTRAINT "FK_2e1ca1a84da8a0798b4a9882cac"`);
    await queryRunner.query(`ALTER TABLE "group_values"
        DROP CONSTRAINT "UQ_222027d98916d3ed61a0ffbb2bb"`);
    await queryRunner.query(`ALTER TABLE "master_values"
        DROP CONSTRAINT "FK_6c75bc45315e7c686b6984d3f9b"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP CONSTRAINT "FK_0c02e079dfeacd744061891c420"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP CONSTRAINT "FK_c4a614082e4e5c9ee4ce0808538"`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        DROP CONSTRAINT "FK_d199a6730d8656afad29711d48d"`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        DROP CONSTRAINT "FK_2cb570210778638846613ad1b8a"`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        DROP CONSTRAINT "FK_4c46b094d7169473e37f6902e7d"`);
    await queryRunner.query(`ALTER TABLE "master_values"
        DROP CONSTRAINT "UQ_339e06b23c50e24e0641630f6eb"`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ALTER COLUMN "value_code" SET DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD CONSTRAINT "FK_0c02e079dfeacd744061891c420" FOREIGN KEY ("title_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD CONSTRAINT "FK_c4a614082e4e5c9ee4ce0808538" FOREIGN KEY ("status_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        ADD CONSTRAINT "FK_d199a6730d8656afad29711d48d" FOREIGN KEY ("type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ADD CONSTRAINT "FK_4c46b094d7169473e37f6902e7d" FOREIGN KEY ("city_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ADD CONSTRAINT "FK_2cb570210778638846613ad1b8a" FOREIGN KEY ("ward_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "group_values"
        ADD CONSTRAINT "FK_6358c723640928072ec28218c58" FOREIGN KEY ("parent_id") REFERENCES "group_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ADD CONSTRAINT "FK_2e1ca1a84da8a0798b4a9882cac" FOREIGN KEY ("group_id") REFERENCES "group_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ADD CONSTRAINT "FK_6c75bc45315e7c686b6984d3f9b" FOREIGN KEY ("parent_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "master_values"
        DROP CONSTRAINT "FK_6c75bc45315e7c686b6984d3f9b"`);
    await queryRunner.query(`ALTER TABLE "master_values"
        DROP CONSTRAINT "FK_2e1ca1a84da8a0798b4a9882cac"`);
    await queryRunner.query(`ALTER TABLE "group_values"
        DROP CONSTRAINT "FK_6358c723640928072ec28218c58"`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        DROP CONSTRAINT "FK_2cb570210778638846613ad1b8a"`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        DROP CONSTRAINT "FK_4c46b094d7169473e37f6902e7d"`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        DROP CONSTRAINT "FK_d199a6730d8656afad29711d48d"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP CONSTRAINT "FK_c4a614082e4e5c9ee4ce0808538"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP CONSTRAINT "FK_0c02e079dfeacd744061891c420"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ALTER COLUMN "value_code" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ADD CONSTRAINT "UQ_339e06b23c50e24e0641630f6eb" UNIQUE ("id")`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ADD CONSTRAINT "FK_4c46b094d7169473e37f6902e7d" FOREIGN KEY ("city_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ADD CONSTRAINT "FK_2cb570210778638846613ad1b8a" FOREIGN KEY ("ward_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        ADD CONSTRAINT "FK_d199a6730d8656afad29711d48d" FOREIGN KEY ("type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD CONSTRAINT "FK_c4a614082e4e5c9ee4ce0808538" FOREIGN KEY ("status_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD CONSTRAINT "FK_0c02e079dfeacd744061891c420" FOREIGN KEY ("title_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ADD CONSTRAINT "FK_6c75bc45315e7c686b6984d3f9b" FOREIGN KEY ("parent_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "group_values"
        ADD CONSTRAINT "UQ_222027d98916d3ed61a0ffbb2bb" UNIQUE ("id")`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ADD CONSTRAINT "FK_2e1ca1a84da8a0798b4a9882cac" FOREIGN KEY ("group_id") REFERENCES "group_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "group_values"
        ADD CONSTRAINT "FK_6358c723640928072ec28218c58" FOREIGN KEY ("parent_id") REFERENCES "group_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "master_values"
        DROP COLUMN "custom_data"`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ADD "custom_fields" jsonb NOT NULL DEFAULT '{}'`);
  }

}
