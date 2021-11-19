import {MigrationInterface, QueryRunner} from "typeorm";

export class createResourceForInvestmentEfficiencyResourcesFeaturesMenu1606277209761 implements MigrationInterface {
    name = "createResourceForInvestmentEfficiencyResourcesFeaturesMenu1606277209761"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO resources(id, name, description, path) VALUES (28, 'Hiệu quả đầu tư - Tìm hiệu quả đầu tư','','/investmentEfficiency');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (29, 'Hiệu quả đầu tư - Tạo hiệu quả đầu tư','','/investmentEfficiency/create');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (30, 'Hiệu quả đầu tư - Xem hiệu quả đầu tư','','');");

        await queryRunner.query("INSERT INTO features(id, name, action,resource_id) VALUES (65, 'Cập nhật','Cập nhật','30');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (66, 'Duyệt','Duyệt','30');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (67, 'Từ chối','Từ chối','30');");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //remove all account group features
        await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 65;");
        await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 66;");
        await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 67;");

        //remove all account group resources
        await queryRunner.query("DELETE FROM account_group_resources WHERE resource_id = 28;");
        await queryRunner.query("DELETE FROM account_group_resources WHERE resource_id = 29;");
        await queryRunner.query("DELETE FROM account_group_resources WHERE resource_id = 30;");

        //remove all features
        await queryRunner.query("DELETE FROM features WHERE id = 65;");
        await queryRunner.query("DELETE FROM features WHERE id = 66;");
        await queryRunner.query("DELETE FROM features WHERE id = 67;");
        //remove all menu
        await queryRunner.query("DELETE FROM menu WHERE parent_id = 29;");
        await queryRunner.query("DELETE FROM menu WHERE id = 29;");
        //remove all resources
        await queryRunner.query("DELETE FROM resources WHERE id = 28;");
        await queryRunner.query("DELETE FROM resources WHERE id = 29;");
        await queryRunner.query("DELETE FROM resources WHERE id = 30;");
    }

}
