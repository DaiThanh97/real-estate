import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTypeForPropertyHistortyNote1603724078276 implements MigrationInterface {
    name = "UpdateTypeForPropertyHistortyNote1603724078276"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TYPE \"public\".\"property_history_notes_type_enum\" RENAME TO \"property_history_notes_type_enum_old\"");
        await queryRunner.query("CREATE TYPE \"property_history_notes_type_enum\" AS ENUM('Deleted', 'Approve', 'Reject', 'OnSubmit', 'Submitted', 'Other')");
        await queryRunner.query("ALTER TABLE \"property_history_notes\" ALTER COLUMN \"type\" DROP DEFAULT");
        await queryRunner.query("ALTER TABLE \"property_history_notes\" ALTER COLUMN \"type\" TYPE \"property_history_notes_type_enum\" USING \"type\"::\"text\"::\"property_history_notes_type_enum\"");
        await queryRunner.query("ALTER TABLE \"property_history_notes\" ALTER COLUMN \"type\" SET DEFAULT 'Other'");
        await queryRunner.query("DROP TYPE \"property_history_notes_type_enum_old\"");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TYPE \"property_history_notes_type_enum_old\" AS ENUM('Deleted', 'Approve', 'Reject', 'Received', 'Requested', 'Other')");
        await queryRunner.query("ALTER TABLE \"property_history_notes\" ALTER COLUMN \"type\" DROP DEFAULT");
        await queryRunner.query("ALTER TABLE \"property_history_notes\" ALTER COLUMN \"type\" TYPE \"property_history_notes_type_enum_old\" USING \"type\"::\"text\"::\"property_history_notes_type_enum_old\"");
        await queryRunner.query("ALTER TABLE \"property_history_notes\" ALTER COLUMN \"type\" SET DEFAULT 'Other'");
        await queryRunner.query("DROP TYPE \"property_history_notes_type_enum\"");
        await queryRunner.query("ALTER TYPE \"property_history_notes_type_enum_old\" RENAME TO  \"property_history_notes_type_enum\"");
    }

}
