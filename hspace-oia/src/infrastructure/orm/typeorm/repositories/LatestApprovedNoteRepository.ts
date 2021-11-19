import { EntityRepository, Repository } from "typeorm";
import { ILatestApprovedNoteRepository } from "../../../../domain/services/contract";
import { LatestApprovedNote } from "../models/LatestApprovedNote";
import { Container } from "typedi";
import ContainerTokens from "../../../../domain/services/contract/ContainerTokens";

@EntityRepository(LatestApprovedNote)
export class LatestApprovedNoteRepository extends Repository<any> implements ILatestApprovedNoteRepository {
  async updateOrCreate(data: {
    refId: number,
    type: string,
    propertyId: number,
    accountId?: number,
  }): Promise<any> {
    const repository = Container.get(ContainerTokens.LatestApprovedNoteRepository);

    const res = await repository.findOne({
      where: {
        type: data.type,
        propertyId: data.propertyId,
      }
    });
    if (res) {
      return await repository.update(res.id, {
        ...(data.accountId ? { updatedBy: data.accountId } : {}),
        refId: data.refId,
      });
    } else {
      return await repository.save({
        refId: data.refId,
        type: data.type,
        propertyId: data.propertyId,
        ...(data.accountId ? { updatedBy: data.accountId } : {}),
        ...(data.accountId ? { createdBy: data.accountId } : {}),
      });
    }
  }
}
