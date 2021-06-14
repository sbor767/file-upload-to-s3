import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadFileService {
  uploadFileToS3() {
    return Promise.resolve('It works');
  }
}
