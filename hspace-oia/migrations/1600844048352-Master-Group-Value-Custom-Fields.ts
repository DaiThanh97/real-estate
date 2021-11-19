import { MigrationInterface, QueryRunner } from "typeorm";

export class MasterGroupValueCustomFields1600844048352 implements MigrationInterface {
  name = "MasterGroupValueCustomFields1600844048352";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"master_values\" ADD \"value_name\" character varying NOT NULL DEFAULT ''");
    await queryRunner.query("ALTER TABLE \"master_values\" ADD \"custom_fields\" jsonb NOT NULL DEFAULT '{}'");
    await queryRunner.query("ALTER TABLE \"group_values\" ALTER COLUMN \"updated_at\" SET NOT NULL");
    await queryRunner.query("ALTER TABLE \"group_values\" ALTER COLUMN \"updated_at\" SET DEFAULT now()");
    await queryRunner.query("ALTER TABLE \"master_values\" ALTER COLUMN \"updated_at\" SET NOT NULL");
    await queryRunner.query("ALTER TABLE \"master_values\" ALTER COLUMN \"updated_at\" SET DEFAULT now()");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"master_values\" ALTER COLUMN \"updated_at\" SET DEFAULT CURRENT_TIMESTAMP");
    await queryRunner.query("ALTER TABLE \"master_values\" ALTER COLUMN \"updated_at\" DROP NOT NULL");
    await queryRunner.query("ALTER TABLE \"group_values\" ALTER COLUMN \"updated_at\" SET DEFAULT CURRENT_TIMESTAMP");
    await queryRunner.query("ALTER TABLE \"group_values\" ALTER COLUMN \"updated_at\" DROP NOT NULL");
    await queryRunner.query("ALTER TABLE \"group_values\" DROP CONSTRAINT \"UQ_222027d98916d3ed61a0ffbb2bb\"");
    await queryRunner.query("ALTER TABLE \"master_values\" DROP COLUMN \"value_name\"");
    await queryRunner.query("ALTER TABLE \"master_values\" DROP COLUMN \"custom_fields\"");
    await queryRunner.query("ALTER TABLE \"master_values\" ADD CONSTRAINT \"FK_a3928cfe46888738b096dbc83e5\" FOREIGN KEY (\"group_value_id\") REFERENCES \"group_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
  }

}
