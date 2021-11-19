import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeLengthForDeviceTokenTableAccountDeviceTokens1611723172511 implements MigrationInterface {
    name = "ChangeLengthForDeviceTokenTableAccountDeviceTokens1611723172511"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("truncate table account_device_tokens restart identity;");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" DROP CONSTRAINT \"UQ_05cde5a224b9f6569873b3ef848\"");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" DROP COLUMN \"device_token\"");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" ADD \"device_token\" character varying(255) NOT NULL");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" ADD CONSTRAINT \"UQ_05cde5a224b9f6569873b3ef848\" UNIQUE (\"device_token\")");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" DROP COLUMN \"device_name\"");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" ADD \"device_name\" character varying(255)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" DROP COLUMN \"device_name\"");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" ADD \"device_name\" character varying(128)");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" DROP CONSTRAINT \"UQ_05cde5a224b9f6569873b3ef848\"");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" DROP COLUMN \"device_token\"");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" ADD \"device_token\" character varying(128) NOT NULL");
        await queryRunner.query("ALTER TABLE \"account_device_tokens\" ADD CONSTRAINT \"UQ_05cde5a224b9f6569873b3ef848\" UNIQUE (\"device_token\")");
    }

}
