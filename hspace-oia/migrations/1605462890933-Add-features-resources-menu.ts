import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFeaturesResourcesMenu1605462890933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //remove all account group features
        await queryRunner.query("DELETE FROM account_group_features");
        //remove all account group resources
        await queryRunner.query("DELETE FROM account_group_resources");
        //remove all features
        await queryRunner.query("DELETE FROM features");
        //remove all menu
        await queryRunner.query("DELETE FROM menu");
        //remove all resources
        await queryRunner.query("DELETE FROM resources");
        // add resources
        await queryRunner.query("INSERT INTO resources(id, name, description, path) VALUES (1, 'Nhân Viên - Tìm nhân viên','Tìm nhân viên đã tạo trong hệ thống','/employees/internal');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (2, 'Nhân viên - Tạo nhân viên','Tạo nhân viên mới','/employees/internal/create');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (3, 'Nhân viên - Xem nhân viên','Xem thông tin nhân viên','/employees/internal/:id');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (4, 'Tài khoản - Tìm Tài khoản','','/system/accounts/list');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (5, 'Tài khoản - Tạo Tài khoản','','/system/accounts/create');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (6, 'Tài khoản - Xem Tài khoản','','/system/accounts/edit/:id');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (7, 'Nhóm tài khoản - Tìm nhóm tài khoản','','/system/groupaccount/list');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (8, 'Nhóm tài khoản - Tạo nhóm tài khoản','','/system/groupaccount/create');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (9, 'Nhóm tài khoản -Xem nhóm tài khoản','','/system/groupaccount/edit/:id');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (10, 'Nhóm tài khoản -Cập nhật nhóm tài khoản','','/system/groupaccount/edit/:id');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (11, 'Giá trị - Nhóm giá trị','Quản lý Nhóm giá trị','/system/value/groupvalue');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (12, 'Giá trị -Giá trị','Quản lý Giá trị','/system/value/mastervalues');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (13, 'Mobile - Tìm nhanh BDS','CTV tìm BDS trên mobile','');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (14, 'Mobile - Tạo nhanh BDS','CTV tạo BDS trên mobile','');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (15, 'Mobile - Xem nhanh BDS','CTV cập nhật thông tin BDS trên mobile','');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (16, 'Bất động sản - Tìm Bất động sản','Nhân viên nội bộ tìm kiếm BDS','/properties/list');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (17, 'Bất động sản - Tạo Bất động sản','Nhân viên nội bộ tạo BDS','/properties/create');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (18, 'Bất động sản - Xem Bất động sản','','/properties/edit');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (19, 'Khảo sát - Tìm khảo sát hiện trạng','','/inspection/list');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (20, 'Khảo sát - Tạo khảo sát hiện trạng','','/inspection/create');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (21, 'Khảo sát - Xem khảo sát hiện trạng','','');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (22, 'Thẩm định - Tìm thẩm định hiện trạng','','/appraisalStatement/list');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (23, 'Thẩm định - Tạo thẩm định hiện trạng','','/appraisalStatement');\n" +
          "INSERT INTO resources(id, name, description, path) VALUES (24, 'Thẩm định - Xem thẩm định hiện trạng','','');");
        await queryRunner.query("INSERT INTO features(id, name, action,resource_id) VALUES (1, 'Thực hiện tìm nhân viên','Tìm','1');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (2, 'Xóa những nội dung đã nhập','Xóa','1');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (3, 'Xem thông tin nhân viên','Xem nhân viên','1');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (4, 'Lưu những thông tin về nhân viên đã nhập','Lưu','2');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (5, 'Hủy quá trình tạo nhân viên','Hủy','2');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (6, 'Thêm Quận trong \"Phân quyền khu vực\"','Thêm khu vực','2');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (7, 'Xóa Quận trong \"Phân quyền khu vực\"','Xóa khu vực','2');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (8, 'Thêm Hạn mức trong \"Phân quyền Hạn mức\"','Thêm hạn mức','2');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (9, 'Xóa Hạn mức trong \"Phân quyền Hạn mức\"','Xóa hạn mức','2');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (10, 'Thực hiện sửa đổi thông tin nhân viên','Cập nhật','3');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (11, 'Thoát màn hình','Đóng','3');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (12, 'cập nhật thông tin nhân viên','Cập nhật','3');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (13, 'Lưu những thông tin về nhân viên đã nhập','Lưu','3');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (14, 'Hủy quá trình cập nhật nhân viên','Hủy','3');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (15, 'Thêm Quận trong \"Phân quyền khu vực\"','Thêm khu vực','3');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (16, 'Xóa Quận trong \"Phân quyền khu vực\"','Xóa khu vực','3');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (17, 'Thêm Hạn mức trong \"Phân quyền Hạn mức\"','Thêm hạn mức','3');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (18, 'Xóa Hạn mức trong \"Phân quyền Hạn mức\"','Xóa hạn mức','3');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (19, 'Lưu những thông tin về tài khoản đã nhập','Lưu','5');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (20, 'Hủy bỏ những nội dung về tài khoản đã nhập','Hủy','5');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (21, 'Thêm nhóm chức năng trong \"Thông tin phân quyền\"','Thêm','5');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (22, 'Xóa nhóm chức năng trong \"Thông tin phân quyền\"','Xóa','5');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (23, 'Thực hiện sửa đổi thông tin tài khoản','Cập nhật','6');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (24, 'Lưu những thông tin về tài khoản đã nhập','Lưu','6');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (25, 'Hủy bỏ những nội dung về tài khoản đã nhập','Hủy','6');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (26, 'Thêm nhóm chức năng trong \"Thông tin phân quyền\"','Thêm','6');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (27, 'Xóa nhóm chức năng trong \"Thông tin phân quyền\"','Xóa','6');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (28, 'Tìm danh sách nhóm tài khoản','Tìm','7');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (29, 'Xóa những nội dung đã nhập','Xóa','7');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (30, 'Link','Link','7');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (31, 'Cập nhật','Cập nhật','15');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (32, 'Gửi duyệt','Gửi duyệt','15');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (33, 'Cập nhật','Cập nhật','15');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (34, 'Đóng','Đóng','15');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (35, 'Cập nhật','Cập nhật','18');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (36, 'Duyệt','Duyệt','18');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (37, 'Từ chối','Từ chối','18');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (38, 'Đã giao dịch','Đã giao dịch','18');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (39, 'Xóa','Xóa','18');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (40, 'Yêu cầu định giá','Yêu cầu định giá','18');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (41, 'Tiếp nhận','Tiếp nhận','18');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (42, 'Sao chép','Sao chép','18');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (43, 'Đã mua','Đã mua','18');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (44, 'Giao việc lập phiếu khảo sát cho nhân viên','Giao việc','20');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (45, 'Cập nhật','Cập nhật','21');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (46, 'Duyệt','Duyệt','21');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (47, 'Từ chối','Từ chối','21');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (48, 'Cập nhật','Cập nhật','24');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (49, 'Duyệt','Duyệt','24');\n" +
          "INSERT INTO features(id, name, action,resource_id) VALUES (50, 'Từ chối','Từ chối','24');");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //remove all account group features
        await queryRunner.query("DELETE FROM account_group_features");
        //remove all account group resources
        await queryRunner.query("DELETE FROM account_group_resources");
        //remove all features
        await queryRunner.query("DELETE FROM features");
        //remove all menu
        await queryRunner.query("DELETE FROM menu");
        //remove all resources
        await queryRunner.query("DELETE FROM resources");
    }
}
