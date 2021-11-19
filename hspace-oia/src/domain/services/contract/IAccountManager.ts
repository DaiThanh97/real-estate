import { Account, EAccountType } from "../../models/Account";
import { Employee } from "../../models/Employee";
import { ResetToken } from "../../models/ResetToken";
import { Collaborator } from "../../models/Collaborator";

export interface IAccountManager {
  createAccountByEmployee(employee: Employee, currentAccount: Account): Promise<void>;

  generateCredential(payload: any): Promise<Account>;

  sendCredential(account: Account): Promise<any>;

  checkCurrentPassword(password: string, account: Account): Promise<boolean>;

  getHashNewPassword(newPassword: string): Promise<string>;

  getBasicCredentialInfo(account: Account): Promise<any>;

  findAccountByIdentityName(accountType: EAccountType, identityName: string): Promise<any>;

  findResetTokenByIdentityName(identityName: string): Promise<any>;

  validateConfirmForgotPassword(resetToken: ResetToken, code: string, sign: string): Promise<void>

  createForgotPassword(account: Account, email: string, identityName: string): Promise<any>;

  confirmForgotPassword(resetToken: ResetToken, newPassword: string): Promise<void>;

  updateAccountNameByCollaborator(beforeUpdateCollaborator: Collaborator, afterUpdatedCollaborator: Collaborator): Promise<void>;

  updateAccountNameByEmployee(beforeUpdateEmployee: Employee, afterUpdatedEmployee: Employee): Promise<void>;

  createDefaultSettings(accountId: number): Promise<void>;
}
