import { MigrationInterface, QueryRunner } from "typeorm";

export class AllowLongLatOptional1601771827080 implements MigrationInterface {
    name = "AllowLongLatOptional1601771827080"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"longitude\" DROP NOT NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"latitude\" DROP NOT NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"business_status\" SET DEFAULT 'Không có'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"business_status\" DROP DEFAULT");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"latitude\" SET NOT NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"longitude\" SET NOT NULL");
    }
}
