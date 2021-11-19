import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateColumnsTypeForInspectionExpectationNotesTable1605193480472 implements MigrationInterface {
    name = "UpdateColumnsTypeForInspectionExpectationNotesTable1605193480472"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"investment_plan_items\" DROP CONSTRAINT \"FK_c68a348beb2b0efa953fedc3f26\"");
        await queryRunner.query("ALTER TABLE \"investment_plan_lands\" DROP CONSTRAINT \"FK_bed2f38d6d9751518b710951262\"");
        await queryRunner.query("ALTER TABLE \"investment_plan_items\" ADD CONSTRAINT \"FK_c68a348beb2b0efa953fedc3f26\" FOREIGN KEY (\"investment_plan_id\") REFERENCES \"investment_plan_notes\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"investment_plan_lands\" ADD CONSTRAINT \"FK_bed2f38d6d9751518b710951262\" FOREIGN KEY (\"plan_item_id\") REFERENCES \"investment_plan_items\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"investment_plan_lands\" DROP CONSTRAINT \"FK_bed2f38d6d9751518b710951262\"");
        await queryRunner.query("ALTER TABLE \"investment_plan_items\" DROP CONSTRAINT \"FK_c68a348beb2b0efa953fedc3f26\"");
        await queryRunner.query("ALTER TABLE \"investment_plan_lands\" ADD CONSTRAINT \"FK_bed2f38d6d9751518b710951262\" FOREIGN KEY (\"plan_item_id\") REFERENCES \"investment_plan_items\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"investment_plan_items\" ADD CONSTRAINT \"FK_c68a348beb2b0efa953fedc3f26\" FOREIGN KEY (\"investment_plan_id\") REFERENCES \"investment_plan_notes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
