import { IBaseRepository, IFeatureRepository, INoteManager, INoteRepository } from "./contract";
import { ILike, Repository } from "typeorm";
import { PropertyPrefix } from "../../infrastructure/orm/typeorm/models/Property";
import { BadRequestError } from "../../infrastructure/error";
import constants from "../../infrastructure/config/constants";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { INote } from "../../infrastructure/orm/typeorm/models/Note";

export class NoteManager<T> implements INoteManager<T> {
  prefix: string;
  statusWorkflow: { status: T, expectedStatus: T[] }[];
  noteRepository: INoteRepository;
  statusErrCode: string;
  fullSearchAccessFeatures: {
    action: string,
    resourcePath: string;
  }[];
  featureRepository: IFeatureRepository;
  accountGroupFeatureRepository: IBaseRepository;

  readonly subClasses = [
    constants.NoteSubClasses.A,
    constants.NoteSubClasses.B,
    constants.NoteSubClasses.C,
  ];

  // @see docs/noteClasses.md
  groupStatuses: {
    A: {
      only?: T[],
      exclude?: T[],
    },
    B: {
      only?: T[],
      exclude?: T[],
    },
    C: {
      only?: T[],
      exclude?: T[],
    },
  };


  public async generateNoteId(property: Readonly<any | null | undefined>, currentNoteId?: string): Promise<string> {
    let code: string;
    let wbs: string;
    if (!property && !currentNoteId) {
      let year = new Date().getFullYear().toString();
      year = year.substr(year.length - 2);
      code = `${this.prefix}${year}`;
      const [_, total] = await this.noteRepository.findAndCount({
        noteId: ILike(`%${code}%`)
      });
      wbs = (total + 1).toString().padStart(4, "0");
      wbs = wbs.substr(wbs.length - 4);
    } else {
      code = property.code.replace(PropertyPrefix, this.prefix);
      if (currentNoteId && currentNoteId.includes(code)) {
        return currentNoteId;
      }
      const [_, total] = await this.noteRepository.findAndCount({
        noteId: ILike(`%${code}%`)
      });
      wbs = (total + 1).toString().padStart(2, "0");
    }

    return `${code}${wbs}`;
  }

  public async checkStatus(currentStatus: T, newStatus: T): Promise<void> {
    if (!this.statusWorkflow) {
      return;
    }
    const flow = this.statusWorkflow.find((el: { status: T; expectedStatus: T[] }) => el.status === newStatus);
    if (!flow) {
      return;
    }
    const expectedStatus: T[] = flow.expectedStatus;
    if (expectedStatus.indexOf(currentStatus) === -1) {
      throw new BadRequestError(
        `Invalid Status expectedStatus = ${expectedStatus}`,
        this.statusErrCode,
      );
    }
  }

  public async classify(status: T, update = true, id?: number): Promise<any> {
    const result: string[] = [];
    if (!status && id) {
      const note = await this.noteRepository.findOneOrFail(id);
      status = note.status;
    }

    if (!status) {
      throw new Error("Status is not valid.");
    }

    for (const subClass of this.subClasses) {
      const statuses = (this.groupStatuses as any)[subClass];
      if (
        !statuses ||
        ((!statuses.only || statuses.only.length === 0) &&
          (!statuses.exclude || statuses.exclude.length === 0))
      ) {
        result.push(`${this.prefix}.${subClass}`);
        continue;
      }

      if (
        statuses.only &&
        statuses.only.length > 0 &&
        statuses.only.includes(status)
      ) {
        result.push(`${this.prefix}.${subClass}`);
      } else if (
        statuses.exclude &&
        statuses.exclude.length > 0 &&
        !statuses.exclude.includes(status)) {
        result.push(`${this.prefix}.${subClass}`);
      }
    }

    if (id && update) {
      await this.noteRepository.update(id, {
        classes: result,
      });
    }

    return result;
  }

  async beforeUpdate<Note extends INote>(
    id: number,
    partialEntity: QueryDeepPartialEntity<Note>,
    noteRepository: Repository<Note>,
  ): Promise<QueryDeepPartialEntity<Note>> {
    if (partialEntity.status && !partialEntity.changedStatusTime) {
      const note = await noteRepository.findOneOrFail({
        select: ["id", "status"],
        where: {
          id,
        }
      }) as Readonly<any>;
      if (partialEntity.status !== note.status) {
        (partialEntity as any).changedStatusTime = new Date();
      }
    }

    return partialEntity;
  }
}
