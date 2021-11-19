import { MigrationInterface, QueryRunner } from "typeorm";

export class PropertySourceConstraint1601788247249 implements MigrationInterface {
    name = "PropertySourceConstraint1601788247249"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_a02edd2223c95a5a0952d3606cc\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"broker_id\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"source\"");
        await queryRunner.query("ALTER TABLE \"properties\" ADD \"source_id\" integer NOT NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ADD \"broker\" character varying(256)");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_fa4424bead12871fccdc8eb76c6\" FOREIGN KEY (\"source_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_fa4424bead12871fccdc8eb76c6\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"broker\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP COLUMN \"source_id\"");
        await queryRunner.query("ALTER TABLE \"properties\" ADD \"source\" character varying(128)");
        await queryRunner.query("ALTER TABLE \"properties\" ADD \"broker_id\" integer");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_a02edd2223c95a5a0952d3606cc\" FOREIGN KEY (\"broker_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
