import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeColumnContructionTypeForTablePADTPlan1615884594424 implements MigrationInterface {
    name = "ChangeColumnContructionTypeForTablePADTPlan1615884594424"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"investment_plan_lands\" DROP CONSTRAINT \"FK_709fee7efab2ca1f2b810a11470\"");
        await queryRunner.query("ALTER TABLE \"investment_plan_lands\" RENAME COLUMN \"construction_type_id\" TO \"construction_type\"");
        await queryRunner.query("ALTER TABLE \"investment_plan_lands\" DROP COLUMN \"construction_type\"");
        await queryRunner.query("ALTER TABLE \"investment_plan_lands\" ADD \"construction_type\" character varying");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"investment_plan_lands\" DROP COLUMN \"construction_type\"");
        await queryRunner.query("ALTER TABLE \"investment_plan_lands\" ADD \"construction_type\" integer");
        await queryRunner.query("ALTER TABLE \"investment_plan_lands\" RENAME COLUMN \"construction_type\" TO \"construction_type_id\"");
        await queryRunner.query("ALTER TABLE \"investment_plan_lands\" ADD CONSTRAINT \"FK_709fee7efab2ca1f2b810a11470\" FOREIGN KEY (\"construction_type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
