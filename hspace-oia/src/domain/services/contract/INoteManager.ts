import { INoteRepository } from "./index";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Repository } from "typeorm";
import { INote } from "../../../infrastructure/orm/typeorm/models/Note";

export interface INoteManager<NoteStatusType> {
  prefix: string;

  noteRepository: INoteRepository;

  statusErrCode: string;

  statusWorkflow: { status: NoteStatusType, expectedStatus: NoteStatusType[] }[];

  generateNoteId(property: any | null | undefined, currentNoteId?: string | undefined): Promise<string>;

  checkStatus(currentStatus: NoteStatusType, newStatus: NoteStatusType): Promise<void>;

  classify(status: NoteStatusType, update?: boolean, id?: number): Promise<string[]>;

  beforeUpdate<Note extends INote>(
    id: number,
    partialEntity: QueryDeepPartialEntity<Note>,
    noteRepository: Repository<Note>,
  ): Promise<QueryDeepPartialEntity<Note>>;
}
