import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "dotenv/config";

const bucketName: string = process.env.BUCKET as string;
const region: string = process.env.REGION as string;
const accessKeyId: string = process.env.ACCESS_KEY_ID as string;
const secretAccessKey: string = process.env.SECRET_ACCESS_KEY as string;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const uploadFile = (
  fileBuffer: Buffer,
  fileName: string,
  mimetype: string
) => {
  try {
    const uploadParams = {
      Bucket: bucketName,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype,
    };
    return s3Client.send(new PutObjectCommand(uploadParams));
  } catch (err) {
    throw err;
  }
};

export const getObjectSignedUrl = async (key: string) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    const seconds = 60 * 60;
    return await getSignedUrl(s3Client, command, { expiresIn: seconds });
  } catch (err) {
    throw err;
  }
};
