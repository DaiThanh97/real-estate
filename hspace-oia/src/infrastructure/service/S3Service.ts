import { S3 } from "aws-sdk";
import { IBucketOptions, IBucketParams } from "./contract/IAWSService";
import { IFileManager } from "./contract/IFileManager";
import { AWSError } from "aws-sdk/lib/error";
import logger from "../logger";

export class S3Service implements IFileManager {
  public constructor(private s3: S3, private bucket: string, private options: IBucketOptions) {
  }

  public async upload(file: File): Promise<any> {
    const key = `${Date.now().toString()}`;
    const params = this.createParams(this.bucket, key, file);
    const rv = { key, url: "" };
    await this.s3.upload(params, this.options).promise().then(res => {
      rv.url = res.Location;
    }).catch(err => {
      logger.error(err);
    });

    return rv;
  }

  public async delete(key: string): Promise<any> {
    const params = this.createParams(this.bucket, key);
    await this.s3.deleteObject(params, (err: AWSError, data: S3.Types.DeleteObjectOutput) => {
      if (err) {
        logger.error(`S3 AWS Error. Key: ${key}`, err);
        logger.error(err.stack);
        return false;
      } else {
        logger.info("S3 delete object output:", data);
      }
    });

    return true;
  }

  private createParams(bucketName: string, key: string, blob?: File): IBucketParams {
    const params = {
      Bucket: bucketName,
      Key: key
    };

    return blob ? {
      ...params,
      Body: blob
    } : params;
  }
}

