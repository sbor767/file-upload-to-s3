import { registerAs } from '@nestjs/config';

export default registerAs('file', () => {
  return {
    allowedExtensions:
      process.env.ALLOWED_FILE_EXTENSIONS.toLowerCase().split(','),
    allowedContentTypes:
      process.env.ALLOWED_CONTENT_TYPES.toLowerCase().split(','),
    maxFileSize: +process.env.MAX_FILE_SIZE || 1024 * 1024,
  };
});
