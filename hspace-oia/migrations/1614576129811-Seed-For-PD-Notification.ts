import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedForPDNotification1614576129811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await NotificationTemplateSeed.run(queryRunner);
        // await FeatureSeed.run(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
