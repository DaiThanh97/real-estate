import {MigrationInterface, QueryRunner} from "typeorm";

export class updateMenuResourceForInvesmentPlanAndUpdateResourceFeature1605672466625 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("UPDATE resources SET name = 'Khảo sát - Tìm khảo sát'  WHERE id = 19; " +
          "UPDATE resources SET name = 'Khảo sát - Tạo khảo sát'  WHERE id = 20; " +
          "UPDATE resources SET name = 'Khảo sát - Xem khảo sát'  WHERE id = 21; " +
          "UPDATE resources SET name = 'Thẩm định - Tìm thẩm định'  WHERE id = 22; " +
          "UPDATE resources SET name = 'Thẩm định - Tạo thẩm định'  WHERE id = 23; " +
          "UPDATE resources SET name = 'Thẩm định - Xem thẩm định'  WHERE id = 24; ");
        await queryRunner.query("UPDATE menu SET name = 'Khảo sát'  WHERE id = 20; " +
          "UPDATE menu SET name = 'Tìm khảo sát', path = '/inspection' WHERE id = 21; " +
          "UPDATE menu SET name = 'Tạo khảo sát', path = '/inspection/create'  WHERE id = 22; " +
          "UPDATE menu SET name = 'Thẩm định'  WHERE id = 23; " +
          "UPDATE menu SET name = 'Tìm thẩm định', path = '/appraisalStatement'  WHERE id = 24; " +
          "UPDATE menu SET name = 'Tạo thẩm định', path = '/appraisalStatement/create'  WHERE id = 25; ");
        await queryRunner.query("UPDATE menu SET name = 'Khảo sát'  WHERE id = 20; " +
          "UPDATE menu SET name = 'Tìm khảo sát', path = '/inspection'  WHERE id = 21; " +
          "UPDATE menu SET name = 'Tạo khảo sát', path = '/inspection/create'  WHERE id = 22; " +
          "UPDATE menu SET name = 'Thẩm định'  WHERE id = 23; " +
          "UPDATE menu SET name = 'Tìm thẩm định', path = '/appraisalStatement'  WHERE id = 24; " +
          "UPDATE menu SET name = 'Tạo thẩm định', path = '/appraisalStatement/create'  WHERE id = 25; ");

        await queryRunner.query("INSERT INTO resources(id, name, description, path) VALUES (25, 'Thẩm định - Tìm phương án đầu tư','','/investmentPlan');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (26, 'Thẩm định - Tạo phương án đầu tư','','/investmentPlan/create');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (27, 'Thẩm định - Xem phương án đầu tư','','');");
        await queryRunner.query("INSERT INTO features(id, name, action,resource_id) VALUES (51, 'Cập nhật','Cập nhật','27');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (52, 'Duyệt','Duyệt','27');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (53, 'Từ chối','Từ chối','27');");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //remove all account group features
        await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 51;");
        await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 52;");
        await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 53;");
        //remove all account group resources
        await queryRunner.query("DELETE FROM account_group_resources WHERE resource_id = 25;");
        await queryRunner.query("DELETE FROM account_group_resources WHERE resource_id = 26;");
        await queryRunner.query("DELETE FROM account_group_resources WHERE resource_id = 27;");
        //remove all features
        await queryRunner.query("DELETE FROM features WHERE id = 51;");
        await queryRunner.query("DELETE FROM features WHERE id = 52;");
        await queryRunner.query("DELETE FROM features WHERE id = 53;");
        //remove all menu
        await queryRunner.query("DELETE FROM menu WHERE parent_id = 26;");
        await queryRunner.query("DELETE FROM menu WHERE id = 26;");
        //remove all resources
        await queryRunner.query("DELETE FROM resources WHERE id = 25;");
        await queryRunner.query("DELETE FROM resources WHERE id = 26;");
        await queryRunner.query("DELETE FROM resources WHERE id = 27;");
    }

}
