import { EntityRepository, Repository } from "typeorm";
import { IPropertyBookmarkRepository } from "../../../../domain/services/contract";
import { PropertyBookmark } from "../models/PropertyBookmark";
import { Container } from "typedi";
import ContainerTokens from "../../../../domain/services/contract/ContainerTokens";

@EntityRepository(PropertyBookmark)
export class PropertyBookmarkRepository extends Repository<any> implements IPropertyBookmarkRepository {
  async updateOrCreate(data: {
    propertyId: number,
    type: string,
    accountId: number,
    createdBy?: number,
    updatedBy?: number,
  }): Promise<any> {
    const propertyBookmarkRepository = Container.get(ContainerTokens.PropertyBookmarkRepository);

    const res = await propertyBookmarkRepository.findOne({
      where: {
        propertyId: data.propertyId,
      }
    });
    if (res) {
      return await propertyBookmarkRepository.update(res.id, {
        bookmarkerId: data.accountId,
        type: data.type,
        bookmarkDate: new Date(),
        isActive: true,
        updatedBy: data.updatedBy || data.accountId,
      });
    } else {
      return await propertyBookmarkRepository.save({
        propertyId: data.propertyId,
        bookmarkerId: data.accountId,
        type: data.type,
        bookmarkDate: new Date(),
        isActive: true,
        createdBy: data.createdBy || data.accountId,
        updatedBy: data.updatedBy || data.accountId,
      });
    }
  }
}
