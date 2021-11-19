export interface IEmailService {
  send(emails: string[], ccEmails: string[], replyToAddresses: string[],
       {subject, html, text}: { subject: string, html: string; text: string }): Promise<any>;
}
