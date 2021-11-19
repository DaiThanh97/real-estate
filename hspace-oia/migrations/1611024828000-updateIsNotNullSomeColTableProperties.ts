import {MigrationInterface, QueryRunner} from "typeorm";

export class updateIsNotNullSomeColTableProperties1611024828000 implements MigrationInterface {
    name = "updateIsNotNullSomeColTableProperties1611024828000"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_e84dd96eca02f3de6007a22f7fb\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_50ef874d78e1463a4925c88b7d8\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_b61dcfd1fe20c84397b07551564\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_6af846307bbf10b17d7de6d0c66\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_43dd46ae9ceea39dcd1795f82e7\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_fa4424bead12871fccdc8eb76c6\"");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"street_number\" DROP NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"properties\".\"street_number\" IS NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"city_id\" DROP NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"properties\".\"city_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"ward_id\" DROP NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"properties\".\"ward_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"district_id\" DROP NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"properties\".\"district_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"street_id\" DROP NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"properties\".\"street_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"urgent_level_id\" DROP NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"properties\".\"urgent_level_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"source_id\" DROP NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"properties\".\"source_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_e84dd96eca02f3de6007a22f7fb\" FOREIGN KEY (\"city_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_50ef874d78e1463a4925c88b7d8\" FOREIGN KEY (\"ward_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_b61dcfd1fe20c84397b07551564\" FOREIGN KEY (\"district_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_6af846307bbf10b17d7de6d0c66\" FOREIGN KEY (\"street_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_43dd46ae9ceea39dcd1795f82e7\" FOREIGN KEY (\"urgent_level_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_fa4424bead12871fccdc8eb76c6\" FOREIGN KEY (\"source_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_fa4424bead12871fccdc8eb76c6\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_43dd46ae9ceea39dcd1795f82e7\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_6af846307bbf10b17d7de6d0c66\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_b61dcfd1fe20c84397b07551564\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_50ef874d78e1463a4925c88b7d8\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_e84dd96eca02f3de6007a22f7fb\"");
        await queryRunner.query("COMMENT ON COLUMN \"properties\".\"source_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"source_id\" SET NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"properties\".\"urgent_level_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"urgent_level_id\" SET NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"properties\".\"street_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"street_id\" SET NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"properties\".\"district_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"district_id\" SET NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"properties\".\"ward_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"ward_id\" SET NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"properties\".\"city_id\" IS NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"city_id\" SET NOT NULL");
        await queryRunner.query("COMMENT ON COLUMN \"properties\".\"street_number\" IS NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ALTER COLUMN \"street_number\" SET NOT NULL");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_fa4424bead12871fccdc8eb76c6\" FOREIGN KEY (\"source_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_43dd46ae9ceea39dcd1795f82e7\" FOREIGN KEY (\"urgent_level_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_6af846307bbf10b17d7de6d0c66\" FOREIGN KEY (\"street_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_b61dcfd1fe20c84397b07551564\" FOREIGN KEY (\"district_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_50ef874d78e1463a4925c88b7d8\" FOREIGN KEY (\"ward_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_e84dd96eca02f3de6007a22f7fb\" FOREIGN KEY (\"city_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
