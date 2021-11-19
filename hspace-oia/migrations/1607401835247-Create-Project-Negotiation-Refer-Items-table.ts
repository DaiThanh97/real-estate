import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProjectNegotiationReferItemsTable1607401835247 implements MigrationInterface {
    name = "CreateProjectNegotiationReferItemsTable1607401835247"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_negotiation_refer_items" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "is_active" boolean NOT NULL DEFAULT true,
            "project_negotiation_id" integer,
            "negotiation_refer_id" integer,
            "explain" character varying NOT NULL DEFAULT '',
            "refer_at" TIMESTAMP,
            "refer_source_id" integer,
            "created_by" integer,
            "updated_by" integer,
            CONSTRAINT "PK_3cc5066b1aff5d6ee146430bedf" PRIMARY KEY ("id"))`);
        await queryRunner.query("ALTER TABLE \"project_negotiation_refer_items\" ADD CONSTRAINT \"FK_badf91dd509c7c545d980f5958e\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_refer_items\" ADD CONSTRAINT \"FK_6a01e3ce80f6c66be3411473a8f\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_refer_items\" ADD CONSTRAINT \"FK_31145ec502c5e5c90480f341efe\" FOREIGN KEY (\"project_negotiation_id\") REFERENCES \"project_negotiation_notes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_refer_items\" ADD CONSTRAINT \"FK_088ac6241bc67145381e79006c1\" FOREIGN KEY (\"negotiation_refer_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project_negotiation_refer_items\" ADD CONSTRAINT \"FK_abd51b043a97a81bb7d6202f0a1\" FOREIGN KEY (\"refer_source_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"project_negotiation_refer_items\" DROP CONSTRAINT \"FK_abd51b043a97a81bb7d6202f0a1\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_refer_items\" DROP CONSTRAINT \"FK_088ac6241bc67145381e79006c1\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_refer_items\" DROP CONSTRAINT \"FK_31145ec502c5e5c90480f341efe\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_refer_items\" DROP CONSTRAINT \"FK_6a01e3ce80f6c66be3411473a8f\"");
        await queryRunner.query("ALTER TABLE \"project_negotiation_refer_items\" DROP CONSTRAINT \"FK_badf91dd509c7c545d980f5958e\"");
        await queryRunner.query("DROP TABLE \"project_negotiation_refer_items\"");
    }

}
