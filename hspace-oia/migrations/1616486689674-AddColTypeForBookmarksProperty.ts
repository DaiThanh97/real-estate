import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColTypeForBookmarksProperty1616486689674 implements MigrationInterface {
    name = "AddColTypeForBookmarksProperty1616486689674"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"property_bookmarks\" ADD \"type\" character varying NOT NULL DEFAULT 'A'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"property_bookmarks\" DROP COLUMN \"type\"");
    }

}
