import { Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UploadFileService } from '../services/upload-file.service';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Uploads file to S3',
    description:
      'Uploads a file to S3 and resizes it to a specific resolutions if it is an image.',
  })
  uploadFile() {
    return this.uploadFileService.uploadFileToS3();
  }
}
