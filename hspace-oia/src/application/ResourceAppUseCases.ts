import { Resource } from "../domain/models/Resource";
import { Account } from "../domain/models/Account";
import { IResourceRepository } from "../domain/services/contract";


export default class ResourceAppUseCases {
  public static async create(payload: any, account: Account, beans: {
    resourceRepository: IResourceRepository,
  }): Promise<any> {
    const resource = Resource.createByAccount(payload, account);
    return await beans.resourceRepository.save(resource);
  }
}
