import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedForActivityTemplatesKSUT1619151900596 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await ActivityTemplateSeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
