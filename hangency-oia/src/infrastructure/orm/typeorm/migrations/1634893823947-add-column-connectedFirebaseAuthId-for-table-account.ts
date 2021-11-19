import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumnConnectedFirebaseAuthIdForTableAccount1634893823947 implements MigrationInterface {
  name = "addColumnConnectedFirebaseAuthIdForTableAccount1634893823947";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts" ADD "connected_firebase_auth_id" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "connected_firebase_auth_id"`);
  }
}
