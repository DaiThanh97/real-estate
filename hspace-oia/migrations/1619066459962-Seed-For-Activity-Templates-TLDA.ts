import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedForActivityTemplatesTLDA1619066459962 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await ActivityTemplateSeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
