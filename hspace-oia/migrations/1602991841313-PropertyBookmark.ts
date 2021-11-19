import { MigrationInterface, QueryRunner } from "typeorm";

export class PropertyBookmark1602991841313 implements MigrationInterface {
    name = "PropertyBookmark1602991841313";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE \"property_bookmarks\" (\"id\" SERIAL NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"is_active\" boolean NOT NULL DEFAULT true, \"property_id\" integer NOT NULL, \"bookmarker_id\" integer, \"bookmark_date\" TIMESTAMP, \"created_by\" integer, \"updated_by\" integer, CONSTRAINT \"PK_3aa4dc42c2bcafddc9eb054d16e\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("ALTER TABLE \"property_bookmarks\" ADD CONSTRAINT \"FK_ac2399ec7db0daaf5889c0dbf09\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"property_bookmarks\" ADD CONSTRAINT \"FK_7abb1feae0cb34abfe08cc7d38c\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"property_bookmarks\" ADD CONSTRAINT \"FK_279d4394b366ea68d5124c7584b\" FOREIGN KEY (\"property_id\") REFERENCES \"properties\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"property_bookmarks\" ADD CONSTRAINT \"FK_ed6da026d9d0138ad5d847540c3\" FOREIGN KEY (\"bookmarker_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"property_bookmarks\" DROP CONSTRAINT \"FK_ed6da026d9d0138ad5d847540c3\"");
        await queryRunner.query("ALTER TABLE \"property_bookmarks\" DROP CONSTRAINT \"FK_279d4394b366ea68d5124c7584b\"");
        await queryRunner.query("ALTER TABLE \"property_bookmarks\" DROP CONSTRAINT \"FK_7abb1feae0cb34abfe08cc7d38c\"");
        await queryRunner.query("ALTER TABLE \"property_bookmarks\" DROP CONSTRAINT \"FK_ac2399ec7db0daaf5889c0dbf09\"");
        await queryRunner.query("DROP TABLE \"property_bookmarks\"");
    }

}
