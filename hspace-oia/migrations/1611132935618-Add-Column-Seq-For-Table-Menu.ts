import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnSeqForTableMenu1611132935618 implements MigrationInterface {
    name = "AddColumnSeqForTableMenu1611132935618";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("truncate table menu restart identity;");
        await queryRunner.query("ALTER TABLE \"menu\" ADD \"seq\" integer");
        // seed menu
        // await MenuSeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"menu\" DROP COLUMN \"seq\"");
    }

}
