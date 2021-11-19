import { MigrationInterface, QueryRunner } from "typeorm";

export class createInitTableAccountsEmployeesCollaboratorsGroupValue1634043439977 implements MigrationInterface {
  name = "createInitTableAccountsEmployeesCollaboratorsGroupValue1634043439977";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "group_values" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "code" character varying NOT NULL, "name" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "parent_id" text, "created_by" text, "updated_by" text, CONSTRAINT "PK_222027d98916d3ed61a0ffbb2bb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "master_values" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "group_id" text, "group_code" text NOT NULL, "group_name" text NOT NULL, "value_code" text NOT NULL DEFAULT '', "value_name" text NOT NULL DEFAULT '', "custom_data" text DEFAULT '', "parent_id" text, "created_by" text, "updated_by" text, CONSTRAINT "PK_339e06b23c50e24e0641630f6eb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employees" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "code" text NOT NULL, "full_name" text NOT NULL, "birthday" date NOT NULL, "joined_date" date NOT NULL, "phone" text NOT NULL DEFAULT '', "email" text NOT NULL DEFAULT '', "department_id" text, "title_id" text, "manager_id" text, "status_id" text, "created_by" text, "updated_by" text, CONSTRAINT "UNIQUE_EMPLOYEE" UNIQUE ("code"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "collaborators" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "full_name" text NOT NULL, "birthday" date NOT NULL, "joined_date" date NOT NULL, "phone" text NOT NULL DEFAULT '', "email" text NOT NULL DEFAULT '', "company_id" text, "collaborator_type_id" text, "created_by" text, "updated_by" text, CONSTRAINT "UNIQUE_COLLABORATOR" UNIQUE ("phone"), CONSTRAINT "PK_f579a5df9d66287f400806ad875" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."accounts_type_enum" AS ENUM('Admin', 'Employee', 'Collaborator')`);
    await queryRunner.query(
      `CREATE TABLE "accounts" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "employee_id" text, "collaborator_id" text, "type" "public"."accounts_type_enum" NOT NULL DEFAULT 'Collaborator', "identity_name" text NOT NULL, "hash" text, "is_active" boolean NOT NULL DEFAULT true, "code" text, "last_login_at" TIMESTAMP, "display_name" text NOT NULL, "created_by" text, "updated_by" text, CONSTRAINT "UNIQUE_ACCOUNT" UNIQUE ("identity_name"), CONSTRAINT "REL_58a822e2173fc944aa584d1ee4" UNIQUE ("employee_id"), CONSTRAINT "REL_15989853f2059dfa196b125e3a" UNIQUE ("collaborator_id"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "properties" ADD "created_by" text`);
    await queryRunner.query(`ALTER TABLE "properties" ADD "updated_by" text`);
    await queryRunner.query(
      `ALTER TABLE "group_values" ADD CONSTRAINT "FK_0c05ea46960ed2be26c95627511" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_values" ADD CONSTRAINT "FK_f591bb3cd36c629eaea2df99a7b" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_values" ADD CONSTRAINT "FK_6358c723640928072ec28218c58" FOREIGN KEY ("parent_id") REFERENCES "group_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "master_values" ADD CONSTRAINT "FK_17264f533257e1c69600a1276b6" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "master_values" ADD CONSTRAINT "FK_c4e8956d9f171283aac311fd2fc" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "master_values" ADD CONSTRAINT "FK_2e1ca1a84da8a0798b4a9882cac" FOREIGN KEY ("group_id") REFERENCES "group_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "master_values" ADD CONSTRAINT "FK_6c75bc45315e7c686b6984d3f9b" FOREIGN KEY ("parent_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_43d76ca7eecf9373241e2e890fb" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_0ab5290751972652ae2786f4bc3" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_0c02e079dfeacd744061891c420" FOREIGN KEY ("title_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_bcdf921072a19dd2758a628c5c0" FOREIGN KEY ("manager_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_c4a614082e4e5c9ee4ce0808538" FOREIGN KEY ("status_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "collaborators" ADD CONSTRAINT "FK_93a7f8d818b1970701eb4230d5d" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "collaborators" ADD CONSTRAINT "FK_24415aaa8dc6e5fe107d29ecdb5" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "collaborators" ADD CONSTRAINT "FK_a29feb8c921ee69156ee37a1d24" FOREIGN KEY ("company_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "collaborators" ADD CONSTRAINT "FK_ec2c5315fae0d0fe46d29c013e3" FOREIGN KEY ("collaborator_type_id") REFERENCES "master_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "FK_6ce484b7743042752cdecc41c99" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "FK_0dbe5e3689179dacc7c44c46d99" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "FK_58a822e2173fc944aa584d1ee44" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "FK_15989853f2059dfa196b125e3ad" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD CONSTRAINT "FK_626629e699c43803798e6bed714" FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD CONSTRAINT "FK_7b75ab8ed3890360a27298b5bb8" FOREIGN KEY ("updated_by") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_7b75ab8ed3890360a27298b5bb8"`);
    await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_626629e699c43803798e6bed714"`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_15989853f2059dfa196b125e3ad"`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_58a822e2173fc944aa584d1ee44"`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_0dbe5e3689179dacc7c44c46d99"`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_6ce484b7743042752cdecc41c99"`);
    await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "FK_ec2c5315fae0d0fe46d29c013e3"`);
    await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "FK_a29feb8c921ee69156ee37a1d24"`);
    await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "FK_24415aaa8dc6e5fe107d29ecdb5"`);
    await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "FK_93a7f8d818b1970701eb4230d5d"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_c4a614082e4e5c9ee4ce0808538"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_bcdf921072a19dd2758a628c5c0"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_0c02e079dfeacd744061891c420"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_0ab5290751972652ae2786f4bc3"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_43d76ca7eecf9373241e2e890fb"`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP CONSTRAINT "FK_6c75bc45315e7c686b6984d3f9b"`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP CONSTRAINT "FK_2e1ca1a84da8a0798b4a9882cac"`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP CONSTRAINT "FK_c4e8956d9f171283aac311fd2fc"`);
    await queryRunner.query(`ALTER TABLE "master_values" DROP CONSTRAINT "FK_17264f533257e1c69600a1276b6"`);
    await queryRunner.query(`ALTER TABLE "group_values" DROP CONSTRAINT "FK_6358c723640928072ec28218c58"`);
    await queryRunner.query(`ALTER TABLE "group_values" DROP CONSTRAINT "FK_f591bb3cd36c629eaea2df99a7b"`);
    await queryRunner.query(`ALTER TABLE "group_values" DROP CONSTRAINT "FK_0c05ea46960ed2be26c95627511"`);
    await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`DROP TABLE "accounts"`);
    await queryRunner.query(`DROP TYPE "public"."accounts_type_enum"`);
    await queryRunner.query(`DROP TABLE "collaborators"`);
    await queryRunner.query(`DROP TABLE "employees"`);
    await queryRunner.query(`DROP TABLE "master_values"`);
    await queryRunner.query(`DROP TABLE "group_values"`);
  }
}
