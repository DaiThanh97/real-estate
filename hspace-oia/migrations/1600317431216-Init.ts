import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1600317431216 implements MigrationInterface {
  name = "Init1600317431216";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE TABLE \"collaborators\" (\"id\" SERIAL NOT NULL, CONSTRAINT \"PK_f579a5df9d66287f400806ad875\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE TABLE \"employees\" (\"id\" SERIAL NOT NULL, CONSTRAINT \"PK_b9535a98350d5b26e7eb0c26af4\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE TABLE \"sessions\" (\"id\" SERIAL NOT NULL, \"token\" uuid NOT NULL, \"is_active\" boolean NOT NULL DEFAULT true, \"account_id\" integer, \"created_at\" TIMESTAMP NOT NULL DEFAULT NOW(), \"updated_at\" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT \"PK_3238ef96f18b355b671619111bc\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE TYPE \"account_type\" AS ENUM('Admin', 'Employee', 'Collaborator')");
    await queryRunner.query("CREATE TABLE \"accounts\" (\"id\" SERIAL NOT NULL, \"type\" \"account_type\" NOT NULL, \"employee_id\" integer, \"collaborator_id\" integer, \"identity_name\" character varying NOT NULL, \"hash\" character varying, \"code\" character varying, \"display_name\" character varying NOT NULL, \"is_active\" boolean NOT NULL DEFAULT true, \"last_login_at\" TIMESTAMP, \"created_by\" integer, \"updated_by\" integer, \"created_at\" TIMESTAMP NOT NULL DEFAULT NOW(), \"updated_at\" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT \"UQ_0d65dc1818407acf2611160bec3\" UNIQUE (\"identity_name\"), CONSTRAINT \"REL_15989853f2059dfa196b125e3a\" UNIQUE (\"collaborator_id\"), CONSTRAINT \"REL_58a822e2173fc944aa584d1ee4\" UNIQUE (\"employee_id\"), CONSTRAINT \"PK_5a7a02c20412299d198e097a8fe\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE INDEX \"IDX_62471155681515721de014a625\" ON \"accounts\" (\"type\") ");
    await queryRunner.query("ALTER TABLE \"sessions\" ADD CONSTRAINT \"FK_da0cf19646ff5c6e3c0284468e5\" FOREIGN KEY (\"account_id\") REFERENCES \"accounts\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"accounts\" ADD CONSTRAINT \"FK_15989853f2059dfa196b125e3ad\" FOREIGN KEY (\"collaborator_id\") REFERENCES \"collaborators\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"accounts\" ADD CONSTRAINT \"FK_58a822e2173fc944aa584d1ee44\" FOREIGN KEY (\"employee_id\") REFERENCES \"employees\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"accounts\" ADD CONSTRAINT \"FK_6ce484b7743042752cdecc41c99\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"accounts\" ADD CONSTRAINT \"FK_0dbe5e3689179dacc7c44c46d99\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"accounts\" DROP CONSTRAINT \"FK_0dbe5e3689179dacc7c44c46d99\"");
    await queryRunner.query("ALTER TABLE \"accounts\" DROP CONSTRAINT \"FK_6ce484b7743042752cdecc41c99\"");
    await queryRunner.query("ALTER TABLE \"accounts\" DROP CONSTRAINT \"FK_58a822e2173fc944aa584d1ee44\"");
    await queryRunner.query("ALTER TABLE \"accounts\" DROP CONSTRAINT \"FK_15989853f2059dfa196b125e3ad\"");
    await queryRunner.query("ALTER TABLE \"sessions\" DROP CONSTRAINT \"FK_da0cf19646ff5c6e3c0284468e5\"");
    await queryRunner.query("DROP INDEX \"IDX_62471155681515721de014a625\"");
    await queryRunner.query("DROP TABLE \"accounts\"");
    await queryRunner.query("DROP TYPE \"account_type\"");
    await queryRunner.query("DROP TABLE \"sessions\"");
    await queryRunner.query("DROP TABLE \"employees\"");
    await queryRunner.query("DROP TABLE \"collaborators\"");
  }
}
