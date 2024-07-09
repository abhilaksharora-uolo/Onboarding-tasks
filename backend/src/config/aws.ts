import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "dotenv/config";

export const bucketName: string = process.env.BUCKET as string;
export const region: string = process.env.REGION as string;
export const accessKeyId: string = process.env.ACCESS_KEY_ID as string;
export const secretAccessKey: string = process.env.SECRET_ACCESS_KEY as string;

export const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
