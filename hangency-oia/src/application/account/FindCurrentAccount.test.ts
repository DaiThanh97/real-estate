import { createAccountTest } from "../../testUtils/createDomainModelTest";
import { mock } from "jest-mock-extended";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { FindCurrentAccount } from "./FindCurrentAccount";

describe("FindCurrentAccount", () => {
  const account = createAccountTest();
  const accountRepository = mock<IAccountRepository>();
  test("should find account by id successfully", async () => {
    const usecase = new FindCurrentAccount(accountRepository);
    accountRepository.findById.mockResolvedValue(account);
    const accountActual = await usecase.execute("Account_ID");
    expect(accountRepository.findById.call.length).toBe(1);
    expect(accountActual.id).toEqual(account.id);
  });
});
