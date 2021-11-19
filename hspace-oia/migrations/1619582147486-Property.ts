import {MigrationInterface, QueryRunner} from "typeorm";

export class Property1619582147486 implements MigrationInterface {
    name = 'Property1619582147486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" ADD "source_collector_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "source_collector_id"`);
    }

}
