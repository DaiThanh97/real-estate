import {MigrationInterface, QueryRunner} from "typeorm";

export class AccountGroupColIsDeleted1618200423112 implements MigrationInterface {
    name = "AccountGroupColIsDeleted1618200423112"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"account_groups\" ADD \"is_deleted\" boolean NOT NULL DEFAULT false");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"account_groups\" DROP COLUMN \"is_deleted\"");
    }

}
