import { MigrationInterface, QueryRunner } from "typeorm";
import ContainerTokens from "../src/domain/services/contract/ContainerTokens";
import { Container } from "typedi";
import buildBeans from "../src/infrastructure/config/service-locator";

export class TopicAndComment1615544350596 implements MigrationInterface {
  name = "TopicAndComment1615544350596";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "comments"
                             (
                                 "id"         SERIAL            NOT NULL,
                                 "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updated_at" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "topic_id"   integer           NOT NULL,
                                 "content"    character varying NOT NULL,
                                 "created_by" integer,
                                 "updated_by" integer,
                                 CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "topics"
                             (
                                 "id"         SERIAL    NOT NULL,
                                 "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                                 "is_active"  boolean   NOT NULL DEFAULT true,
                                 "created_by" integer,
                                 "updated_by" integer,
                                 CONSTRAINT "PK_e4aa99a3fa60ec3a37d1fc4e853" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "appraisal_expectation_notes"
        ADD "topic_id" integer`);
    await queryRunner.query(`ALTER TABLE "appraisal_statement_notes"
        ADD "topic_id" integer`);
    await queryRunner.query(`ALTER TABLE "inspection_expectation_notes"
        ADD "topic_id" integer`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "topic_id" integer`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD "topic_id" integer`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD "topic_id" integer`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_notes"
        ADD "topic_id" integer`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD "topic_id" integer`);
    await queryRunner.query(`ALTER TABLE "appraisal_expectation_notes"
        ADD CONSTRAINT "FK_f735e3a7365a6975f9d6ae0d7cd" FOREIGN KEY ("topic_id") REFERENCES "topics" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "appraisal_statement_notes"
        ADD CONSTRAINT "FK_f54538c8ff9e785ac6b84d2f693" FOREIGN KEY ("topic_id") REFERENCES "topics" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "comments"
        ADD CONSTRAINT "FK_980bfefe00ed11685f325d0bd4c" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "comments"
        ADD CONSTRAINT "FK_0c865c87e7c7d3274f83b671771" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "comments"
        ADD CONSTRAINT "FK_4c2adf03a79acedeea228a4d902" FOREIGN KEY ("topic_id") REFERENCES "topics" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "inspection_expectation_notes"
        ADD CONSTRAINT "FK_eb2378d13a104f5c527adfc834f" FOREIGN KEY ("topic_id") REFERENCES "topics" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD CONSTRAINT "FK_ee7b0a4ddd828210259e59ebdc3" FOREIGN KEY ("topic_id") REFERENCES "topics" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD CONSTRAINT "FK_9eae654d08bf385f34067629e23" FOREIGN KEY ("topic_id") REFERENCES "topics" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD CONSTRAINT "FK_6a8ffc26cf71142197c556edf47" FOREIGN KEY ("topic_id") REFERENCES "topics" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_notes"
        ADD CONSTRAINT "FK_398289ff9ea16e15ba7f647f239" FOREIGN KEY ("topic_id") REFERENCES "topics" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "properties"
        ADD CONSTRAINT "FK_6e2941924aeee792349adc85a34" FOREIGN KEY ("topic_id") REFERENCES "topics" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "topics"
        ADD CONSTRAINT "FK_ebe91e9df775ee52d843137510b" FOREIGN KEY ("created_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "topics"
        ADD CONSTRAINT "FK_8ea3ca74e15e18997d2700fe96a" FOREIGN KEY ("updated_by") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    const beans = await buildBeans(queryRunner.manager);
    const properties = await beans.propertyRepository.find({
      select: ["id"],
    });
    for (const property of properties) {
      const topic = await beans.topicRepository.save({
        isActive: true,
      });

      await beans.propertyRepository.update(property.id, {
        topicId: topic.id,
      });
    }

    const noteManagers: { repo: any }[] = [
      {
        repo: ContainerTokens.InspectionStatementRepository,
      },
      {
        repo: ContainerTokens.InspectionExpectationRepository,
      },
      {
        repo: ContainerTokens.InvestmentPlanRepository,
      },
      {
        repo: ContainerTokens.InvestmentEfficiencyRepository,
      },
      {
        repo: ContainerTokens.AppraisalStatementRepository,
      },
      {
        repo: ContainerTokens.AppraisalExpectationRepository,
      },
      {
        repo: ContainerTokens.ProjectNegotiationRepository,
      },
    ];

    for (const noteManager of noteManagers) {
      const repo = Container.get(noteManager.repo) as any;
      const notes = await repo.find(
        {
          select: ["id"]
        }
      );

      for (const note of notes) {
        const topic = await beans.topicRepository.save({
          isActive: true,
        });

        await repo.update(note.id, {
          topicId: topic.id,
        });
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "topics"
        DROP CONSTRAINT "FK_8ea3ca74e15e18997d2700fe96a"`);
    await queryRunner.query(`ALTER TABLE "topics"
        DROP CONSTRAINT "FK_ebe91e9df775ee52d843137510b"`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP CONSTRAINT "FK_6e2941924aeee792349adc85a34"`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_notes"
        DROP CONSTRAINT "FK_398289ff9ea16e15ba7f647f239"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP CONSTRAINT "FK_6a8ffc26cf71142197c556edf47"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP CONSTRAINT "FK_9eae654d08bf385f34067629e23"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP CONSTRAINT "FK_ee7b0a4ddd828210259e59ebdc3"`);
    await queryRunner.query(`ALTER TABLE "inspection_expectation_notes"
        DROP CONSTRAINT "FK_eb2378d13a104f5c527adfc834f"`);
    await queryRunner.query(`ALTER TABLE "comments"
        DROP CONSTRAINT "FK_4c2adf03a79acedeea228a4d902"`);
    await queryRunner.query(`ALTER TABLE "comments"
        DROP CONSTRAINT "FK_0c865c87e7c7d3274f83b671771"`);
    await queryRunner.query(`ALTER TABLE "comments"
        DROP CONSTRAINT "FK_980bfefe00ed11685f325d0bd4c"`);
    await queryRunner.query(`ALTER TABLE "appraisal_statement_notes"
        DROP CONSTRAINT "FK_f54538c8ff9e785ac6b84d2f693"`);
    await queryRunner.query(`ALTER TABLE "appraisal_expectation_notes"
        DROP CONSTRAINT "FK_f735e3a7365a6975f9d6ae0d7cd"`);
    await queryRunner.query(`ALTER TABLE "properties"
        DROP COLUMN "topic_id"`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_notes"
        DROP COLUMN "topic_id"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP COLUMN "topic_id"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP COLUMN "topic_id"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "topic_id"`);
    await queryRunner.query(`ALTER TABLE "inspection_expectation_notes"
        DROP COLUMN "topic_id"`);
    await queryRunner.query(`ALTER TABLE "appraisal_statement_notes"
        DROP COLUMN "topic_id"`);
    await queryRunner.query(`ALTER TABLE "appraisal_expectation_notes"
        DROP COLUMN "topic_id"`);
    await queryRunner.query("DROP TABLE \"topics\"");
    await queryRunner.query("DROP TABLE \"comments\"");
  }

}
