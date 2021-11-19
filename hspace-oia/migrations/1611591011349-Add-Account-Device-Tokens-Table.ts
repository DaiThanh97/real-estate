import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAccountDeviceTokensTable1611591011349 implements MigrationInterface {
    name = "AddAccountDeviceTokensTable1611591011349"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`create table "account_device_tokens" (
            "id" SERIAL not null,
            "created_at" TIMESTAMP not null default now(),
            "updated_at" TIMESTAMP not null default now(),
            "account_id" integer,
            "device_token" character varying(128) not null,
            "device_type" character varying(20),
            "device_name" character varying(128),
            "is_active" boolean not null default true,
            "created_by" integer, "updated_by" integer,
            constraint "UQ_05cde5a224b9f6569873b3ef848" unique ("device_token"),
            constraint "PK_cdfe58f0ba92b7754507f3bdccf" primary key ("id")
        )`);
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" ADD CONSTRAINT \"FK_d1dbbf177deeb03a46e078d4cc4\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" ADD CONSTRAINT \"FK_4197dedfdcbc95339354ae301aa\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" ADD CONSTRAINT \"FK_6c33d759ee60936a988231b0e3f\" FOREIGN KEY (\"account_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" DROP CONSTRAINT \"FK_6c33d759ee60936a988231b0e3f\"");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" DROP CONSTRAINT \"FK_4197dedfdcbc95339354ae301aa\"");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" DROP CONSTRAINT \"FK_d1dbbf177deeb03a46e078d4cc4\"");
        await queryRunner.query("DROP TABLE \"account_device_tokens\"");
    }

}
