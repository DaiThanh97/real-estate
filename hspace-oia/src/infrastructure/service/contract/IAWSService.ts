export interface IBucketParams {
  Bucket: string;
  Key: string;
  Body?: File;
}

export interface IBucketOptions {
  partSize: number;
  queueSize: number;
}

export class SESParam {
  Destination: { CcAddresses: string[]; ToAddresses: string[]; } = {
    CcAddresses: [],
    ToAddresses: []
  };

  Message: {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: string;
      },
      Text: {
        Charset: "UTF-8",
        Data: string;
      }
    },
    Subject: {
      Charset: "UTF-8";
      Data: string;
    }
  } = {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: "",
      },
      Text: {
        Charset: "UTF-8",
        Data: "",
      }
    },
    Subject: {
      Charset: "UTF-8",
      Data: ""
    }
  };

  Source = "";

  ReplyToAddresses: string[] = [];

  constructor(senderEmail: string) {
    this.Source = senderEmail;
  }
}
