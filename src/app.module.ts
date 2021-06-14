import { Module } from '@nestjs/common';
import { UploadFileModule } from './modules/upload-file/upload-file.module';

@Module({
  imports: [UploadFileModule],
})
export class AppModule {}
