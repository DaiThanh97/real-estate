import {MigrationInterface, QueryRunner} from "typeorm";
import ActivityTemplateSeed from "../src/infrastructure/orm/typeorm/seed/activityTemplate";

export class SeedForActivityTemplatesHQDT1619162076979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await ActivityTemplateSeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
