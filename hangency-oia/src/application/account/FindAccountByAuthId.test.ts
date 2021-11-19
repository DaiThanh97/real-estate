import { createAccountTest } from "../../testUtils/createDomainModelTest";
import { mock } from "jest-mock-extended";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { FindAccountByAuthId } from "./FindAccountByAuthId";

describe("FindAccountByAuthId", () => {
  const account = createAccountTest();
  const accountRepository = mock<IAccountRepository>();
  test("should find account by auth successfully", async () => {
    const usecase = new FindAccountByAuthId(accountRepository);
    accountRepository.findByAuthId.mockResolvedValue(account);
    const accountActual = await usecase.execute("Auth_ID");
    expect(accountRepository.findByAuthId.call.length).toBe(1);
    expect(accountActual.id).toEqual(account.id);
  });
});
