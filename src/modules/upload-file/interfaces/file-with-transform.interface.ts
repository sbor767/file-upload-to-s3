import multer from 'multer';
import { UploadFileResponse } from '../responses/upload.response';

export interface IFileWithTransform extends Express.Multer.File {
  transforms?: UploadFileResponse[];
}
