import { ApiProperty } from '@nestjs/swagger';
import { ErrorResponse } from './error.response';

export class ErrorPayloadTooLargeResponse extends ErrorResponse<
  413,
  'Payload Too Large'
> {
  /* Status code */
  @ApiProperty({ example: 413 })
  statusCode: 413;

  /* List of broken fields constrains */
  @ApiProperty({
    type: [String],
    example: 'File too large',
  })
  message: string[];

  /* Error name */
  @ApiProperty({ example: 'Payload Too Large' })
  error: 'Payload Too Large';
}
