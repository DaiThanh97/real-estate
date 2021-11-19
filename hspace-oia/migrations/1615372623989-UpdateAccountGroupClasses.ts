import { MigrationInterface, QueryRunner } from "typeorm";
import buildBeans from "../src/infrastructure/config/service-locator";
import ContainerTokens from "../src/domain/services/contract/ContainerTokens";
import { Container } from "typedi";

export class UpdateAccountGroupClasses1615372623989 implements MigrationInterface {
  name = "UpdateAccountGroupClasses1615372623989";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account_groups"
        ADD "classes" jsonb`);
    await queryRunner.query(`ALTER TABLE "appraisal_expectation_notes"
        ADD "classes" jsonb`);
    await queryRunner.query(`ALTER TABLE "appraisal_statement_notes"
        ADD "classes" jsonb`);
    await queryRunner.query(`ALTER TABLE "features"
        ADD "group_class" character varying`);
    await queryRunner.query(`ALTER TABLE "inspection_expectation_notes"
        ADD "classes" jsonb`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        ADD "classes" jsonb`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        ADD "classes" jsonb`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        ADD "classes" jsonb`);
    await queryRunner.query(`ALTER TABLE "project_negotiation_notes"
        ADD "classes" jsonb`);
    // await FeatureSeed.run(queryRunner);
    const beans = await buildBeans(queryRunner.manager);

    const accountGroups = await beans.accountGroupRepository.find(
      {
        select: ["id"],
      }
    );
    for (const accountGroup of accountGroups) {
      await beans.accountGroupManager.classify(accountGroup.id);
    }

    const noteManagers: { repo: any, manager: any }[] = [
      {
        repo: ContainerTokens.InspectionStatementRepository,
        manager: ContainerTokens.InspectionStatementManager,
      },
      {
        repo: ContainerTokens.InspectionExpectationRepository,
        manager: ContainerTokens.InspectionExpectationManager,
      },
      {
        repo: ContainerTokens.InvestmentPlanRepository,
        manager: ContainerTokens.InvestmentPlanManager,
      },
      {
        repo: ContainerTokens.InvestmentEfficiencyRepository,
        manager: ContainerTokens.InvestmentEfficiencyManager,
      },
      {
        repo: ContainerTokens.AppraisalStatementRepository,
        manager: ContainerTokens.AppraisalStatementManager,
      },
      {
        repo: ContainerTokens.AppraisalExpectationRepository,
        manager: ContainerTokens.AppraisalExpectationManager,
      },
      {
        repo: ContainerTokens.ProjectNegotiationRepository,
        manager: ContainerTokens.ProjectNegotiationManager,
      },
    ];
    for (const noteManager of noteManagers) {
      const repo = Container.get(noteManager.repo) as any;
      const manager = Container.get(noteManager.manager) as any;
      const notes = await repo.find(
        {
          select: ["id", "status"],
        }
      );
      for (const note of notes) {
        await manager.classify(note.status, true, note.id);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "project_negotiation_notes"
        DROP COLUMN "classes"`);
    await queryRunner.query(`ALTER TABLE "investment_plan_notes"
        DROP COLUMN "classes"`);
    await queryRunner.query(`ALTER TABLE "investment_efficiency_notes"
        DROP COLUMN "classes"`);
    await queryRunner.query(`ALTER TABLE "inspection_statement_notes"
        DROP COLUMN "classes"`);
    await queryRunner.query(`ALTER TABLE "inspection_expectation_notes"
        DROP COLUMN "classes"`);
    await queryRunner.query(`ALTER TABLE "features"
        DROP COLUMN "group_class"`);
    await queryRunner.query(`ALTER TABLE "appraisal_statement_notes"
        DROP COLUMN "classes"`);
    await queryRunner.query(`ALTER TABLE "appraisal_expectation_notes"
        DROP COLUMN "classes"`);
    await queryRunner.query(`ALTER TABLE "account_groups"
        DROP COLUMN "classes"`);
  }

}
