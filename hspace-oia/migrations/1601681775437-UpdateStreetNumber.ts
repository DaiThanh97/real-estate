import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateStreetNumber1601681775437 implements MigrationInterface {
    name = "UpdateStreetNumber1601681775437"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"street_number\"");
        await queryRunner.query("ALTER TABLE \"properties\" ADD \"street_number\" character varying(64) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"street_number\"");
        await queryRunner.query("ALTER TABLE \"properties\" ADD \"street_number\" integer NOT NULL");
    }
}
