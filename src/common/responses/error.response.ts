import { ApiProperty } from '@nestjs/swagger';
export class ErrorResponse<T extends number, S extends string> {
  /* Status code */
  statusCode: T;

  /* Error message or list of broken fields constrains */
  message: string | string[];

  /* Error name */
  error: S;
}
