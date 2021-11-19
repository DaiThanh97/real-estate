import {MigrationInterface, QueryRunner} from "typeorm";

export class Collaborator1602448131235 implements MigrationInterface {
    name = "Collaborator1602448131235";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE collaborators RENAME COLUMN collaborate_type_id TO collaborator_type_id");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE collaborators RENAME COLUMN collaborator_type_id TO collaborate_type_id");
    }

}
