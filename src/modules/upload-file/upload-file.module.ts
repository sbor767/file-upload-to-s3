import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadFileController } from './controllers/upload-file.controller';
import { MulterConfigService } from './services/multer-config.service';
import fileConfig from '../../common/configs/file.config';
import awsConfig from '../../common/configs/aws.config';

@Module({
  imports: [
    ConfigService,
    ConfigModule.forFeature(fileConfig),
    ConfigModule.forFeature(awsConfig),
    MulterModule.registerAsync({
      imports: [
        ConfigModule.forFeature(fileConfig),
        ConfigModule.forFeature(awsConfig),
      ],
      useClass: MulterConfigService,
      inject: [ConfigService], // OK
    }),
  ],
  controllers: [UploadFileController],
  providers: [MulterConfigService],
})
export class UploadFileModule {}
