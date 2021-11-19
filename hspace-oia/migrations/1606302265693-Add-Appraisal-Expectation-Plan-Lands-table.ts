import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAppraisalExpectationPlanLandsTable1606302265693 implements MigrationInterface {
    name = "AddAppraisalExpectationPlanLandsTable1606302265693"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appraisal_expectation_plan_lands" 
           ("id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "plan_item_id" integer, "index" integer, 
            "construction" JSONB,
            CONSTRAINT "PK_7e93af17604cc79b390888f8c53" PRIMARY KEY ("id"))`);
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_items\" DROP COLUMN \"expectation_info\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_lands\" ADD CONSTRAINT \"FK_278f195c807d016c049f1da7e86\" FOREIGN KEY (\"plan_item_id\") REFERENCES \"appraisal_expectation_plan_items\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_lands\" DROP CONSTRAINT \"FK_278f195c807d016c049f1da7e86\"");
        await queryRunner.query("ALTER TABLE \"appraisal_expectation_plan_items\" ADD \"expectation_info\" jsonb");
        await queryRunner.query("DROP TABLE \"appraisal_expectation_plan_lands\"");
    }

}
