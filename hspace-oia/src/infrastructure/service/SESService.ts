import { SES } from "aws-sdk";
import { SESParam } from "./contract/IAWSService";
import { IEmailService } from "./contract/IEmailService";
import logger from "../logger";

export class SESService implements IEmailService {
  public constructor(private ses: SES, private sender: string) {
  }

  public async send(emails: string[], ccEmails: string[] = [], replyToAddresses: string[] = [],
                    {subject, html, text}: { subject: string, html: string; text: string }): Promise<any> {
    const options: SESParam = new SESParam(this.sender);
    options.Destination.ToAddresses = emails;
    options.Destination.CcAddresses = ccEmails;
    options.ReplyToAddresses = replyToAddresses;
    options.Message.Subject.Data = subject;
    options.Message.Body.Text.Data = text;
    options.Message.Body.Html.Data = html;
    try {
      const result = await this.ses.sendEmail(options).promise();
    } catch (e) {
      logger.error("Halato SESService_send", { error: e, options });
    }
  }
}

