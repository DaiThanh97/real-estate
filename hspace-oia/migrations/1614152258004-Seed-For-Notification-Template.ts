import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForNotificationTemplate1614152258004 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await NotificationTemplateSeed.run(queryRunner);
    // await FeatureSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }

}
