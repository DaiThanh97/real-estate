import "reflect-metadata";
import { Container } from "typedi";
import { Connection } from "typeorm";
import { app as FirebaseAdmin } from "firebase-admin";
import { S3 } from "aws-sdk";

import { IPropertyRepository } from "../../domain/repositories/IPropertyRepository";
import { PropertyRepository } from "../database/repositories/PropertyRepository.service";
import { TYPES } from "./types";
import { TypeOrmDBConnectionHolder } from "../database/TypeOrmDBConnectionHolder";
import { IDatabaseConnectionHolder } from "../database/IDatabaseConnectionHolder";
import { IAuthConnectionHolder } from "../auth/IAuthConnectionHolder";
import { FirebaseAuthConnectionHolder } from "../auth/FirebaseAuthConnectionHandler";
import { IAuth } from "../../application/tools/IAuth";
import { FirebaseAuth } from "../auth/FirebaseAuth";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { AccountRepository } from "../database/repositories/AccountRepository.service";
import { ICollaboratorRepository } from "../../domain/repositories/ICollaboratorRepository";
import { CollaboratorRepository } from "../database/repositories/Collaborator.service";
import { IEmployeeRepository } from "../../domain/repositories/IEmployeeRepository";
import { EmployeeRepository } from "../database/repositories/Employee.service";
import { IAccountManager } from "../../domain/services/contract/IAccountManager";
import { AccountManager } from "../../domain/services/AccountManager";
import { IAccountGroupRepository } from "../../domain/repositories/IAccountGroupRepository";
import { AccountGroupRepository } from "../database/repositories/AccountGroupRepository.service";
import { IFileConnectionHolder } from "../file/IFileConnectionHolder";
import { S3FileConnectionHolder } from "../file/S3FileConnectionHolder";
import { IFile } from "../../application/tools/IFile";
import { S3File } from "../file/S3File";

Container.set<IDatabaseConnectionHolder<Connection>>(TYPES.dBConnectionHolder, new TypeOrmDBConnectionHolder());
Container.set<IAuthConnectionHolder<FirebaseAdmin.App>>(TYPES.authConnectionHolder, new FirebaseAuthConnectionHolder());
Container.set<IAuth>(TYPES.auth, new FirebaseAuth());
Container.set<IPropertyRepository>(TYPES.propertyRepository, new PropertyRepository());
Container.set<IAccountRepository>(TYPES.accountRepository, new AccountRepository());
Container.set<ICollaboratorRepository>(TYPES.collaboratorRepository, new CollaboratorRepository());
Container.set<IEmployeeRepository>(TYPES.employeeRepository, new EmployeeRepository());
Container.set<IAccountGroupRepository>(TYPES.accountGroupRepository, new AccountGroupRepository());
Container.set<IFileConnectionHolder<S3>>(TYPES.fileConnectionHolder, new S3FileConnectionHolder());
Container.set<IFile>(TYPES.file, new S3File());

const dBConnectionHolder = Container.get<IDatabaseConnectionHolder<Connection>>(TYPES.dBConnectionHolder);
const authConnectionHolder = Container.get<IAuthConnectionHolder<FirebaseAdmin.App>>(TYPES.authConnectionHolder);
const auth = Container.get<IAuth>(TYPES.auth);
const propertyRepository = Container.get<IPropertyRepository>(TYPES.propertyRepository);
const accountRepository = Container.get<IAccountRepository>(TYPES.accountRepository);
const collaboratorRepository = Container.get<ICollaboratorRepository>(TYPES.collaboratorRepository);
const employeeRepository = Container.get<IEmployeeRepository>(TYPES.employeeRepository);
const accountGroupRepository = Container.get<IAccountGroupRepository>(TYPES.accountGroupRepository);
const fileConnectionHolder = Container.get<IFileConnectionHolder<S3>>(TYPES.fileConnectionHolder);
const file = Container.get<IFile>(TYPES.file);

// For add service
Container.set<IAccountManager>(
  TYPES.accountManager,
  new AccountManager(accountRepository, employeeRepository, collaboratorRepository, auth),
);
const accountManager = Container.get<IAccountManager>(TYPES.accountManager);

export {
  dBConnectionHolder,
  authConnectionHolder,
  propertyRepository,
  auth,
  accountRepository,
  collaboratorRepository,
  employeeRepository,
  accountManager,
  accountGroupRepository,
  fileConnectionHolder,
  file,
};
