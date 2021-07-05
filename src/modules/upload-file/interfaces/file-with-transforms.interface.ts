import { UploadFileResponse } from '../responses/upload.response';

export interface IFileWithTransforms extends Express.Multer.File {
  transforms?: UploadFileResponse[];
}
