import { Module } from '@nestjs/common';
import { UploadFileController } from './controllers/upload-file.controller';
import { UploadFileService } from './services/upload-file.service';

@Module({
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
