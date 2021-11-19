import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePropertyConstructionStage1601627613264 implements MigrationInterface {
    name = "UpdatePropertyConstructionStage1601627613264"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_d81ae883f2864df3652c32dd01f\"");
        await queryRunner.query("ALTER TABLE \"properties\" RENAME COLUMN \"construction_current_stage_id\" TO \"construction_current_stage\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"construction_current_stage\"");
        await queryRunner.query("ALTER TABLE \"properties\" ADD \"construction_current_stage\" character varying(128) DEFAULT 'Không có công trình'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"construction_current_stage\"");
        await queryRunner.query("ALTER TABLE \"properties\" ADD \"construction_current_stage\" integer");
        await queryRunner.query("ALTER TABLE \"properties\" RENAME COLUMN \"construction_current_stage\" TO \"construction_current_stage_id\"");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_d81ae883f2864df3652c32dd01f\" FOREIGN KEY (\"construction_current_stage_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
