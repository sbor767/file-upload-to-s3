import {
  Controller,
  Headers,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UploadFileResponse } from '../responses/upload.response';
import { ErrorBadRequestResponse } from '../../../common/responses/error.bad-request.response';
import { ErrorPayloadTooLargeResponse } from '../../../common/responses/error.payload-too-large.response';
import { IFileWithTransform } from '../interfaces/file-with-transform.interface';
import { ApiFile } from '../decorators/api-file.decorator';

@Controller('upload-file')
@ApiTags('uploads')
export class UploadFileController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(200)
  @ApiOperation({
    summary: 'Uploads file to S3',
    description:
      'Uploads a file to S3 and resizes it to a specific resolutions if it is an image.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @ApiBadRequestResponse({
    type: ErrorBadRequestResponse,
    description: 'Wrong file extension or Content-type',
  })
  @ApiPayloadTooLargeResponse({
    type: ErrorPayloadTooLargeResponse,
    description: 'File too large',
  })
  uploadFile(@UploadedFile() file: Express.Multer.File): UploadFileResponse[] {
    const { transforms } = (file as IFileWithTransform) || {};
    if (!file || !transforms) {
      throw new BadRequestException('No file chosen');
    }

    return (transforms ? transforms : [file]) as UploadFileResponse[];
  }
}
