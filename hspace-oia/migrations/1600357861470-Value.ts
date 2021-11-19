import { MigrationInterface, QueryRunner } from "typeorm";

export class Values1600357861470 implements MigrationInterface {
  name = "Values1600357861470";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE TABLE \"group_values\" (\"id\" SERIAL NOT NULL, \"code\" character varying NOT NULL, \"name\" character varying NOT NULL, \"parent_id\" integer, \"is_active\" boolean NOT NULL DEFAULT true, \"created_by\" integer, \"updated_by\" integer, \"created_at\" TIMESTAMP NOT NULL DEFAULT NOW(), \"updated_at\" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT \"PK_222027d98916d3ed61a0ffbb2bb\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE TABLE \"master_values\" (\"id\" SERIAL NOT NULL, \"group_id\" integer NOT NULL, \"group_code\" character varying NOT NULL, \"group_name\" character varying NOT NULL, \"value_code\" character varying NOT NULL, \"parent_id\" integer, \"is_active\" boolean NOT NULL DEFAULT true, \"group_value_id\" integer, \"created_by\" integer, \"updated_by\" integer, \"created_at\" TIMESTAMP NOT NULL DEFAULT NOW(), \"updated_at\" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT \"PK_339e06b23c50e24e0641630f6eb\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("ALTER TABLE \"group_values\" ADD CONSTRAINT \"FK_0c05ea46960ed2be26c95627511\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"group_values\" ADD CONSTRAINT \"FK_f591bb3cd36c629eaea2df99a7b\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"master_values\" ADD CONSTRAINT \"FK_a3928cfe46888738b096dbc83e5\" FOREIGN KEY (\"group_value_id\") REFERENCES \"group_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"master_values\" ADD CONSTRAINT \"FK_17264f533257e1c69600a1276b6\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"master_values\" ADD CONSTRAINT \"FK_c4e8956d9f171283aac311fd2fc\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"master_values\" DROP CONSTRAINT \"FK_c4e8956d9f171283aac311fd2fc\"");
    await queryRunner.query("ALTER TABLE \"master_values\" DROP CONSTRAINT \"FK_17264f533257e1c69600a1276b6\"");
    await queryRunner.query("ALTER TABLE \"master_values\" DROP CONSTRAINT \"FK_a3928cfe46888738b096dbc83e5\"");
    await queryRunner.query("ALTER TABLE \"group_values\" DROP CONSTRAINT \"FK_f591bb3cd36c629eaea2df99a7b\"");
    await queryRunner.query("ALTER TABLE \"group_values\" DROP CONSTRAINT \"FK_0c05ea46960ed2be26c95627511\"");
    await queryRunner.query("DROP TABLE \"master_values\"");
    await queryRunner.query("DROP TABLE \"group_values\"");
  }

}
