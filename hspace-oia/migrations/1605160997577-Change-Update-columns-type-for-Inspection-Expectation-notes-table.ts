import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeUpdateColumnsTypeForInspectionExpectationNotesTable1605160997577 implements MigrationInterface {
    name = "ChangeUpdateColumnsTypeForInspectionExpectationNotesTable1605160997577"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" DROP CONSTRAINT \"FK_e068f47ba7c73d3266b9b56fa0a\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" DROP CONSTRAINT \"FK_1fa9b0a48a67b9f4e91f5c2c305\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP CONSTRAINT \"FK_3711dd5cce622e4ac737de22939\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" DROP CONSTRAINT \"FK_ad40033fee3a955592b91c73643\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD \"index\" integer");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP COLUMN \"name\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD \"name\" character varying");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP COLUMN \"description\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD \"description\" character varying");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" ALTER COLUMN \"index\" DROP NOT NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ADD CONSTRAINT \"FK_e068f47ba7c73d3266b9b56fa0a\" FOREIGN KEY (\"plan_land_id\") REFERENCES \"inspection_expectation_plan_lands\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ADD CONSTRAINT \"FK_1fa9b0a48a67b9f4e91f5c2c305\" FOREIGN KEY (\"plan_land_id\") REFERENCES \"inspection_expectation_plan_lands\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD CONSTRAINT \"FK_3711dd5cce622e4ac737de22939\" FOREIGN KEY (\"inspection_expectation_id\") REFERENCES \"inspection_expectation_notes\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" ADD CONSTRAINT \"FK_ad40033fee3a955592b91c73643\" FOREIGN KEY (\"plan_item_id\") REFERENCES \"inspection_expectation_plan_items\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" DROP CONSTRAINT \"FK_ad40033fee3a955592b91c73643\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP CONSTRAINT \"FK_3711dd5cce622e4ac737de22939\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" DROP CONSTRAINT \"FK_1fa9b0a48a67b9f4e91f5c2c305\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" DROP CONSTRAINT \"FK_e068f47ba7c73d3266b9b56fa0a\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" ALTER COLUMN \"index\" SET NOT NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP COLUMN \"description\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD \"description\" text");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP COLUMN \"name\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD \"name\" character varying(255)");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP COLUMN \"index\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" ADD CONSTRAINT \"FK_ad40033fee3a955592b91c73643\" FOREIGN KEY (\"plan_item_id\") REFERENCES \"inspection_expectation_plan_items\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD CONSTRAINT \"FK_3711dd5cce622e4ac737de22939\" FOREIGN KEY (\"inspection_expectation_id\") REFERENCES \"inspection_expectation_notes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ADD CONSTRAINT \"FK_1fa9b0a48a67b9f4e91f5c2c305\" FOREIGN KEY (\"plan_land_id\") REFERENCES \"inspection_expectation_plan_lands\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ADD CONSTRAINT \"FK_e068f47ba7c73d3266b9b56fa0a\" FOREIGN KEY (\"plan_land_id\") REFERENCES \"inspection_expectation_plan_lands\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
