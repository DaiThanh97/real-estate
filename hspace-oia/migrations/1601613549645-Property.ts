import { MigrationInterface, QueryRunner } from "typeorm";

export class Property1601613549645 implements MigrationInterface {
    name = "Property1601613549645"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE \"properties\" (\"id\" SERIAL NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"is_active\" boolean NOT NULL DEFAULT true, \"street_number\" integer NOT NULL, \"general_note\" text, \"price\" integer NOT NULL, \"longitude\" double precision NOT NULL, \"latitude\" double precision NOT NULL, \"city_id\" integer NOT NULL, \"ward_id\" integer NOT NULL, \"district_id\" integer NOT NULL, \"street_id\" integer NOT NULL, \"location_type_id\" integer, \"urgent_level_id\" integer NOT NULL, \"attachments\" text NOT NULL, \"land_plot\" character varying(64), \"map\" character varying(64), \"horizontal_front\" integer, \"horizontal_back\" integer, \"height1\" integer, \"height2\" integer, \"property_type_id\" integer, \"property_period_id\" integer, \"property_using_id\" integer, \"recognized_area\" integer, \"unrecognized_area\" integer, \"recognized_planning_area\" integer, \"construction_current_stage_id\" integer, \"ground_floors\" integer, \"mezzanines\" integer, \"basements\" integer, \"roofs\" integer, \"structure\" text, \"recognized_floor_area\" integer, \"unrecognized_floor_area\" integer, \"construction_note\" text, \"source\" character varying(128), \"deal_stage\" character varying(128) DEFAULT 'Đang giao dịch', \"business_status\" character varying(128), \"transaction_date\" date, \"broker_id\" integer, \"closed_deal_value\" integer, \"status\" character varying(128) NOT NULL DEFAULT 'Nháp', \"created_by\" integer, \"updated_by\" integer, CONSTRAINT \"PK_2d83bfa0b9fcd45dee1785af44d\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_626629e699c43803798e6bed714\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_7b75ab8ed3890360a27298b5bb8\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_e84dd96eca02f3de6007a22f7fb\" FOREIGN KEY (\"city_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_50ef874d78e1463a4925c88b7d8\" FOREIGN KEY (\"ward_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_b61dcfd1fe20c84397b07551564\" FOREIGN KEY (\"district_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_6af846307bbf10b17d7de6d0c66\" FOREIGN KEY (\"street_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_f57f86891a8eb2d6076f4f43893\" FOREIGN KEY (\"location_type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_43dd46ae9ceea39dcd1795f82e7\" FOREIGN KEY (\"urgent_level_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_21050016bee57be0b28e2c7ad97\" FOREIGN KEY (\"property_type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_400a4bc1a6b72686c88c527928e\" FOREIGN KEY (\"property_period_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_32f6fdc2b760448a623d1bfa3e4\" FOREIGN KEY (\"property_using_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_d81ae883f2864df3652c32dd01f\" FOREIGN KEY (\"construction_current_stage_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"properties\" ADD CONSTRAINT \"FK_a02edd2223c95a5a0952d3606cc\" FOREIGN KEY (\"broker_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_a02edd2223c95a5a0952d3606cc\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_d81ae883f2864df3652c32dd01f\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_32f6fdc2b760448a623d1bfa3e4\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_400a4bc1a6b72686c88c527928e\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_21050016bee57be0b28e2c7ad97\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_43dd46ae9ceea39dcd1795f82e7\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_f57f86891a8eb2d6076f4f43893\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_6af846307bbf10b17d7de6d0c66\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_b61dcfd1fe20c84397b07551564\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_50ef874d78e1463a4925c88b7d8\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_e84dd96eca02f3de6007a22f7fb\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_7b75ab8ed3890360a27298b5bb8\"");
        await queryRunner.query("ALTER TABLE \"properties\" DROP CONSTRAINT \"FK_626629e699c43803798e6bed714\"");
        await queryRunner.query("DROP TABLE \"properties\"");
    }
}
