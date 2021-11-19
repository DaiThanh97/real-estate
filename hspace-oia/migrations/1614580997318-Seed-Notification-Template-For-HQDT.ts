import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedNotificationTemplateForHQDT1614580997318
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await FeatureSeed.run(queryRunner);
    // await NotificationTemplateSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
