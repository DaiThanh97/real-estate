import {MigrationInterface, QueryRunner} from "typeorm";

export class AddInspectionExpectationNotesTable1605117963473 implements MigrationInterface {
    name = "AddInspectionExpectationNotesTable1605117963473"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inspection_expectation_notes" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "note_id" character varying,
            "note_type" character varying,
            "execution_date" TIMESTAMP,
            "assignee_id" integer,
            "company_id" integer,
            "instructor_id" integer,
            "status" character varying,
            "is_deleted" boolean NOT NULL DEFAULT false,
            "rejection_note" character varying NOT NULL DEFAULT '',
            "property_id" integer,
            "approved_at" TIMESTAMP,
            "rejected_at" TIMESTAMP,
            "address" character varying,
            "street_number" character varying(64),
            "city_id" integer,
            "district_id" integer,
            "ward_id" integer,
            "street_id" integer,
            "investment_plan_id" integer,
            "created_by" integer,
            "updated_by" integer,
            "approved_by" integer,
            "rejected_by" integer,
            CONSTRAINT "UNIQUE_INSPECTION_EXPECTATION_NOTE_ID" UNIQUE ("note_id"),
            CONSTRAINT "PK_2f0a713426f3223aa75096aa248" PRIMARY KEY ("id")
          )`);
        await queryRunner.query(`CREATE TABLE "inspection_expectation_disadvantage_levels" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "plan_land_id" integer,
            "group_id" integer NOT NULL,
            "type_id" integer NOT NULL,
            "level" double precision NOT NULL,
            "note" character varying NOT NULL DEFAULT '',
            CONSTRAINT "PK_ebe3aa24030d72c38a492276e52" PRIMARY KEY ("id")
          )`);
        await queryRunner.query(`CREATE TABLE "inspection_expectation_advantage_levels" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "plan_land_id" integer,
            "group_id" integer NOT NULL,
            "type_id" integer NOT NULL,
            "level" double precision NOT NULL,
            "note" character varying NOT NULL DEFAULT '',
            CONSTRAINT "PK_525fffd73b044dc187fb4337e1d" PRIMARY KEY ("id")
          )`);
        await queryRunner.query(`CREATE TABLE "inspection_expectation_plan_items" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "is_active" boolean NOT NULL DEFAULT true,
            "inspection_expectation_id" integer,
            "name" character varying(255),
            "plan_type_id" integer,
            "construction_type_id" integer,
            "description" text,
            "investment_time" date,
            "total_adjustment" double precision,
            "created_by" integer,
            "updated_by" integer,
            CONSTRAINT "PK_6d0b08a42a9ce224853b4dd2025" PRIMARY KEY ("id")
          )`);
        await queryRunner.query(`CREATE TABLE "inspection_expectation_plan_lands" (
            "id" SERIAL NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "is_active" boolean NOT NULL DEFAULT true,
            "plan_item_id" integer,
            "index" integer NOT NULL,
            "street_number" character varying(64),
            "city_id" integer,
            "ward_id" integer,
            "district_id" integer,
            "street_id" integer,
            "street_group_id" integer,
            "position_group_id" integer,
            "address" character varying NOT NULL DEFAULT '',
            "location_description" character varying NOT NULL DEFAULT '',
            "land_use_rights" jsonb,
            "construction" jsonb,
            "total_advantage_level" double precision,
            "total_disadvantage_level" double precision,
            "created_by" integer,
            "updated_by" integer,
            CONSTRAINT "PK_5da80920d0f8ab5dfc728d06fc0" PRIMARY KEY ("id")
          )`);
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" ADD CONSTRAINT \"FK_f2aff3fa040a86df7aa7ef086dd\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" ADD CONSTRAINT \"FK_7f09a4485e3929a4355ea2e61c2\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" ADD CONSTRAINT \"FK_c9f706f645092b210ec58d21f24\" FOREIGN KEY (\"approved_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" ADD CONSTRAINT \"FK_2dabcdb5ead0a3e293ca54516e8\" FOREIGN KEY (\"property_id\") REFERENCES \"properties\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" ADD CONSTRAINT \"FK_7502c07341f05aee765935e12a5\" FOREIGN KEY (\"assignee_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" ADD CONSTRAINT \"FK_cdeeb639b023c3611f1677fcbbe\" FOREIGN KEY (\"company_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" ADD CONSTRAINT \"FK_a77e992f50094d6dd809053d697\" FOREIGN KEY (\"instructor_id\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" ADD CONSTRAINT \"FK_828ab41b3d733036c7bc8641ac7\" FOREIGN KEY (\"rejected_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" ADD CONSTRAINT \"FK_e527547c26070c8135cae4f36f5\" FOREIGN KEY (\"city_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" ADD CONSTRAINT \"FK_f96933e6f1013e5dd7a0de01367\" FOREIGN KEY (\"district_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" ADD CONSTRAINT \"FK_3b9cfe967ab309e9fb636a0a250\" FOREIGN KEY (\"ward_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" ADD CONSTRAINT \"FK_c09cc63ed881b940476db2fdd9d\" FOREIGN KEY (\"street_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" ADD CONSTRAINT \"FK_90c53f8be497df5a6f6e5fd8624\" FOREIGN KEY (\"investment_plan_id\") REFERENCES \"investment_plan_notes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ADD CONSTRAINT \"FK_e068f47ba7c73d3266b9b56fa0a\" FOREIGN KEY (\"plan_land_id\") REFERENCES \"inspection_expectation_plan_lands\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ADD CONSTRAINT \"FK_a048bf50e0f5c725f2c2cbd9d5c\" FOREIGN KEY (\"group_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" ADD CONSTRAINT \"FK_1e4f494b44559b0b1052450cfda\" FOREIGN KEY (\"type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ADD CONSTRAINT \"FK_1fa9b0a48a67b9f4e91f5c2c305\" FOREIGN KEY (\"plan_land_id\") REFERENCES \"inspection_expectation_plan_lands\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ADD CONSTRAINT \"FK_9a12d2f0fd3642b8311258b805d\" FOREIGN KEY (\"group_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" ADD CONSTRAINT \"FK_a980b1170b982821ba906cb0dae\" FOREIGN KEY (\"type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD CONSTRAINT \"FK_2a6c071a426d54bb3f256d977ac\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD CONSTRAINT \"FK_73ff9677b176fdff2bc08e32a3a\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD CONSTRAINT \"FK_3711dd5cce622e4ac737de22939\" FOREIGN KEY (\"inspection_expectation_id\") REFERENCES \"inspection_expectation_notes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD CONSTRAINT \"FK_ab3e7740304d4426a752c64a127\" FOREIGN KEY (\"plan_type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" ADD CONSTRAINT \"FK_4bbb91f7a3c2d65d47ff89dd000\" FOREIGN KEY (\"construction_type_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" ADD CONSTRAINT \"FK_4a3ece1b7cf5d621caacb5f7fe1\" FOREIGN KEY (\"created_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" ADD CONSTRAINT \"FK_2f78430bdb1a91338ee196c1d9d\" FOREIGN KEY (\"updated_by\") REFERENCES \"accounts\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" ADD CONSTRAINT \"FK_ad40033fee3a955592b91c73643\" FOREIGN KEY (\"plan_item_id\") REFERENCES \"inspection_expectation_plan_items\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" ADD CONSTRAINT \"FK_a642c736e450bc23bfcc84f5407\" FOREIGN KEY (\"city_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" ADD CONSTRAINT \"FK_fd1ea4d8d5b7172cbe03fed1ca8\" FOREIGN KEY (\"ward_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" ADD CONSTRAINT \"FK_bd92e5b0d27d2e941ef56215af0\" FOREIGN KEY (\"district_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" ADD CONSTRAINT \"FK_d590f91d898275cb7d953759177\" FOREIGN KEY (\"street_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" ADD CONSTRAINT \"FK_393fd3ed7a121116fc20befe847\" FOREIGN KEY (\"street_group_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" ADD CONSTRAINT \"FK_ae815b6a788ea673e3f291458f0\" FOREIGN KEY (\"position_group_id\") REFERENCES \"master_values\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" DROP CONSTRAINT \"FK_ae815b6a788ea673e3f291458f0\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" DROP CONSTRAINT \"FK_393fd3ed7a121116fc20befe847\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" DROP CONSTRAINT \"FK_d590f91d898275cb7d953759177\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" DROP CONSTRAINT \"FK_bd92e5b0d27d2e941ef56215af0\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" DROP CONSTRAINT \"FK_fd1ea4d8d5b7172cbe03fed1ca8\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" DROP CONSTRAINT \"FK_a642c736e450bc23bfcc84f5407\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" DROP CONSTRAINT \"FK_ad40033fee3a955592b91c73643\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" DROP CONSTRAINT \"FK_2f78430bdb1a91338ee196c1d9d\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_lands\" DROP CONSTRAINT \"FK_4a3ece1b7cf5d621caacb5f7fe1\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP CONSTRAINT \"FK_4bbb91f7a3c2d65d47ff89dd000\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP CONSTRAINT \"FK_ab3e7740304d4426a752c64a127\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP CONSTRAINT \"FK_3711dd5cce622e4ac737de22939\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP CONSTRAINT \"FK_73ff9677b176fdff2bc08e32a3a\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_plan_items\" DROP CONSTRAINT \"FK_2a6c071a426d54bb3f256d977ac\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" DROP CONSTRAINT \"FK_a980b1170b982821ba906cb0dae\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" DROP CONSTRAINT \"FK_9a12d2f0fd3642b8311258b805d\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_advantage_levels\" DROP CONSTRAINT \"FK_1fa9b0a48a67b9f4e91f5c2c305\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" DROP CONSTRAINT \"FK_1e4f494b44559b0b1052450cfda\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" DROP CONSTRAINT \"FK_a048bf50e0f5c725f2c2cbd9d5c\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_disadvantage_levels\" DROP CONSTRAINT \"FK_e068f47ba7c73d3266b9b56fa0a\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" DROP CONSTRAINT \"FK_90c53f8be497df5a6f6e5fd8624\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" DROP CONSTRAINT \"FK_c09cc63ed881b940476db2fdd9d\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" DROP CONSTRAINT \"FK_3b9cfe967ab309e9fb636a0a250\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" DROP CONSTRAINT \"FK_f96933e6f1013e5dd7a0de01367\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" DROP CONSTRAINT \"FK_e527547c26070c8135cae4f36f5\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" DROP CONSTRAINT \"FK_828ab41b3d733036c7bc8641ac7\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" DROP CONSTRAINT \"FK_a77e992f50094d6dd809053d697\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" DROP CONSTRAINT \"FK_cdeeb639b023c3611f1677fcbbe\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" DROP CONSTRAINT \"FK_7502c07341f05aee765935e12a5\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" DROP CONSTRAINT \"FK_2dabcdb5ead0a3e293ca54516e8\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" DROP CONSTRAINT \"FK_c9f706f645092b210ec58d21f24\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" DROP CONSTRAINT \"FK_7f09a4485e3929a4355ea2e61c2\"");
        await queryRunner.query("ALTER TABLE \"inspection_expectation_notes\" DROP CONSTRAINT \"FK_f2aff3fa040a86df7aa7ef086dd\"");
        await queryRunner.query("DROP TABLE \"inspection_expectation_plan_lands\"");
        await queryRunner.query("DROP TABLE \"inspection_expectation_plan_items\"");
        await queryRunner.query("DROP TABLE \"inspection_expectation_advantage_levels\"");
        await queryRunner.query("DROP TABLE \"inspection_expectation_disadvantage_levels\"");
        await queryRunner.query("DROP TABLE \"inspection_expectation_notes\"");
    }

}
