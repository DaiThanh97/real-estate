import { MigrationInterface, QueryRunner } from "typeorm";

export class CasbinRule1601819383012 implements MigrationInterface {
    name = "CasbinRule1601819383012";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE \"casbin_rule\" (\"id\" SERIAL NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"ptype\" character varying NOT NULL DEFAULT '', \"v0\" character varying NOT NULL DEFAULT '', \"v1\" character varying NOT NULL DEFAULT '', \"v2\" character varying NOT NULL DEFAULT '', \"v3\" character varying NOT NULL DEFAULT '', \"v4\" character varying NOT NULL DEFAULT '', \"v5\" character varying NOT NULL DEFAULT '', CONSTRAINT \"PK_e147354d31e2748a3a5da5e3060\" PRIMARY KEY (\"id\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE \"casbin_rule\"");
    }

}
