import { MigrationInterface, QueryRunner } from "typeorm";

export class CollaboratorConstrainUnique1602733470981 implements MigrationInterface {
    name = "CollaboratorConstrainUnique1602733470981";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP CONSTRAINT \"FK_d01326b5b44af3a01c0f7e84e7c\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD CONSTRAINT \"UQ_e7e847fc999bc8504ee34789338\" UNIQUE (\"phone\")");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD CONSTRAINT \"FK_ec2c5315fae0d0fe46d29c013e3\" FOREIGN KEY (\"collaborator_type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP CONSTRAINT \"FK_ec2c5315fae0d0fe46d29c013e3\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" DROP CONSTRAINT \"UQ_e7e847fc999bc8504ee34789338\"");
        await queryRunner.query("ALTER TABLE \"collaborators\" ADD CONSTRAINT \"FK_d01326b5b44af3a01c0f7e84e7c\" FOREIGN KEY (\"collaborator_type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
