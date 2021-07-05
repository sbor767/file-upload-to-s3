import { ApiProperty } from '@nestjs/swagger';
import { ErrorResponse } from './error.response';

export class ErrorBadRequestResponse extends ErrorResponse<400, 'Bad Request'> {
  /* Status code */
  @ApiProperty({ example: 400 })
  statusCode: 400;

  /* List of broken fields constrains */
  @ApiProperty({
    type: [String],
    example: 'Wrong file extension or Content-type',
  })
  message: string[];

  /* Error name */
  @ApiProperty({ example: 'Bad Request' })
  error: 'Bad Request';
}
