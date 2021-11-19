import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { TransformCollaborator } from "./transforms/collaborator/TransformCollaborator";
import { ICollaboratorRepository } from "../../../domain/repositories/ICollaboratorRepository";
import { Collaborator } from "../../../domain/models/Collaborator";
import { CollaboratorEntity } from "../../orm/typeorm/models/CollaboratorEntity";
import { TYPES } from "../../IoC/types";
import { Repository as TypeORMRepo } from "typeorm/repository/Repository";
import { dBConnectionHolder } from "../../IoC/typeDi.config";
import { ILike } from "typeorm";

@Service({ id: TYPES.collaboratorRepository })
export class CollaboratorRepository
  extends BaseRepository<Collaborator, CollaboratorEntity>
  implements ICollaboratorRepository
{
  constructor() {
    super();
  }
  async findById(id: string): Promise<Collaborator | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        id,
      },
      relations: ["company", "collaboratorType", "createdBy", "updatedBy"],
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  async findByPhone(phone: string): Promise<Collaborator | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        phone: ILike(phone),
      },
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  async findByEmail(email: string): Promise<Collaborator | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        email: ILike(email),
      },
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  transformUpdateEntityFromDomain(d: Collaborator): Partial<CollaboratorEntity> {
    return TransformCollaborator.transformUpdateEntityFromDomain(d);
  }
  transformEntityToDomain(e: CollaboratorEntity): Collaborator {
    return TransformCollaborator.transformEntityToDomain(e);
  }
  transformCreateEntityFromDomain(d: Collaborator): CollaboratorEntity {
    return TransformCollaborator.transformCreateEntityFromDomain(d);
  }

  getTypeORMRepository(): TypeORMRepo<CollaboratorEntity> {
    const db = dBConnectionHolder.getInstance();
    return db.getRepository(CollaboratorEntity);
  }
}
