import { Repository as TypeORMRepo } from "typeorm/repository/Repository";

import { IDomainModel } from "../../../domain/shared/IDomainModel";
import { IBaseEntity } from "../../orm/typeorm/models/IBaseEntity";
import { IRepository } from "../../../domain/repositories/IRepository";

export abstract class BaseRepository<Domain extends IDomainModel, Entity extends IBaseEntity>
  implements IRepository<Domain>
{
  async create(d: Domain): Promise<void> {
    const typeORMRepository = await this.getTypeORMRepository();
    const e = this.transformCreateEntityFromDomain(d);
    await typeORMRepository.insert(e);
  }

  async delete(id: string): Promise<void> {
    const typeORMRepository = await this.getTypeORMRepository();
    await typeORMRepository.delete(id);
  }

  async update(d: Domain): Promise<void> {
    const typeORMRepository = await this.getTypeORMRepository();
    const e = this.transformUpdateEntityFromDomain(d);
    await typeORMRepository.update(
      {
        id: d.id,
      },
      e,
    );
  }

  abstract getTypeORMRepository(): TypeORMRepo<Entity>;
  abstract transformCreateEntityFromDomain(d: Domain): Entity;
  abstract transformUpdateEntityFromDomain(d: Domain): Partial<Entity>;
  abstract transformEntityToDomain(e: Entity): Domain;
}
