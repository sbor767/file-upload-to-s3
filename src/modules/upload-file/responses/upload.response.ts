import { ApiProperty } from '@nestjs/swagger';

export class UploadFileResponse {
  @ApiProperty({
    example: {
      fieldname: 'file',
      originalname: '257k.pdf',
      encoding: '7bit',
      mimetype: 'application/pdf',
      size: 263287,
      bucket: 'finverity-test767',
      key: 'files/257k--1625481164.pdf',
      acl: 'public-read',
      contentType: 'application/pdf',
      contentDisposition: null,
      storageClass: 'STANDARD',
      serverSideEncryption: null,
      metadata: {
        fieldName: 'file',
      },
      location:
        'https://finverity-test767.s3.eu-west-1.amazonaws.com/files/257k--1625481164.pdf',
      etag: '"b8b5b5f86f5513d26c6f09600009a87d"',
    },
  })
  id: string;
  size: number;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition: string;
  storageClass: string;
  metadata: [Object];
  location: string;
  etag: string;
}
