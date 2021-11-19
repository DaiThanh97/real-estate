import { MigrationInterface, QueryRunner } from "typeorm";

export class Menu1605460180862 implements MigrationInterface {
  name = "Menu1605460180862";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE TABLE \"menu\" (\"id\" SERIAL NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"is_active\" boolean NOT NULL DEFAULT true, \"path\" character varying, \"name\" character varying NOT NULL, \"description\" character varying DEFAULT '', \"parent_id\" integer, \"resource_id\" integer, \"created_by\" integer, \"updated_by\" integer, CONSTRAINT \"PK_35b2a8f47d153ff7a41860cceeb\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("ALTER TABLE \"menu\" ADD CONSTRAINT \"FK_592f239d67fb01e3db306325de5\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"menu\" ADD CONSTRAINT \"FK_07c2fb7633405194486e0ffc1ac\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"menu\" ADD CONSTRAINT \"FK_e5e28130fd17f88ab5ee5d3aa4c\" FOREIGN KEY (\"parent_id\") REFERENCES \"menu\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"menu\" ADD CONSTRAINT \"FK_ed154a6475f8073bc50098469be\" FOREIGN KEY (\"resource_id\") REFERENCES \"resources\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"menu\" DROP CONSTRAINT \"FK_ed154a6475f8073bc50098469be\"");
    await queryRunner.query("ALTER TABLE \"menu\" DROP CONSTRAINT \"FK_e5e28130fd17f88ab5ee5d3aa4c\"");
    await queryRunner.query("ALTER TABLE \"menu\" DROP CONSTRAINT \"FK_07c2fb7633405194486e0ffc1ac\"");
    await queryRunner.query("ALTER TABLE \"menu\" DROP CONSTRAINT \"FK_592f239d67fb01e3db306325de5\"");
    await queryRunner.query("DROP TABLE \"menu\"");
  }

}
