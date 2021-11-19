import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedNotificationTemplateForTDUT1614666569479
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await FeatureSeed.run(queryRunner);
    // await NotificationTemplateSeed.run(queryRunner);
    // await EndpointPermissionSeed.run(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
