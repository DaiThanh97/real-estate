import {MigrationInterface, QueryRunner} from "typeorm";

export class addProjectNegotiationMenu1607048085975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO resources(id, name, description, path) VALUES (31, 'Phiếu thương lượng - Tìm phiếu thương lượng','','/projectNegotiation');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (32, 'Phiếu thương lượng - Tạo phiếu thương lượng','','/projectNegotiation/create');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (33, 'Phiếu thương lượng - Xem phiếu thương lượng','','');");

        await queryRunner.query("INSERT INTO features(id, name, action,resource_id) VALUES (68, 'Cập nhật','Cập nhật','33');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (69, 'Duyệt','Duyệt','33');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (70, 'Từ chối','Từ chối','33');");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //remove all account group features
        await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 68;");
        await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 69;");
        await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 70;");

        //remove all account group resources
        await queryRunner.query("DELETE FROM account_group_resources WHERE resource_id = 31;");
        await queryRunner.query("DELETE FROM account_group_resources WHERE resource_id = 32;");
        await queryRunner.query("DELETE FROM account_group_resources WHERE resource_id = 33;");

        //remove all features
        await queryRunner.query("DELETE FROM features WHERE id = 68;");
        await queryRunner.query("DELETE FROM features WHERE id = 69;");
        await queryRunner.query("DELETE FROM features WHERE id = 70;");
        //remove all menu
        await queryRunner.query("DELETE FROM menu WHERE parent_id = 32;");
        await queryRunner.query("DELETE FROM menu WHERE id = 32;");
        //remove all resources
        await queryRunner.query("DELETE FROM resources WHERE id = 31;");
        await queryRunner.query("DELETE FROM resources WHERE id = 32;");
        await queryRunner.query("DELETE FROM resources WHERE id = 33;");
    }

}
