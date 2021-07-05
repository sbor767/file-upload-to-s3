import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadFileModule } from './modules/upload-file/upload-file.module';

@Module({
  imports: [ConfigModule.forRoot(), UploadFileModule],
})
export class AppModule {}
