import {MigrationInterface, QueryRunner} from "typeorm";

export class ResetToken1603263364798 implements MigrationInterface {
    name = "ResetToken1603263364798"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TYPE \"reset_tokens_status_enum\" AS ENUM('New', 'Expired', 'Success')");
        await queryRunner.query("CREATE TABLE \"reset_tokens\" (\"id\" SERIAL NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"is_active\" boolean NOT NULL DEFAULT true, \"account_id\" integer NOT NULL, \"email\" character varying NOT NULL, \"hash\" character varying NOT NULL, \"expired_at\" TIMESTAMP NOT NULL, \"status\" \"reset_tokens_status_enum\" NOT NULL DEFAULT 'New', \"created_by\" integer, \"updated_by\" integer, CONSTRAINT \"PK_acd6ec48b54150b1736d0b454b9\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("ALTER TABLE \"reset_tokens\" ADD CONSTRAINT \"FK_b081a0137a2ccb5f1978b683b42\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"reset_tokens\" ADD CONSTRAINT \"FK_6c715d809f06df75651aee62b3b\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"reset_tokens\" ADD CONSTRAINT \"FK_f12a44bc5ad732b046f8d01726e\" FOREIGN KEY (\"account_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"reset_tokens\" DROP CONSTRAINT \"FK_f12a44bc5ad732b046f8d01726e\"");
        await queryRunner.query("ALTER TABLE \"reset_tokens\" DROP CONSTRAINT \"FK_6c715d809f06df75651aee62b3b\"");
        await queryRunner.query("ALTER TABLE \"reset_tokens\" DROP CONSTRAINT \"FK_b081a0137a2ccb5f1978b683b42\"");
        await queryRunner.query("DROP TABLE \"reset_tokens\"");
        await queryRunner.query("DROP TYPE \"reset_tokens_status_enum\"");
    }

}
