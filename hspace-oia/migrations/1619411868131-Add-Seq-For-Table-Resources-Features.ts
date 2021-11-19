import {MigrationInterface, QueryRunner} from "typeorm";
import ResourceSeed from "../src/infrastructure/orm/typeorm/seed/resource";
import FeatureSeed from "../src/infrastructure/orm/typeorm/seed/feature";

export class AddSeqForTableResourcesFeatures1619411868131 implements MigrationInterface {
    name = "AddSeqForTableResourcesFeatures1619411868131"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"features\" ADD \"seq\" integer");
        await queryRunner.query("ALTER TABLE \"resources\" ADD \"seq\" integer");
        await ResourceSeed.run(queryRunner);
        await FeatureSeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"resources\" DROP COLUMN \"seq\"");
        await queryRunner.query("ALTER TABLE \"features\" DROP COLUMN \"seq\"");
    }

}
