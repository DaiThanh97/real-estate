import { IFile } from "../../application/tools/IFile";
import { fileConnectionHolder } from "../IoC/typeDi.config";
import { logger } from "../IoC/typeDiLogger.config";
import { AWSError } from "aws-sdk/lib/error";
import { S3 } from "aws-sdk";

export class S3File implements IFile {
  private loadS3Config(): {
    s3Options: { partSize: number; queueSize: number };
    bucketName: string;
  } {
    const s3Options = {
      partSize: +process.env.FILE_MAX_LIMIT_UPLOAD_SIZE,
      queueSize: 1,
    };
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    return {
      s3Options,
      bucketName,
    };
  }

  public async upload(file: File): Promise<{ key: string; url: string }> {
    const { s3Options, bucketName } = this.loadS3Config();
    const s3 = fileConnectionHolder.getInstance();
    const key = `${Date.now().toString()}`;
    const params = this.createParams(bucketName, key, file);
    const rv = { key, url: "" };
    await s3
      .upload(params, s3Options)
      .promise()
      .then((res) => {
        rv.url = res.Location;
      })
      .catch((err) => {
        logger.error(`S3 AWS Upload Error.`, err);
      });
    return rv;
  }

  public async delete(key: string): Promise<boolean> {
    const { bucketName } = this.loadS3Config();
    const s3 = fileConnectionHolder.getInstance();
    const params = this.createParams(bucketName, key);
    await s3.deleteObject(params, (err: AWSError, data: S3.Types.DeleteObjectOutput) => {
      if (err) {
        logger.error(`S3 AWS Error. Key: ${key}`, err);
        logger.error(err.stack);
        return false;
      } else {
        logger.info(`S3 delete object output: ${data}`);
      }
    });

    return true;
  }

  private createParams(
    bucketName: string,
    key: string,
    blob?: File,
  ): {
    Bucket: string;
    Key: string;
    Body?: File;
  } {
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    return blob
      ? {
          ...params,
          Body: blob,
        }
      : params;
  }
}
