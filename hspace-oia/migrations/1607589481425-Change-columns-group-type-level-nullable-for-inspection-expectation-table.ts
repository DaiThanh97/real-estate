import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeColumnsGroupTypeLevelNullableForInspectionExpectationTable1607589481425 implements MigrationInterface {
    name = "ChangeColumnsGroupTypeLevelNullableForInspectionExpectationTable1607589481425"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" DROP CONSTRAINT \"FK_a048bf50e0f5c725f2c2cbd9d5c\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" DROP CONSTRAINT \"FK_1e4f494b44559b0b1052450cfda\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ALTER COLUMN \"group_id\" DROP NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"inspection_expectation_disadvantage_levels\".\"group_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ALTER COLUMN \"type_id\" DROP NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"inspection_expectation_disadvantage_levels\".\"type_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ALTER COLUMN \"level\" DROP NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"inspection_expectation_disadvantage_levels\".\"level\" IS NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" DROP CONSTRAINT \"FK_9a12d2f0fd3642b8311258b805d\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" DROP CONSTRAINT \"FK_a980b1170b982821ba906cb0dae\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ALTER COLUMN \"group_id\" DROP NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"inspection_expectation_advantage_levels\".\"group_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ALTER COLUMN \"type_id\" DROP NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"inspection_expectation_advantage_levels\".\"type_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ALTER COLUMN \"level\" DROP NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"inspection_expectation_advantage_levels\".\"level\" IS NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ADD CONSTRAINT \"FK_a048bf50e0f5c725f2c2cbd9d5c\" FOREIGN KEY (\"group_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ADD CONSTRAINT \"FK_1e4f494b44559b0b1052450cfda\" FOREIGN KEY (\"type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ADD CONSTRAINT \"FK_9a12d2f0fd3642b8311258b805d\" FOREIGN KEY (\"group_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ADD CONSTRAINT \"FK_a980b1170b982821ba906cb0dae\" FOREIGN KEY (\"type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" DROP CONSTRAINT \"FK_a980b1170b982821ba906cb0dae\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" DROP CONSTRAINT \"FK_9a12d2f0fd3642b8311258b805d\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" DROP CONSTRAINT \"FK_1e4f494b44559b0b1052450cfda\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" DROP CONSTRAINT \"FK_a048bf50e0f5c725f2c2cbd9d5c\"");
        await queryRunner.query("COMMENT ON COLUMN \"inspection_expectation_advantage_levels\".\"level\" IS NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ALTER COLUMN \"level\" SET NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"inspection_expectation_advantage_levels\".\"type_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ALTER COLUMN \"type_id\" SET NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"inspection_expectation_advantage_levels\".\"group_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ALTER COLUMN \"group_id\" SET NOT NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ADD CONSTRAINT \"FK_a980b1170b982821ba906cb0dae\" FOREIGN KEY (\"type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ADD CONSTRAINT \"FK_9a12d2f0fd3642b8311258b805d\" FOREIGN KEY (\"group_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("COMMENT ON COLUMN \"inspection_expectation_disadvantage_levels\".\"level\" IS NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ALTER COLUMN \"level\" SET NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"inspection_expectation_disadvantage_levels\".\"type_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ALTER COLUMN \"type_id\" SET NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"inspection_expectation_disadvantage_levels\".\"group_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ALTER COLUMN \"group_id\" SET NOT NULL");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ADD CONSTRAINT \"FK_1e4f494b44559b0b1052450cfda\" FOREIGN KEY (\"type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ADD CONSTRAINT \"FK_a048bf50e0f5c725f2c2cbd9d5c\" FOREIGN KEY (\"group_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
