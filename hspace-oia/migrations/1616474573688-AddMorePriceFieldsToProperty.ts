import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMorePriceFieldsToProperty1616474573688 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties"
        ADD "ratio_changeable_appraise" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "properties"
        ADD "ratio_changeable_buy" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "properties"
        ADD "difference_price" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "ratio_changeable_appraise"`);
        await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "ratio_changeable_buy"`);
        await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "difference_price"`);
    }

}
