import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFeaturesForProperties1605862530278 implements MigrationInterface {
    name = "AddFeaturesForProperties1605862530278";

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query("INSERT INTO features(id, name, action,resource_id) VALUES (54, 'Xem BDS','Xem BDS','16');\n" +
        //   "INSERT INTO features(id, name, action,resource_id) VALUES (55, 'Quan Tâm','Quan Tâm','16');\n" +
        //   "INSERT INTO features(id, name, action,resource_id) VALUES (56, 'Huỷ','Huỷ','16');\n" +
        //   "INSERT INTO features(id, name, action,resource_id) VALUES (57, 'Tìm','Tìm','16');\n" +
        //   "INSERT INTO features(id, name, action,resource_id) VALUES (58, 'Lưu','Lưu','17');\n" +
        //   "INSERT INTO features(id, name, action,resource_id) VALUES (59, 'Huỷ','Huỷ','17');\n" +
        //   "INSERT INTO features(id, name, action,resource_id) VALUES (60, 'Gửi duyệt','Gửi Duyệt','18');\n" +
        //   "INSERT INTO features(id, name, action,resource_id) VALUES (61, 'Xem chứng từ','Xem chứng từ','18');\n" +
        //   "INSERT INTO features(id, name, action,resource_id) VALUES (62, 'Đóng','Form - Đóng','18');\n" +
        //   "INSERT INTO features(id, name, action,resource_id) VALUES (63, 'Cập nhật giá bán','Cập nhật giá bán','18');\n" +
        //   "INSERT INTO features(id, name, action,resource_id) VALUES (64, 'Phục hồi','Phục hồi','18');");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // remove all account group features
        // await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 54;");
        // await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 55;");
        // await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 56;");
        // await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 57;");
        // await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 58;");
        // await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 59;");
        // await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 60;");
        // await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 61;");
        // await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 62;");
        // await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 63;");
        // await queryRunner.query("DELETE FROM account_group_features WHERE feature_id = 64;");
        // remove all features
        // await queryRunner.query("DELETE FROM features WHERE id = 54;");
        // await queryRunner.query("DELETE FROM features WHERE id = 55;");
        // await queryRunner.query("DELETE FROM features WHERE id = 56;");
        // await queryRunner.query("DELETE FROM features WHERE id = 57;");
        // await queryRunner.query("DELETE FROM features WHERE id = 58;");
        // await queryRunner.query("DELETE FROM features WHERE id = 59;");
        // await queryRunner.query("DELETE FROM features WHERE id = 60;");
        // await queryRunner.query("DELETE FROM features WHERE id = 61;");
        // await queryRunner.query("DELETE FROM features WHERE id = 62;");
        // await queryRunner.query("DELETE FROM features WHERE id = 63;");
    }

}
