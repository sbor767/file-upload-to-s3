import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => {
  return {
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    awsS3Bucket: process.env.AWS_S3_BUCKET,
    awsS3Folder: process.env.AWS_S3_FOLDER,
  };
});
