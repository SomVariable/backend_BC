import { ConfigService } from '@nestjs/config/dist';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadBucketCommand
} from '@aws-sdk/client-s3';
import { s3Config } from '../../configuration/s3.config';
import { ERROR_MESSAGE } from './constants/s3-store.constants';

@Injectable()
export class S3Service {
  private readonly client: S3Client;
  private readonly bucketName: string;
  constructor(private readonly configService: ConfigService) {
    this.client = new S3Client(s3Config());
    this.bucketName = this.configService.get('S3_FOLDER_NAME');
  }

  async createBucket() {
    try {
      const isBucketExist = await this.doesBucketExist(this.bucketName);

      if (isBucketExist) {
        return null;
      }

      const bucket = await this.client.send(
        new CreateBucketCommand({
          Bucket: this.configService.get('S3_FOLDER_NAME'),
        }),
      );

      return bucket;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async doesBucketExist(bucketName: string) {
    try {
      const answer = await this.client.send(
        new HeadBucketCommand({
          Bucket: bucketName,
        }),
      );

      if (answer.$metadata.httpStatusCode === 200) {
        return true;
      }
    } catch (error: any) {
      if (error?.$metadata?.httpStatusCode === 404) {
        return false;
      }

      throw new InternalServerErrorException(error);
    }
  }

  async uploadFile(
    filename: string,
    file: Express.Multer.File,
  ): Promise<string> {
    try {
      await this.createBucket();

      await this.client.send(
        new PutObjectCommand({
          Bucket: this.configService.get('S3_FOLDER_NAME'),
          Key: filename,
          Body: file.buffer,
        }),
      );

      return filename;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getFile(fileName: string) {
    try {
      return await this.client.send(
        new GetObjectCommand({
          Bucket: this.configService.get('S3_FOLDER_NAME'),
          Key: fileName,
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGE);
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.configService.get('S3_FOLDER_NAME'),
          Key: fileName,
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGE);
    }
  }
}
