import { MigrationInterface, QueryRunner } from "typeorm";

export class RecoginzedAreaRequired1601773176684 implements MigrationInterface {
    name = "RecoginzedAreaRequired1601773176684"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"recognized_area\" SET NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"recognized_area\" DROP NOT NULL");
    }
}
