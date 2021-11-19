import { MigrationInterface, QueryRunner } from "typeorm";

export class ChatSocket1602832748712 implements MigrationInterface {
  name = "ChatSocket1602832748712";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "chat_sockets"
                             (
                                 "id"            SERIAL            NOT NULL,
                                 "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                                 "account_id"    integer           NOT NULL,
                                 "identity_name" character varying NOT NULL,
                                 "socket_id"     character varying NOT NULL,
                                 "session_id"    integer           NOT NULL,
                                 CONSTRAINT "UNIQUE_CHAT_SOCKET" UNIQUE ("socket_id"),
                                 CONSTRAINT "PK_554bd1a30e2bc55dbfc36083096" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "chat_sockets"
        ADD CONSTRAINT "FK_643b7540acdf92ebcad561dc870" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "chat_sockets"
        ADD CONSTRAINT "FK_8f671fabf4c87f8a858426ee968" FOREIGN KEY ("session_id") REFERENCES "sessions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chat_sockets"
        DROP CONSTRAINT "FK_8f671fabf4c87f8a858426ee968"`);
    await queryRunner.query(`ALTER TABLE "chat_sockets"
        DROP CONSTRAINT "FK_643b7540acdf92ebcad561dc870"`);
    await queryRunner.query("DROP TABLE \"chat_sockets\"");
  }

}
