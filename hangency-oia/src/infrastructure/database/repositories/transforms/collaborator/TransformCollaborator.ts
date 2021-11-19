import { CollaboratorEntity } from "../../../../orm/typeorm/models/CollaboratorEntity";
import { Collaborator } from "../../../../../domain/models/Collaborator";
import { TransformMasterValue } from "../masterValue/TransformMasterValue";
import { TransformAccount } from "../account/TransformAccount";

export class TransformCollaborator {
  static transformEntityToDomain(e: CollaboratorEntity): Collaborator {
    const result = new Collaborator({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      fullName: e.fullName,
      birthday: e.birthday,
      joinedDate: e.joinedDate,
      phone: e.phone,
      email: e.email,
      companyId: e.companyId,
      collaboratorTypeId: e.collaboratorTypeId,
      company: e.company && TransformMasterValue.transformEntityToDomain(e.company),
      collaboratorType: e.collaboratorType && TransformMasterValue.transformEntityToDomain(e.collaboratorType),
      createdBy: e.createdBy && TransformAccount.transformEntityToDomain(e.createdBy),
      updatedBy: e.updatedBy && TransformAccount.transformEntityToDomain(e.updatedBy),
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: Collaborator): CollaboratorEntity {
    return new CollaboratorEntity({
      id: d.id,
      fullName: d.fullName,
      birthday: d.birthday,
      joinedDate: d.joinedDate,
      phone: d.phone,
      email: d.email,
      companyId: d.companyId,
      collaboratorTypeId: d.collaboratorTypeId,
      company: d.company && TransformMasterValue.transformCreateEntityFromDomain(d.company),
      collaboratorType: d.collaboratorType && TransformMasterValue.transformCreateEntityFromDomain(d.collaboratorType),
      createdBy: d.createdBy && TransformAccount.transformCreateEntityFromDomain(d.createdBy),
      updatedBy: d.updatedBy && TransformAccount.transformCreateEntityFromDomain(d.updatedBy),
    });
  }
  static transformUpdateEntityFromDomain(d: Collaborator): Partial<CollaboratorEntity> {
    const result: Partial<CollaboratorEntity> = {
      fullName: d.fullName,
      birthday: d.birthday,
      joinedDate: d.joinedDate,
      phone: d.phone,
      email: d.email,
      companyId: d.companyId,
      collaboratorTypeId: d.collaboratorTypeId,
      company: d.company && TransformMasterValue.transformCreateEntityFromDomain(d.company),
      collaboratorType: d.collaboratorType && TransformMasterValue.transformCreateEntityFromDomain(d.collaboratorType),
      createdBy: d.createdBy && TransformAccount.transformCreateEntityFromDomain(d.createdBy),
      updatedBy: d.updatedBy && TransformAccount.transformCreateEntityFromDomain(d.updatedBy),
    };
    return result;
  }
}
