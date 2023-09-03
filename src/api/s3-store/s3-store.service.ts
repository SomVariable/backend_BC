import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand, CreateBucketCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Config } from '../../configuration/s3.config';
import { ERROR_MESSAGE } from './constants/s3-store.constants';


@Injectable()
export class S3Service {
  private readonly client: S3Client;
  private readonly bucketName = 'user-files'

  constructor() {
    this.client = new S3Client(s3Config)
  }

  async createBucket() {
    try {
      const bucketExists = await this.client.send(new CreateBucketCommand({
        Bucket: this.bucketName
      }));
  
      return bucketExists  
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
    
  }

  async uploadFile(filename:string, file: Express.Multer.File): Promise<string> {
    try {
      await this.createBucket();
      await this.client.send(new PutObjectCommand({
        Bucket: this.bucketName, 
        Key: filename, 
        Body: file.buffer
      }));

      return filename;  
    } catch (error) { 
      throw new InternalServerErrorException(error)
    }  
  }

  async getFile(fileName: string) {
    try {
      return await this.client.send(new GetObjectCommand({
        Bucket: this.bucketName, Key: fileName
      }));
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGE);
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      await this.client.send(new DeleteObjectCommand({Bucket: this.bucketName, Key: fileName}));
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGE);
    }
  }

}
