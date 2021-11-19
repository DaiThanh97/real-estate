import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedNotificationTemplateForTDUT1614755100569
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await NotificationTemplateSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
