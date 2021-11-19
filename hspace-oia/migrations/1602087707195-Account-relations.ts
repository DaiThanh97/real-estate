import {MigrationInterface, QueryRunner} from "typeorm";

export class AccountRelations1602087707195 implements MigrationInterface {
    name = "AccountRelations1602087707195"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE \"account_account_groups\" (\"id\" SERIAL NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"account_group_id\" integer, \"account_id\" integer, \"created_by\" integer, \"updated_by\" integer, CONSTRAINT \"PK_9f0d2962f1615dc58c7a0996373\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD \"full_name\" character varying NOT NULL");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD \"birthday\" date NOT NULL");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD \"joined_date\" date NOT NULL");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD \"phone\" character varying NOT NULL DEFAULT ''");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD \"email\" character varying NOT NULL DEFAULT ''");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD \"company_id\" integer");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD \"collaborate_type_id\" integer");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD \"created_by\" integer");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD \"updated_by\" integer");
        await queryRunner.query("ALTER TABLE \"account_account_groups\" ADD CONSTRAINT \"FK_41c1762a81152b084f7891b5542\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"account_account_groups\" ADD CONSTRAINT \"FK_b547839735830a82f8257558821\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"account_account_groups\" ADD CONSTRAINT \"FK_1b463dec857c192a36ca6d2d111\" FOREIGN KEY (\"account_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"account_account_groups\" ADD CONSTRAINT \"FK_4aba453f9b592e700a009883173\" FOREIGN KEY (\"account_group_id\") REFERENCES \"account_groups\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD CONSTRAINT \"FK_93a7f8d818b1970701eb4230d5d\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD CONSTRAINT \"FK_24415aaa8dc6e5fe107d29ecdb5\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD CONSTRAINT \"FK_a29feb8c921ee69156ee37a1d24\" FOREIGN KEY (\"company_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD CONSTRAINT \"FK_d01326b5b44af3a01c0f7e84e7c\" FOREIGN KEY (\"collaborate_type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP CONSTRAINT \"FK_d01326b5b44af3a01c0f7e84e7c\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP CONSTRAINT \"FK_a29feb8c921ee69156ee37a1d24\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP CONSTRAINT \"FK_24415aaa8dc6e5fe107d29ecdb5\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP CONSTRAINT \"FK_93a7f8d818b1970701eb4230d5d\"");
        await queryRunner.query("ALTER TABLE \"account_account_groups\" DROP CONSTRAINT \"FK_4aba453f9b592e700a009883173\"");
        await queryRunner.query("ALTER TABLE \"account_account_groups\" DROP CONSTRAINT \"FK_1b463dec857c192a36ca6d2d111\"");
        await queryRunner.query("ALTER TABLE \"account_account_groups\" DROP CONSTRAINT \"FK_b547839735830a82f8257558821\"");
        await queryRunner.query("ALTER TABLE \"account_account_groups\" DROP CONSTRAINT \"FK_41c1762a81152b084f7891b5542\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP COLUMN \"updated_by\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP COLUMN \"created_by\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP COLUMN \"collaborate_type_id\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP COLUMN \"company_id\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP COLUMN \"email\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP COLUMN \"phone\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP COLUMN \"joined_date\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP COLUMN \"birthday\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP COLUMN \"full_name\"");
        await queryRunner.query("DROP TABLE \"account_account_groups\"");
    }

}
