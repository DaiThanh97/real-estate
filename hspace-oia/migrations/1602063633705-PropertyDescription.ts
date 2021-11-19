import { MigrationInterface, QueryRunner } from "typeorm";

export class PropertyDescription1602063633705 implements MigrationInterface {
    name = "PropertyDescription1602063633705";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" ADD \"description\" text");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"description\"");
    }

}
