import { IFileConnectionHolder } from "./IFileConnectionHolder";
import AWS, { S3 } from "aws-sdk";

export class S3FileConnectionHolder implements IFileConnectionHolder<S3> {
  private s3: S3 | null = null;

  async initialize(): Promise<void> {
    if (this.s3) {
      return;
    }
    this.s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  }

  getInstance(): S3 {
    if (this.s3 === null) {
      throw new Error("Please call initialize() once before calling this method if you can.");
    }
    return this.s3;
  }
}
