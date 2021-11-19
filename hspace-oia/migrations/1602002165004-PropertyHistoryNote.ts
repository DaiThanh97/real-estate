import {MigrationInterface, QueryRunner} from "typeorm";

export class PropertyHistoryNote1602002165004 implements MigrationInterface {
    name = "PropertyHistoryNote1602002165004"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TYPE \"property_history_notes_type_enum\" AS ENUM('Deleted', 'Approve', 'Reject', 'Other')");
        await queryRunner.query("CREATE TABLE \"property_history_notes\" (\"id\" SERIAL NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"is_active\" boolean NOT NULL DEFAULT true, \"property_id\" integer NOT NULL, \"type\" \"property_history_notes_type_enum\" DEFAULT 'Other', \"reason_id\" integer, \"notes\" character varying, \"created_by\" integer, \"updated_by\" integer, CONSTRAINT \"PK_b91bfa17cf675e14bd8f52ae9f6\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("ALTER TABLE \"property_history_notes\" ADD CONSTRAINT \"FK_6fde7bb70228eb7371a24842b11\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"property_history_notes\" ADD CONSTRAINT \"FK_484b6cd682de5c5e9cc0a39fa53\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"property_history_notes\" ADD CONSTRAINT \"FK_7cf8207fd17543ac14f60234f97\" FOREIGN KEY (\"property_id\") REFERENCES \"properties\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"property_history_notes\" ADD CONSTRAINT \"FK_025e855ffe476be1cb1bd2b8745\" FOREIGN KEY (\"reason_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"property_history_notes\" DROP CONSTRAINT \"FK_025e855ffe476be1cb1bd2b8745\"");
        await queryRunner.query("ALTER TABLE \"property_history_notes\" DROP CONSTRAINT \"FK_7cf8207fd17543ac14f60234f97\"");
        await queryRunner.query("ALTER TABLE \"property_history_notes\" DROP CONSTRAINT \"FK_484b6cd682de5c5e9cc0a39fa53\"");
        await queryRunner.query("ALTER TABLE \"property_history_notes\" DROP CONSTRAINT \"FK_6fde7bb70228eb7371a24842b11\"");
        await queryRunner.query("DROP TABLE \"property_history_notes\"");
        await queryRunner.query("DROP TYPE \"property_history_notes_type_enum\"");
    }

}
