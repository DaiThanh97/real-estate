import { EmailTemplateUtilities } from "../../src/domain/utils/EmailTemplateUtilities";

describe("emailTemplate", () => {
  test("emailForEmployeeAccount", async () => {
    const rv = await EmailTemplateUtilities.emailForEmployeeAccount("vinh.nx", "pa$$$word", "https://example.com");
    expect(rv.html).toBeDefined();
    expect(rv.subject).toBeDefined();
    expect(rv.text).toBeDefined();
  });

  test("emailForEmployeeAccount", async () => {
    const rv = await EmailTemplateUtilities.emailForCollaboratorAccount("vinh.nx", "pa$$$word");
    expect(rv.html).toBeDefined();
    expect(rv.subject).toBeDefined();
    expect(rv.text).toBeDefined();
  });

  test("emailForEmployeeAccount", async () => {
    const rv = await EmailTemplateUtilities.emailForChangeIdentityName("vinh.nx");
    expect(rv.html).toBeDefined();
    expect(rv.subject).toBeDefined();
    expect(rv.text).toBeDefined();
  });

  test("emailForEmployeeAccount", async () => {
    const rv = await EmailTemplateUtilities.emailForForgotPassword("vinh.nx");
    expect(rv.html).toBeDefined();
    expect(rv.subject).toBeDefined();
    expect(rv.text).toBeDefined();
  });
});
