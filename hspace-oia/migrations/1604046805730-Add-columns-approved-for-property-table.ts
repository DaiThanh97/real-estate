import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnsApprovedForPropertyTable1604046805730 implements MigrationInterface {
    name = "AddColumnsApprovedForPropertyTable1604046805730"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" ADD \"approved_at\" TIMESTAMP");
        await queryRunner.query("ALTER TABLE \"properties\" ADD \"approved_by\" integer");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_b9ea018c1a4d3712f24f6811da8\" FOREIGN KEY (\"approved_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_b9ea018c1a4d3712f24f6811da8\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"approved_by\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"approved_at\"");
    }

}
