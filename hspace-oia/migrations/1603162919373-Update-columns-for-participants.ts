import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnsForParticipants1603162919373 implements MigrationInterface {
  name = "UpdateColumnsForParticipants1603162919373";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "conversations"
        ADD "last_message_id" integer`);
    await queryRunner.query(`ALTER TABLE "participants"
        ADD "last_seen_id" integer`);
    await queryRunner.query(`ALTER TABLE "conversations"
        ADD CONSTRAINT "FK_a53679287450d522a3f700088e9" FOREIGN KEY ("last_message_id") REFERENCES "messages" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "participants"
        ADD CONSTRAINT "FK_24dacc750cee81145fd072ad402" FOREIGN KEY ("last_seen_id") REFERENCES "messages" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "participants"
        DROP CONSTRAINT "FK_24dacc750cee81145fd072ad402"`);
    await queryRunner.query(`ALTER TABLE "conversations"
        DROP CONSTRAINT "FK_a53679287450d522a3f700088e9"`);
    await queryRunner.query(`ALTER TABLE "participants"
        DROP COLUMN "last_seen_id"`);
    await queryRunner.query(`ALTER TABLE "conversations"
        DROP COLUMN "last_message_id"`);
  }

}
