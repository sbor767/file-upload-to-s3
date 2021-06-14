import { Controller, HttpCode, Post } from '@nestjs/common';
import { UploadFileService } from '../services/upload-file.service';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post()
  @HttpCode(200)
  uploadFile() {
    return this.uploadFileService.uploadFileToS3();
  }
}
