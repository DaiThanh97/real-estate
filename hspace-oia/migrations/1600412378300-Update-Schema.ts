import { MigrationInterface, QueryRunner } from "typeorm";
import MigrationData from "../src/infrastructure/orm/typeorm/MigrationData";

export class UpdateSchema1600412378300 implements MigrationInterface {
  name = "UpdateSchema1600412378300";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("truncate table sessions restart identity cascade");
    await MigrationData.removeDefaultAdmin(queryRunner);
    await queryRunner.query("ALTER TABLE \"sessions\" DROP CONSTRAINT \"FK_da0cf19646ff5c6e3c0284468e5\"");
    await queryRunner.query("DROP INDEX \"IDX_62471155681515721de014a625\"");
    await queryRunner.query("ALTER TABLE \"collaborators\" ADD \"created_at\" TIMESTAMP NOT NULL DEFAULT now()");
    await queryRunner.query("ALTER TABLE \"collaborators\" ADD \"updated_at\" TIMESTAMP NOT NULL DEFAULT now()");
    await queryRunner.query("ALTER TABLE \"employees\" ADD \"created_at\" TIMESTAMP NOT NULL DEFAULT now()");
    await queryRunner.query("ALTER TABLE \"employees\" ADD \"updated_at\" TIMESTAMP NOT NULL DEFAULT now()");
    await queryRunner.query("ALTER TABLE \"accounts\" DROP CONSTRAINT \"FK_58a822e2173fc944aa584d1ee44\"");
    await queryRunner.query("ALTER TABLE \"accounts\" DROP CONSTRAINT \"FK_15989853f2059dfa196b125e3ad\"");
    await queryRunner.query("ALTER TABLE \"accounts\" ALTER COLUMN \"updated_at\" SET NOT NULL");
    await queryRunner.query("ALTER TABLE \"accounts\" ALTER COLUMN \"updated_at\" SET DEFAULT now()");
    await queryRunner.query("ALTER TABLE \"accounts\" ALTER COLUMN \"employee_id\" SET DEFAULT null");
    await queryRunner.query("ALTER TABLE \"accounts\" ALTER COLUMN \"collaborator_id\" SET DEFAULT null");
    await queryRunner.query("ALTER TABLE \"accounts\" DROP COLUMN \"type\"");
    await queryRunner.query("CREATE TYPE \"accounts_type_enum\" AS ENUM('Admin', 'Employee', 'Collaborator')");
    await queryRunner.query("ALTER TABLE \"accounts\" ADD \"type\" \"accounts_type_enum\" NOT NULL DEFAULT 'Collaborator'");
    await queryRunner.query("ALTER TABLE \"accounts\" ALTER COLUMN \"last_login_at\" SET DEFAULT null");
    await queryRunner.query("ALTER TABLE \"sessions\" ALTER COLUMN \"updated_at\" SET NOT NULL");
    await queryRunner.query("ALTER TABLE \"sessions\" ALTER COLUMN \"updated_at\" SET DEFAULT now()");
    await queryRunner.query("ALTER TABLE \"sessions\" DROP COLUMN \"token\"");
    await queryRunner.query("ALTER TABLE \"sessions\" ADD \"token\" character varying NOT NULL");
    await queryRunner.query("ALTER TABLE \"accounts\" ADD CONSTRAINT \"FK_15989853f2059dfa196b125e3ad\" FOREIGN KEY (\"collaborator_id\") REFERENCES \"collaborators\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"accounts\" ADD CONSTRAINT \"FK_58a822e2173fc944aa584d1ee44\" FOREIGN KEY (\"employee_id\") REFERENCES \"employees\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"sessions\" ADD CONSTRAINT \"FK_da0cf19646ff5c6e3c0284468e5\" FOREIGN KEY (\"account_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await MigrationData.addDefaultAdmin(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("truncate table sessions restart identity cascade");
    await MigrationData.removeDefaultAdmin(queryRunner);
    await queryRunner.query("ALTER TABLE \"sessions\" DROP CONSTRAINT \"FK_da0cf19646ff5c6e3c0284468e5\"");
    await queryRunner.query("ALTER TABLE \"accounts\" DROP CONSTRAINT \"FK_58a822e2173fc944aa584d1ee44\"");
    await queryRunner.query("ALTER TABLE \"accounts\" DROP CONSTRAINT \"FK_15989853f2059dfa196b125e3ad\"");
    await queryRunner.query("ALTER TABLE \"sessions\" DROP COLUMN \"token\"");
    await queryRunner.query("ALTER TABLE \"sessions\" ADD \"token\" uuid NOT NULL");
    await queryRunner.query("ALTER TABLE \"sessions\" ALTER COLUMN \"updated_at\" SET DEFAULT CURRENT_TIMESTAMP");
    await queryRunner.query("ALTER TABLE \"sessions\" ALTER COLUMN \"updated_at\" DROP NOT NULL");
    await queryRunner.query("ALTER TABLE \"accounts\" ALTER COLUMN \"last_login_at\" DROP DEFAULT");
    await queryRunner.query("ALTER TABLE \"accounts\" DROP COLUMN \"type\"");
    await queryRunner.query("DROP TYPE \"accounts_type_enum\"");
    await queryRunner.query("ALTER TABLE \"accounts\" ADD \"type\" account_type NOT NULL");
    await queryRunner.query("ALTER TABLE \"accounts\" ALTER COLUMN \"collaborator_id\" DROP DEFAULT");
    await queryRunner.query("ALTER TABLE \"accounts\" ALTER COLUMN \"employee_id\" DROP DEFAULT");
    await queryRunner.query("ALTER TABLE \"accounts\" ALTER COLUMN \"updated_at\" SET DEFAULT CURRENT_TIMESTAMP");
    await queryRunner.query("ALTER TABLE \"accounts\" ALTER COLUMN \"updated_at\" DROP NOT NULL");
    await queryRunner.query("ALTER TABLE \"accounts\" ADD CONSTRAINT \"FK_15989853f2059dfa196b125e3ad\" FOREIGN KEY (\"collaborator_id\") REFERENCES \"collaborators\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"accounts\" ADD CONSTRAINT \"FK_58a822e2173fc944aa584d1ee44\" FOREIGN KEY (\"employee_id\") REFERENCES \"employees\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"employees\" DROP COLUMN \"updated_at\"");
    await queryRunner.query("ALTER TABLE \"employees\" DROP COLUMN \"created_at\"");
    await queryRunner.query("ALTER TABLE \"collaborators\" DROP COLUMN \"updated_at\"");
    await queryRunner.query("ALTER TABLE \"collaborators\" DROP COLUMN \"created_at\"");
    await queryRunner.query("CREATE INDEX \"IDX_62471155681515721de014a625\" ON \"accounts\" (\"type\") ");
    await queryRunner.query("ALTER TABLE \"sessions\" ADD CONSTRAINT \"FK_da0cf19646ff5c6e3c0284468e5\" FOREIGN KEY (\"account_id\") REFERENCES \"accounts\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
  }

}
