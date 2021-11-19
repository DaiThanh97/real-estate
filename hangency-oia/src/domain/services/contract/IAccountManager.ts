import { Collaborator } from "../../models/Collaborator";
import { Account } from "../../models/Account";

export interface IAccountManager {
  createAccountByCollaborator(
    collaborator: Collaborator,
    accountInput: { isActive: boolean; accountAccountGroups: { accountGroupId: string }[] },
    account: Account,
  ): Promise<void>;
}
