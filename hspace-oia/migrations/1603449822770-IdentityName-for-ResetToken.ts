import {MigrationInterface, QueryRunner} from "typeorm";

export class IdentityNameForResetToken1603449822770 implements MigrationInterface {
    name = "IdentityNameForResetToken1603449822770"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"reset_tokens\" ADD \"identity_name\" character varying NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"reset_tokens\" DROP COLUMN \"identity_name\"");
    }

}
