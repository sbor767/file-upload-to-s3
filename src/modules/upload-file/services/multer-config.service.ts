import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { ConfigType } from '@nestjs/config';
import * as multerS3 from 'multer-s3-transform';
import * as aws from 'aws-sdk';
import * as slugify from '@sindresorhus/slugify';
import * as sharp from 'sharp';
import * as path from 'path';
import awsConfig from '../../../common/configs/aws.config';
import fileConfig from '../../../common/configs/file.config';
import {
  LARGE_SIZE,
  MEDIUM_SIZE,
  THUMB_SIZE,
} from '../../../common/constants/image.contants';

const getFileExtension = (file: Express.Multer.File) =>
  path.parse(file.originalname)?.ext;

const makeNewFilename = (file: Express.Multer.File) => {
  const filePath = path.parse(file.originalname);
  return (
    slugify(filePath.name, {
      separator: '-',
      lowercase: true,
      decamelize: true,
    }).substring(0, 254 - 12) +
    '--' +
    Math.round(Date.now() / 1000)
  );
};
@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  s3: aws.S3;

  constructor(
    @Inject(fileConfig.KEY)
    private readonly fileConfiguration: ConfigType<typeof fileConfig>,
    @Inject(awsConfig.KEY)
    private readonly awsConfiguration: ConfigType<typeof awsConfig>,
  ) {
    aws.config.update({
      accessKeyId: this.awsConfiguration.awsAccessKeyId,
      secretAccessKey: this.awsConfiguration.awsSecretAccessKey,
    });
    this.s3 = new aws.S3({});
  }

  createMulterOptions(): MulterModuleOptions {
    const fileTransform = (
      id: 'large' | 'medium' | 'thumb',
      toSize: number,
    ) => ({
      id,
      key: (req, file: Express.Multer.File, cb) => {
        cb(
          null,
          path.join(
            this.awsConfiguration.awsS3Folder,
            makeNewFilename(file) + `.${id}.jpg`,
          ),
        );
      },
      transform: (req, file, cb) => {
        cb(null, sharp().resize(toSize, toSize).jpeg());
      },
    });

    return {
      limits: {
        fileSize: this.fileConfiguration.maxFileSize,
      },

      fileFilter: (req, file: Express.Multer.File, cb) => {
        const fileExtension = getFileExtension(file).replace(/^\./, '');
        const { mimetype } = file;
        // Check for allowed file extension and allowed mimetype
        if (
          !this.fileConfiguration.allowedExtensions.includes(fileExtension) ||
          !this.fileConfiguration.allowedContentTypes.includes(mimetype)
        ) {
          cb(
            new BadRequestException('Wrong file extension or Content-type'),
            false,
          );
          return;
        }

        cb(null, true);
      },

      storage: multerS3({
        s3: this.s3,
        bucket: this.awsConfiguration.awsS3Bucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        metadata: (req, file: Express.Multer.File, cb) => {
          cb(null, {
            fieldName: file.fieldname,
          });
        },
        key: (req, file: Express.Multer.File, cb) => {
          const key = path.join(
            this.awsConfiguration.awsS3Folder,
            makeNewFilename(file) + getFileExtension(file),
          );
          cb(null, key);
        },

        // Image transforms
        shouldTransform: (req, file, cb) => {
          cb(null, /^image/i.test(file.mimetype));
        },
        transforms: [
          fileTransform('large', LARGE_SIZE),
          fileTransform('medium', MEDIUM_SIZE),
          fileTransform('thumb', THUMB_SIZE),
        ],
      }),
    };
  }
}
