import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAddressForProjectNegotiationTable1607404194382 implements MigrationInterface {
    name = "AddAddressForProjectNegotiationTable1607404194382"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD \"address\" character varying");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" ADD \"street_number\" character varying(64)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP COLUMN \"street_number\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_notes\" DROP COLUMN \"address\"");
    }

}
