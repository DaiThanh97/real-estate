import {MigrationInterface, QueryRunner} from "typeorm";
import NotificationTemplateSeed from "../src/infrastructure/orm/typeorm/seed/notificationTemplate";

export class AddTablePropertySales1616510372213 implements MigrationInterface {
    name = "AddTablePropertySales1616510372213"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "property_sales"
        (
           "id"             SERIAL NOT NULL,
           "created_at"     TIMESTAMP NOT NULL DEFAULT Now(),
           "updated_at"     TIMESTAMP NOT NULL DEFAULT Now(),
           "price"          DOUBLE PRECISION NOT NULL DEFAULT '0',
           "date"           DATE NOT NULL,
           "seller_id"      INTEGER,
           "sale_source_id" INTEGER,
           "property_id"    INTEGER,
           "created_by"     INTEGER,
           "updated_by"     INTEGER,
           CONSTRAINT "PK_c925e741e6a5160699a100f140b" PRIMARY KEY ("id")
        ) `);
        await queryRunner.query("ALTER TABLE \"property_sales\" ADD CONSTRAINT \"FK_48876640a7d0d19acb4ba5fc87b\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"property_sales\" ADD CONSTRAINT \"FK_5018d0363812edaee5857114144\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"property_sales\" ADD CONSTRAINT \"FK_e6704b851bfebd412fab5a11497\" FOREIGN KEY (\"seller_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"property_sales\" ADD CONSTRAINT \"FK_741204b3b73d5ea97ae66529e0a\" FOREIGN KEY (\"sale_source_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"property_sales\" ADD CONSTRAINT \"FK_d68b78599e92bcdac4fa4db02ba\" FOREIGN KEY (\"property_id\") REFERENCES \"properties\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    
        await queryRunner.query("truncate table activity_templates restart identity;");
        await NotificationTemplateSeed.run(queryRunner);
        // await ActivityTemplateSeed.run(queryRunner);
        // await FeatureSeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"property_sales\" DROP CONSTRAINT \"FK_d68b78599e92bcdac4fa4db02ba\"");
        await queryRunner.query("ALTER TABLE \"property_sales\" DROP CONSTRAINT \"FK_741204b3b73d5ea97ae66529e0a\"");
        await queryRunner.query("ALTER TABLE \"property_sales\" DROP CONSTRAINT \"FK_e6704b851bfebd412fab5a11497\"");
        await queryRunner.query("ALTER TABLE \"property_sales\" DROP CONSTRAINT \"FK_5018d0363812edaee5857114144\"");
        await queryRunner.query("ALTER TABLE \"property_sales\" DROP CONSTRAINT \"FK_48876640a7d0d19acb4ba5fc87b\"");
        await queryRunner.query("DROP TABLE \"property_sales\"");
    }

}
