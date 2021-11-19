import { Account } from "../domain/models/Account";
import { IAccountManager, ICollaboratorRepository } from "../domain/services/contract";
import { Collaborator } from "../domain/models/Collaborator";
import { plainToClass } from "class-transformer";
import ErrorCode from "../infrastructure/config/constants/errorCode";
import { BadRequestError } from "../infrastructure/error";
import { CollaboratorChangeBasicInfoSerializer } from "../interfaces/serializers/CollaboratorSerializer";
import { ILike } from "typeorm";

export default class CollaboratorAppUseCases {
  public static async validate(payload: any, beans: {
    collaboratorRepository: ICollaboratorRepository,
  }): Promise<void> {

    const uniqueStrFields = [
      {
        "name": "phone",
        "errCode": ErrorCode.Collaborator.PhoneExist,
      }
    ];
    for (const field of uniqueStrFields) {
      const fieldName = field["name"];
      const errCode = field["errCode"];
      if (!payload[fieldName]) {
        continue;
      }
      const where = {} as any;
      where[fieldName] = ILike(payload[fieldName]);
      const exist = await beans.collaboratorRepository.findOne({ where });
      if (exist) {
        if (payload.id === undefined || (payload.id && exist.id !== payload.id)) {
          throw new BadRequestError(`The collaborator ${fieldName} is exist.`, errCode);
        }
      }
    }
  }

  public static async get(id: number, beans: {
    collaboratorRepository: ICollaboratorRepository,
  }): Promise<any> {
    return await beans.collaboratorRepository.findOneOrFail({
      where: {id},
      relations: [
        "company",
        "collaboratorType",
        "createdBy",
        "updatedBy",
      ],
    });
  }

  public static async create(payload: any, account: Account, beans: {
    collaboratorRepository: ICollaboratorRepository,
  }): Promise<any> {
    await this.validate(payload, beans);
    const collaborator = Collaborator.createByAccount(payload, account);
    const result = await beans.collaboratorRepository.save(collaborator);
    return this.get(result.id, beans);
  }

  public static async update(payload: any, account: Account, beans: {
    collaboratorRepository: ICollaboratorRepository,
    accountManager: IAccountManager,
  }): Promise<any> {
    const beforeUpdate = await this.get(payload.id, beans);
    await this.validate(payload, beans);
    const collaborator: Collaborator = plainToClass(Collaborator, payload);
    collaborator.updateByAccount(account);
    const result = await beans.collaboratorRepository.save(collaborator);
    const updated = await this.get(result.id, beans);
    await beans.accountManager.updateAccountNameByCollaborator(beforeUpdate, updated);
    return updated;
  }

  private static async getCollaboratorWithCredentialInfo(id: number, account: Account, beans: {
    collaboratorRepository: ICollaboratorRepository,
    accountManager: IAccountManager,
  }): Promise<any> {
    const currentCol = await this.get(id, beans);
    const extraAccountInfo = await beans.accountManager.getBasicCredentialInfo(account);
    return {...currentCol, ...extraAccountInfo};
  }

  public static async getCurrentCollaborator(account: Account, beans: {
    collaboratorRepository: ICollaboratorRepository,
    accountManager: IAccountManager,
  }): Promise<any> {
    if(!account.collaboratorId){
      throw new BadRequestError("The account is not mapping collaborator.", ErrorCode.EntityNotFound);
    }
    return this.getCollaboratorWithCredentialInfo(account.collaboratorId, account, beans);
  }

  public static async changeBasicInfo(data: CollaboratorChangeBasicInfoSerializer, account: Account, beans: {
    collaboratorRepository: ICollaboratorRepository,
    accountManager: IAccountManager,
  }): Promise<any> {
    if(!account.collaboratorId){
      throw new BadRequestError("The account is not mapping collaborator.", ErrorCode.EntityNotFound);
    }
    let collaborator: Collaborator = await this.get(account.collaboratorId, beans);
    collaborator = Collaborator.updateBasicInfo(collaborator, data.birthday);
    Account.updateAuditInfo(collaborator, account.id);
    await beans.collaboratorRepository.save(collaborator);
    return this.getCollaboratorWithCredentialInfo(account.collaboratorId, account, beans);
  }

}
