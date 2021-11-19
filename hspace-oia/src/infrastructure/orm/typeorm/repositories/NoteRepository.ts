import { EntityRepository, getRepository, Repository, UpdateResult } from "typeorm";
import {
  IAppraisalExpectationManager,
  IAppraisalExpectationRepository,
  IAppraisalStatementManager,
  IAppraisalStatementRepository,
  IInspectionExpectationManager,
  IInspectionExpectationRepository,
  IInspectionStatementManager,
  IInspectionStatementRepository,
  IInvestmentEfficiencyManager,
  IInvestmentEfficiencyRepository,
  IInvestmentPlanManager,
  IInvestmentPlanRepository,
  INoteManager,
  INoteRepository,
  IProjectNegotiationManager,
  IProjectNegotiationRepository
} from "../../../../domain/services/contract";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { IInspectionStatement, InspectionStatement } from "../models/InspectionStatement";
import { Container } from "typedi";
import {
  AppraisalExpectationStatusType,
  AppraisalStatementStatusType,
  InspectionExpectationStatusType,
  InspectionStatementStatusType,
  InvestmentEfficiencyStatusType,
  InvestmentPlanStatusType,
  ProjectNegotiationStatusType
} from "../../../types/Note";
import ContainerTokens from "../../../../domain/services/contract/ContainerTokens";
import { AppraisalStatement, IAppraisalStatement } from "../models/AppraisalStatement";
import { IInspectionExpectation, InspectionExpectation } from "../models/InspectionExpectation";
import { AppraisalExpectation, IAppraisalExpectation } from "../models/AppraisalExpectation";
import { IProjectNegotiation, ProjectNegotiation } from "../models/ProjectNegotiation";
import { IInvestmentPlan, InvestmentPlan } from "../models/InvestmentPlan";
import { IInvestmentEfficiency, InvestmentEfficiency } from "../models/InvestmentEfficiency";
import { INote } from "../models/Note";


class NoteRepository<Entity extends INote, NoteStatusType> extends Repository<Entity> implements INoteRepository {
  async invokeUpdate(
    id: number,
    partialEntity: QueryDeepPartialEntity<Entity>,
    repository: Repository<Entity>,
    manager: INoteManager<NoteStatusType>
  ): Promise<UpdateResult> {
    partialEntity = await manager.beforeUpdate<Entity>(id, partialEntity, repository);

    return await repository.update(id, partialEntity);
  }
}


@EntityRepository(InspectionStatement)
export class InspectionStatementRepository
  extends NoteRepository<IInspectionStatement, InspectionStatementStatusType>
  implements IInspectionStatementRepository {
  async update(
    id: number,
    partialEntity: QueryDeepPartialEntity<IInspectionStatement>,
  ): Promise<UpdateResult> {
    const repository: Repository<IInspectionStatement> = getRepository<IInspectionStatement>(InspectionStatement);
    const manager: IInspectionStatementManager<InspectionStatementStatusType>
      = Container.get(ContainerTokens.InspectionStatementManager);

    return await this.invokeUpdate(id, partialEntity, repository, manager);
  }
}


@EntityRepository(AppraisalStatement)
export class AppraisalStatementRepository
  extends NoteRepository<IAppraisalStatement, AppraisalStatementStatusType>
  implements IAppraisalStatementRepository {
  async update(
    id: number,
    partialEntity: QueryDeepPartialEntity<IAppraisalStatement>,
  ): Promise<UpdateResult> {
    const repository: Repository<IAppraisalStatement> = getRepository<IAppraisalStatement>(AppraisalStatement);
    const manager: IAppraisalStatementManager<AppraisalStatementStatusType>
      = Container.get(ContainerTokens.AppraisalStatementManager);

    return await this.invokeUpdate(id, partialEntity, repository, manager);
  }
}


@EntityRepository(InspectionExpectation)
export class InspectionExpectationRepository
  extends NoteRepository<IInspectionExpectation, InspectionExpectationStatusType>
  implements IInspectionExpectationRepository {
  async update(
    id: number,
    partialEntity: QueryDeepPartialEntity<IInspectionExpectation>,
  ): Promise<UpdateResult> {
    const repository: Repository<IInspectionExpectation> = getRepository<IInspectionExpectation>(InspectionExpectation);
    const manager: IInspectionExpectationManager<InspectionExpectationStatusType>
      = Container.get(ContainerTokens.InspectionExpectationManager);

    return await this.invokeUpdate(id, partialEntity, repository, manager);
  }
}


@EntityRepository(AppraisalExpectation)
export class AppraisalExpectationRepository
  extends NoteRepository<IAppraisalExpectation, AppraisalExpectationStatusType>
  implements IAppraisalExpectationRepository {
  async update(
    id: number,
    partialEntity: QueryDeepPartialEntity<IAppraisalExpectation>,
  ): Promise<UpdateResult> {
    const repository: Repository<IAppraisalExpectation> = getRepository<IAppraisalExpectation>(AppraisalExpectation);
    const manager: IAppraisalExpectationManager<AppraisalExpectationStatusType>
      = Container.get(ContainerTokens.AppraisalExpectationManager);

    return await this.invokeUpdate(id, partialEntity, repository, manager);
  }
}


@EntityRepository(ProjectNegotiation)
export class ProjectNegotiationRepository
  extends NoteRepository<IProjectNegotiation, ProjectNegotiationStatusType>
  implements IProjectNegotiationRepository {
  async update(
    id: number,
    partialEntity: QueryDeepPartialEntity<IProjectNegotiation>,
  ): Promise<UpdateResult> {
    const repository: Repository<IProjectNegotiation> = getRepository<IProjectNegotiation>(ProjectNegotiation);
    const manager: IProjectNegotiationManager<ProjectNegotiationStatusType>
      = Container.get(ContainerTokens.ProjectNegotiationManager);

    return await this.invokeUpdate(id, partialEntity, repository, manager);
  }
}


@EntityRepository(InvestmentPlan)
export class InvestmentPlanRepository
  extends NoteRepository<IInvestmentPlan, InvestmentPlanStatusType>
  implements IInvestmentPlanRepository {
  async update(
    id: number,
    partialEntity: QueryDeepPartialEntity<IInvestmentPlan>,
  ): Promise<UpdateResult> {
    const repository: Repository<IInvestmentPlan> = getRepository<IInvestmentPlan>(InvestmentPlan);
    const manager: IInvestmentPlanManager<InvestmentPlanStatusType>
      = Container.get(ContainerTokens.InvestmentPlanManager);

    return await this.invokeUpdate(id, partialEntity, repository, manager);
  }
}


@EntityRepository(InvestmentEfficiency)
export class InvestmentEfficiencyRepository
  extends NoteRepository<IInvestmentEfficiency, InvestmentEfficiencyStatusType>
  implements IInvestmentEfficiencyRepository {
  async update(
    id: number,
    partialEntity: QueryDeepPartialEntity<IInvestmentEfficiency>,
  ): Promise<UpdateResult> {
    const repository: Repository<IInvestmentEfficiency> = getRepository<IInvestmentEfficiency>(InvestmentEfficiency);
    const manager: IInvestmentEfficiencyManager<InvestmentEfficiencyStatusType>
      = Container.get(ContainerTokens.InvestmentEfficiencyManager);

    return await this.invokeUpdate(id, partialEntity, repository, manager);
  }
}
