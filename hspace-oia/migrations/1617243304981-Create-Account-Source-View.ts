import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAccountSourceView1617243304981 implements MigrationInterface {
    name = "CreateAccountSourceView1617243304981"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE VIEW \"account_source_view\" AS SELECT \"account\".\"id\" AS \"id\", \"account\".\"display_name\" AS \"display_name\", \"property\".\"street_number\" AS \"street_number\", \"property\".\"city_id\" AS \"city_id\", \"property\".\"ward_id\" AS \"ward_id\", \"property\".\"district_id\" AS \"district_id\", \"property\".\"street_id\" AS \"street_id\" FROM \"accounts\" \"account\" INNER JOIN \"properties\" \"property\" ON \"property\".\"source_id\" = \"account\".\"id\" WHERE \"property\".\"is_active\" = true AND \"account\".\"is_active\" = true AND \"account\".\"type\" = 'Collaborator' AND \"property\".\"status\" IN ('Đã duyệt', 'Đã tồn tại', 'Đã giao dịch') GROUP BY \"account\".\"id\", \"account\".\"display_name\", \"property\".\"city_id\", \"property\".\"district_id\", \"property\".\"ward_id\", \"property\".\"street_id\", \"property\".\"street_number\"");
        await queryRunner.query("INSERT INTO \"typeorm_metadata\"(\"type\", \"schema\", \"name\", \"value\") VALUES ($1, $2, $3, $4)", ["VIEW","public","account_source_view","SELECT \"account\".\"id\" AS \"id\", \"account\".\"display_name\" AS \"display_name\", \"property\".\"street_number\" AS \"street_number\", \"property\".\"city_id\" AS \"city_id\", \"property\".\"ward_id\" AS \"ward_id\", \"property\".\"district_id\" AS \"district_id\", \"property\".\"street_id\" AS \"street_id\" FROM \"accounts\" \"account\" INNER JOIN \"properties\" \"property\" ON \"property\".\"source_id\" = \"account\".\"id\" WHERE \"property\".\"is_active\" = true AND \"account\".\"is_active\" = true AND \"account\".\"type\" = 'Collaborator' AND \"property\".\"status\" IN ('Đã duyệt', 'Đã tồn tại', 'Đã giao dịch') GROUP BY \"account\".\"id\", \"account\".\"display_name\", \"property\".\"city_id\", \"property\".\"district_id\", \"property\".\"ward_id\", \"property\".\"street_id\", \"property\".\"street_number\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM \"typeorm_metadata\" WHERE \"type\" = 'VIEW' AND \"schema\" = $1 AND \"name\" = $2", ["public","account_source_view"]);
        await queryRunner.query("DROP VIEW \"account_source_view\"");
    }

}
