import { EntityRepository, getManager, Repository } from "typeorm";
import { IMasterValueRepository } from "../../../../domain/services/contract";
import { MasterValueQueries } from "../../../queries/MasterValueQueries";
import { MasterValue } from "../models/MasterValue";

@EntityRepository(MasterValue)
export class MasterValueRepository extends Repository<any> implements IMasterValueRepository {
  async findUsedItems() {
    const entityManager = getManager();
    const query = MasterValueQueries.getUsedItemsQuery();
    return await entityManager.query(query);
  }
}
