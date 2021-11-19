import { MigrationInterface, QueryRunner } from "typeorm";

export class changeIdToNumberForMasterValueAndGroupValue1634555009501 implements MigrationInterface {
  name = "changeIdToNumberForMasterValueAndGroupValue1634555009501";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "group_values" DROP CONSTRAINT "FK_6358c723640928072ec28218c58"`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP CONSTRAINT "FK_2e1ca1a84da8a0798b4a9882cac"`);
    await queryRunner.query(`ALTER TABLE "group_values" DROP CONSTRAINT "PK_222027d98916d3ed61a0ffbb2bb"`);
    await queryRunner.query(`ALTER TABLE "group_values" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "group_values" ADD "id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "group_values" ADD CONSTRAINT "PK_222027d98916d3ed61a0ffbb2bb" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "group_values" DROP COLUMN "parent_id"`);
    await queryRunner.query(`ALTER TABLE "group_values" ADD "parent_id" integer`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_c4a614082e4e5c9ee4ce0808538"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_0c02e079dfeacd744061891c420"`);
    await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "FK_a29feb8c921ee69156ee37a1d24"`);
    await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "FK_ec2c5315fae0d0fe46d29c013e3"`);
    await queryRunner.query(`ALTER TABLE "employee_limits" DROP CONSTRAINT "FK_d199a6730d8656afad29711d48d"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP CONSTRAINT "FK_4c46b094d7169473e37f6902e7d"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP CONSTRAINT "FK_c506d6dd7db93068d8499e76949"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP CONSTRAINT "FK_2cb570210778638846613ad1b8a"`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP CONSTRAINT "FK_6c75bc45315e7c686b6984d3f9b"`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP CONSTRAINT "PK_339e06b23c50e24e0641630f6eb"`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "master_values" ADD "id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "master_values" ADD CONSTRAINT "PK_339e06b23c50e24e0641630f6eb" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "master_values" DROP COLUMN "group_id"`);
    await queryRunner.query(`ALTER TABLE "master_values" ADD "group_id" integer`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP COLUMN "parent_id"`);
    await queryRunner.query(`ALTER TABLE "master_values" ADD "parent_id" integer`);
    await queryRunner.query(`ALTER TABLE "employee_limits" DROP COLUMN "type_id"`);
    await queryRunner.query(`ALTER TABLE "employee_limits" ADD "type_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP COLUMN "city_id"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" ADD "city_id" integer`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP COLUMN "ward_id"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" ADD "ward_id" integer`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP COLUMN "district_id"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" ADD "district_id" integer`);
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "department_id"`);
    await queryRunner.query(`ALTER TABLE "employees" ADD "department_id" integer`);
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "title_id"`);
    await queryRunner.query(`ALTER TABLE "employees" ADD "title_id" integer`);
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "status_id"`);
    await queryRunner.query(`ALTER TABLE "employees" ADD "status_id" integer`);
    await queryRunner.query(`ALTER TABLE "collaborators" DROP COLUMN "company_id"`);
    await queryRunner.query(`ALTER TABLE "collaborators" ADD "company_id" integer`);
    await queryRunner.query(`ALTER TABLE "collaborators" DROP COLUMN "collaborator_type_id"`);
    await queryRunner.query(`ALTER TABLE "collaborators" ADD "collaborator_type_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "group_values" ADD CONSTRAINT "FK_6358c723640928072ec28218c58" FOREIGN KEY ("parent_id") REFERENCES "group_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "master_values" ADD CONSTRAINT "FK_2e1ca1a84da8a0798b4a9882cac" FOREIGN KEY ("group_id") REFERENCES "group_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "master_values" ADD CONSTRAINT "FK_6c75bc45315e7c686b6984d3f9b" FOREIGN KEY ("parent_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_limits" ADD CONSTRAINT "FK_d199a6730d8656afad29711d48d" FOREIGN KEY ("type_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_0c02e079dfeacd744061891c420" FOREIGN KEY ("title_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_c4a614082e4e5c9ee4ce0808538" FOREIGN KEY ("status_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "collaborators" ADD CONSTRAINT "FK_a29feb8c921ee69156ee37a1d24" FOREIGN KEY ("company_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "collaborators" ADD CONSTRAINT "FK_ec2c5315fae0d0fe46d29c013e3" FOREIGN KEY ("collaborator_type_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "FK_ec2c5315fae0d0fe46d29c013e3"`);
    await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "FK_a29feb8c921ee69156ee37a1d24"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_c4a614082e4e5c9ee4ce0808538"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_0c02e079dfeacd744061891c420"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP CONSTRAINT "FK_c506d6dd7db93068d8499e76949"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP CONSTRAINT "FK_2cb570210778638846613ad1b8a"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP CONSTRAINT "FK_4c46b094d7169473e37f6902e7d"`);
    await queryRunner.query(`ALTER TABLE "employee_limits" DROP CONSTRAINT "FK_d199a6730d8656afad29711d48d"`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP CONSTRAINT "FK_6c75bc45315e7c686b6984d3f9b"`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP CONSTRAINT "FK_2e1ca1a84da8a0798b4a9882cac"`);
    await queryRunner.query(`ALTER TABLE "group_values" DROP CONSTRAINT "FK_6358c723640928072ec28218c58"`);
    await queryRunner.query(`ALTER TABLE "collaborators" DROP COLUMN "collaborator_type_id"`);
    await queryRunner.query(`ALTER TABLE "collaborators" ADD "collaborator_type_id" text`);
    await queryRunner.query(`ALTER TABLE "collaborators" DROP COLUMN "company_id"`);
    await queryRunner.query(`ALTER TABLE "collaborators" ADD "company_id" text`);
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "status_id"`);
    await queryRunner.query(`ALTER TABLE "employees" ADD "status_id" text`);
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "title_id"`);
    await queryRunner.query(`ALTER TABLE "employees" ADD "title_id" text`);
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "department_id"`);
    await queryRunner.query(`ALTER TABLE "employees" ADD "department_id" text`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP COLUMN "district_id"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" ADD "district_id" text`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP COLUMN "ward_id"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" ADD "ward_id" text`);
    await queryRunner.query(`ALTER TABLE "employee_regions" DROP COLUMN "city_id"`);
    await queryRunner.query(`ALTER TABLE "employee_regions" ADD "city_id" text`);
    await queryRunner.query(`ALTER TABLE "employee_limits" DROP COLUMN "type_id"`);
    await queryRunner.query(`ALTER TABLE "employee_limits" ADD "type_id" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP COLUMN "parent_id"`);
    await queryRunner.query(`ALTER TABLE "master_values" ADD "parent_id" text`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP COLUMN "group_id"`);
    await queryRunner.query(`ALTER TABLE "master_values" ADD "group_id" text`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP CONSTRAINT "PK_339e06b23c50e24e0641630f6eb"`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "master_values" ADD "id" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "master_values" ADD CONSTRAINT "PK_339e06b23c50e24e0641630f6eb" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "master_values" ADD CONSTRAINT "FK_6c75bc45315e7c686b6984d3f9b" FOREIGN KEY ("parent_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_regions" ADD CONSTRAINT "FK_c506d6dd7db93068d8499e76949" FOREIGN KEY ("district_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_regions" ADD CONSTRAINT "FK_4c46b094d7169473e37f6902e7d" FOREIGN KEY ("city_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_limits" ADD CONSTRAINT "FK_d199a6730d8656afad29711d48d" FOREIGN KEY ("type_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "collaborators" ADD CONSTRAINT "FK_a29feb8c921ee69156ee37a1d24" FOREIGN KEY ("company_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_c4a614082e4e5c9ee4ce0808538" FOREIGN KEY ("status_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "group_values" DROP COLUMN "parent_id"`);
    await queryRunner.query(`ALTER TABLE "group_values" ADD "parent_id" text`);
    await queryRunner.query(`ALTER TABLE "group_values" DROP CONSTRAINT "PK_222027d98916d3ed61a0ffbb2bb"`);
    await queryRunner.query(`ALTER TABLE "group_values" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "group_values" ADD "id" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "group_values" ADD CONSTRAINT "PK_222027d98916d3ed61a0ffbb2bb" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "master_values" ADD CONSTRAINT "FK_2e1ca1a84da8a0798b4a9882cac" FOREIGN KEY ("group_id") REFERENCES "group_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_values" ADD CONSTRAINT "FK_6358c723640928072ec28218c58" FOREIGN KEY ("parent_id") REFERENCES "group_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
