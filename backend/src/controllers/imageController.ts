import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { bucketName, s3Client } from "../config/aws";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
