import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForFullNotificationTemplate1614306722834
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await FeatureSeed.run(queryRunner);
    // await NotificationTemplateSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
