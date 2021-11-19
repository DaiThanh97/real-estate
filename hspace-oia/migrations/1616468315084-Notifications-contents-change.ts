import { MigrationInterface, QueryRunner } from "typeorm";

export class NotificationsContentsChange1616468315084
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await NotificationTemplateSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
