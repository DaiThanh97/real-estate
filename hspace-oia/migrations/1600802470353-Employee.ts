import { MigrationInterface, QueryRunner } from "typeorm";

export class Employee1600802470353 implements MigrationInterface {
  name = "Employee1600802470353";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "master_values"
        DROP CONSTRAINT "FK_a3928cfe46888738b096dbc83e5"`);
    await queryRunner.query(`CREATE TABLE "employee_limits"
                             (
                                 "id"          SERIAL           NOT NULL,
                                 "created_at"  TIMESTAMP        NOT NULL DEFAULT now(),
                                 "updated_at"  TIMESTAMP        NOT NULL DEFAULT now(),
                                 "is_active"   boolean          NOT NULL DEFAULT true,
                                 "type_id"     integer          NOT NULL,
                                 "employee_id" integer          NOT NULL,
                                 "value"       double precision NOT NULL,
                                 "created_by"  integer,
                                 "updated_by"  integer,
                                 CONSTRAINT "PK_13759155a8a08c21f8051f8eccf" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "employee_regions"
                             (
                                 "id"          SERIAL    NOT NULL,
                                 "created_at"  TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at"  TIMESTAMP NOT NULL DEFAULT now(),
                                 "is_active"   boolean   NOT NULL DEFAULT true,
                                 "city_id"     integer,
                                 "ward_id"     integer,
                                 "employee_id" integer   NOT NULL,
                                 "created_by"  integer,
                                 "updated_by"  integer,
                                 CONSTRAINT "PK_190dc2a2f5d8ed8f5a703872140" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "master_values"
        DROP COLUMN "group_value_id"`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD "code" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD CONSTRAINT "UQ_2f88c4dff473076e55ca2568d51" UNIQUE ("code")`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD "full_name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD "birthday" date NOT NULL`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD "joined_date" date NOT NULL`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD "phone" character varying NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD "email" character varying NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD "department_id" integer`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD "title_id" integer`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD "manager_id" integer`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD "status_id" integer`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD "created_by" integer`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD "updated_by" integer`);
    await queryRunner.query(`ALTER TABLE "group_values"
        ADD CONSTRAINT "UQ_222027d98916d3ed61a0ffbb2bb" UNIQUE ("id")`);
    await queryRunner.query(`ALTER TABLE "group_values"
        ALTER COLUMN "updated_at" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "group_values"
        ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ADD CONSTRAINT "UQ_339e06b23c50e24e0641630f6eb" UNIQUE ("id")`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ALTER COLUMN "updated_at" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ALTER COLUMN "group_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD CONSTRAINT "FK_43d76ca7eecf9373241e2e890fb" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD CONSTRAINT "FK_0ab5290751972652ae2786f4bc3" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD CONSTRAINT "FK_0c02e079dfeacd744061891c420" FOREIGN KEY ("title_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD CONSTRAINT "FK_bcdf921072a19dd2758a628c5c0" FOREIGN KEY ("manager_id") REFERENCES "employees" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employees"
        ADD CONSTRAINT "FK_c4a614082e4e5c9ee4ce0808538" FOREIGN KEY ("status_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        ADD CONSTRAINT "FK_9941600a57aa3d50717093146f6" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        ADD CONSTRAINT "FK_cd6cc27a5135d789fe18ffef2c4" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        ADD CONSTRAINT "FK_d199a6730d8656afad29711d48d" FOREIGN KEY ("type_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        ADD CONSTRAINT "FK_2aa4139f95956b00572031e64c2" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ADD CONSTRAINT "FK_2b1d33155f9b075b4f23e9a5f36" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ADD CONSTRAINT "FK_b7c5e81c46d8821604971a4d8fe" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ADD CONSTRAINT "FK_4c46b094d7169473e37f6902e7d" FOREIGN KEY ("city_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ADD CONSTRAINT "FK_2cb570210778638846613ad1b8a" FOREIGN KEY ("ward_id") REFERENCES "master_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        ADD CONSTRAINT "FK_af6acf9f2c28d64672afb7ab951" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
    await queryRunner.query(`ALTER TABLE "employee_regions"
        DROP CONSTRAINT "FK_af6acf9f2c28d64672afb7ab951"`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        DROP CONSTRAINT "FK_2cb570210778638846613ad1b8a"`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        DROP CONSTRAINT "FK_4c46b094d7169473e37f6902e7d"`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        DROP CONSTRAINT "FK_b7c5e81c46d8821604971a4d8fe"`);
    await queryRunner.query(`ALTER TABLE "employee_regions"
        DROP CONSTRAINT "FK_2b1d33155f9b075b4f23e9a5f36"`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        DROP CONSTRAINT "FK_2aa4139f95956b00572031e64c2"`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        DROP CONSTRAINT "FK_d199a6730d8656afad29711d48d"`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        DROP CONSTRAINT "FK_cd6cc27a5135d789fe18ffef2c4"`);
    await queryRunner.query(`ALTER TABLE "employee_limits"
        DROP CONSTRAINT "FK_9941600a57aa3d50717093146f6"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP CONSTRAINT "FK_c4a614082e4e5c9ee4ce0808538"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP CONSTRAINT "FK_bcdf921072a19dd2758a628c5c0"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP CONSTRAINT "FK_0c02e079dfeacd744061891c420"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP CONSTRAINT "FK_0ab5290751972652ae2786f4bc3"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP CONSTRAINT "FK_43d76ca7eecf9373241e2e890fb"`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ALTER COLUMN "group_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ALTER COLUMN "updated_at" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "master_values"
        DROP CONSTRAINT "UQ_339e06b23c50e24e0641630f6eb"`);
    await queryRunner.query(`ALTER TABLE "group_values"
        ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "group_values"
        ALTER COLUMN "updated_at" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "group_values"
        DROP CONSTRAINT "UQ_222027d98916d3ed61a0ffbb2bb"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP COLUMN "status_id"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP COLUMN "manager_id"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP COLUMN "title_id"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP COLUMN "department_id"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP COLUMN "joined_date"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP COLUMN "birthday"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP COLUMN "full_name"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP CONSTRAINT "UQ_2f88c4dff473076e55ca2568d51"`);
    await queryRunner.query(`ALTER TABLE "employees"
        DROP COLUMN "code"`);
    await queryRunner.query(`ALTER TABLE "master_values"
        ADD "group_value_id" integer`);
    await queryRunner.query("DROP TABLE \"employee_regions\"");
    await queryRunner.query("DROP TABLE \"employee_limits\"");
    await queryRunner.query(`ALTER TABLE "master_values"
        ADD CONSTRAINT "FK_a3928cfe46888738b096dbc83e5" FOREIGN KEY ("group_value_id") REFERENCES "group_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

}
