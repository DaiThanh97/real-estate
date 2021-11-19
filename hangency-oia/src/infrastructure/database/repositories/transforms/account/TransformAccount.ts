import { AccountEntity } from "../../../../orm/typeorm/models/AccountEntity";
import { Account } from "../../../../../domain/models/Account";
import { TransformCollaborator } from "../collaborator/TransformCollaborator";
import { TransformEmployee } from "../employee/TransformEmployee";
import { TransformAccountAccountGroup } from "../accountAccountGroup/TransformAccountAccountGroup";
import map from "lodash/map";

export class TransformAccount {
  static transformEntityToDomain(e: AccountEntity): Account {
    const result = new Account({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      type: e.type,
      identityName: e.identityName,
      employeeId: e.employeeId,
      collaboratorId: e.collaboratorId,
      isActive: e.isActive,
      code: e.code,
      hash: e.hash,
      password: undefined,
      lastLoginAt: e.lastLoginAt,
      displayName: e.displayName,
      connectedFirebaseAuthId: e.connectedFirebaseAuthId,
      classes: undefined,
      employee: e.employee && TransformEmployee.transformEntityToDomain(e.employee),
      collaborator: e.collaborator && TransformCollaborator.transformEntityToDomain(e.collaborator),
      accountAccountGroups: map(e.accountAccountGroups, (el) =>
        TransformAccountAccountGroup.transformEntityToDomain(el),
      ),
      createdBy: e.createdBy && this.transformEntityToDomain(e.createdBy),
      updatedBy: e.updatedBy && this.transformEntityToDomain(e.updatedBy),
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: Account): AccountEntity {
    return new AccountEntity({
      id: d.id,
      type: d.type,
      identityName: d.identityName,
      employeeId: d.employeeId,
      collaboratorId: d.collaboratorId,
      isActive: d.isActive,
      code: d.code,
      hash: d.hash,
      lastLoginAt: d.lastLoginAt,
      displayName: d.displayName,
      connectedFirebaseAuthId: d.connectedFirebaseAuthId,
      employee: d.employee && TransformEmployee.transformCreateEntityFromDomain(d.employee),
      collaborator: d.collaborator && TransformCollaborator.transformCreateEntityFromDomain(d.collaborator),
      accountAccountGroups: map(d.accountAccountGroups, (el) =>
        TransformAccountAccountGroup.transformCreateEntityFromDomain(el),
      ),
      createdBy: d.createdBy && this.transformCreateEntityFromDomain(d.createdBy),
      updatedBy: d.updatedBy && this.transformCreateEntityFromDomain(d.updatedBy),
    });
  }
  static transformUpdateEntityFromDomain(d: Account): Partial<AccountEntity> {
    const result: Partial<AccountEntity> = {
      employeeId: d.employeeId,
      employee: d.employee && TransformEmployee.transformCreateEntityFromDomain(d.employee),
      collaboratorId: d.collaboratorId,
      collaborator: d.collaborator && TransformCollaborator.transformCreateEntityFromDomain(d.collaborator),
      type: d.type,
      identityName: d.identityName,
      hash: d.hash,
      isActive: d.isActive,
      code: d.code,
      lastLoginAt: d.lastLoginAt,
      displayName: d.displayName,
      connectedFirebaseAuthId: d.connectedFirebaseAuthId,
      createdBy: d.createdBy && this.transformCreateEntityFromDomain(d.createdBy),
      updatedBy: d.updatedBy && this.transformCreateEntityFromDomain(d.updatedBy),
    };
    return result;
  }
}
