import { EntityRepository, getManager, getRepository, Repository, UpdateResult } from "typeorm";
import { IPropertyManager, IPropertyRepository } from "../../../../domain/services/contract";
import { PropertyNoteQueries } from "../../../queries/PropertyNoteQueries";
import { IProperty, Property } from "../models/Property";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import ContainerTokens from "../../../../domain/services/contract/ContainerTokens";
import { Container } from "typedi";

@EntityRepository(Property)
export class PropertyRepository extends Repository<IProperty> implements IPropertyRepository {
  async getNoteList(propertyId: number) {
    const entityManager = getManager();
    const rawQuery = PropertyNoteQueries.getNoteListQuery(propertyId);
    return await entityManager.query(rawQuery);
  }

  async update(
    propertyId: number,
    partialEntity: QueryDeepPartialEntity<IProperty>,
  ): Promise<UpdateResult> {
    const repository = getRepository<IProperty>(Property);
    const manager: IPropertyManager = Container.get(ContainerTokens.PropertyManager);
    partialEntity = await manager.beforeUpdate(propertyId, partialEntity, repository);

    return await repository.update(propertyId, partialEntity);
  }
}
