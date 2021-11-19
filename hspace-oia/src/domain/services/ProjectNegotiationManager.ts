import { IProjectNegotiationManager, IProjectNegotiationRepository } from "./contract";
import { NoteManager } from "./NoteManager";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import constants from "../../infrastructure/config/constants";
import {
  ProjectNegotiationPriority,
  ProjectNegotiationStatus,
} from "../../infrastructure/orm/typeorm/models/ProjectNegotiation";
import { Inject, Service } from "typedi";
import ContainerTokens from "./contract/ContainerTokens";
import { ProjectNegotiationStatusType } from "../../infrastructure/types/Note";

@Service(ContainerTokens.ProjectNegotiationManager)
export class ProjectNegotiationManager extends NoteManager<ProjectNegotiationStatusType>
  implements IProjectNegotiationManager<ProjectNegotiationStatusType> {
  public constructor(
    @Inject(ContainerTokens.ProjectNegotiationRepository)
      projectNegotiationRepository: IProjectNegotiationRepository,
  ) {
    super();
    this.noteRepository = projectNegotiationRepository;
    this.statusErrCode = ErrorCode.ProjectNegotiation.InvalidStatus;
    this.prefix = constants.PropertyNoteIdPrefix.ProjectNegotiation;
    this.statusWorkflow = [
      {
        status: ProjectNegotiationStatus.Pending,
        expectedStatus: [ProjectNegotiationStatus.Drafting],
      },
      {
        status: ProjectNegotiationStatus.Approved,
        expectedStatus: [ProjectNegotiationStatus.Pending],
      },
      {
        status: ProjectNegotiationStatus.Rejected,
        expectedStatus: [ProjectNegotiationStatus.Pending],
      }
    ];

    // @see docs/noteClasses.md
    this.groupStatuses = {
      A: {},
      B: {
        only: [ProjectNegotiationStatus.Drafting],
      },
      C: {
        exclude: [ProjectNegotiationStatus.Drafting],
      }
    };
  }

  public async updateChangeablePrice(property: any): Promise<any> {
    const notes = await this.noteRepository.find({
      where: {
        propertyId: property.id,
        isDeleted: false,
      }
    });

    for (const note of notes) {
      let priority = null;
      if (note.priceApproved && note.priceApproved !== 0) {
        const factor = property.changeablePrice / note.priceApproved;
        if (factor <= 1) {
          priority = ProjectNegotiationPriority.PriorityFirst;
        } else if (factor > 1 && factor <= 1.05) {
          priority = ProjectNegotiationPriority.PrioritySecond;
        } else if (factor > 1.05 && factor <= 1.1) {
          priority = ProjectNegotiationPriority.PriorityThird;
        } else if (factor > 1.1) {
          priority = ProjectNegotiationPriority.PriorityNA;
        }
      }

      await this.noteRepository.update(note.id, {
        priceUpdate: property.changeablePrice,
        priority,
      });
    }
  }
}
