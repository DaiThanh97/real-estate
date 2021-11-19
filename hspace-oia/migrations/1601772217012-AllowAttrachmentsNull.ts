import { MigrationInterface, QueryRunner } from "typeorm";

export class AllowAttrachmentsNull1601772217012 implements MigrationInterface {
    name = "AllowAttrachmentsNull1601772217012"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"attachments\" DROP NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"attachments\" SET NOT NULL");
    }
}
