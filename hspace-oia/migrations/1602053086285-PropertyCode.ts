import { MigrationInterface, QueryRunner } from "typeorm";

export class PropertyCode1602053086285 implements MigrationInterface {
    name = "PropertyCode1602053086285";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" ADD \"code\" character varying(64) NOT NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"UQ_220d2c2f64cf6d6eeb6816b84a8\" UNIQUE (\"code\")");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"UQ_220d2c2f64cf6d6eeb6816b84a8\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"code\"");
    }

}
