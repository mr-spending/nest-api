import { HttpException, HttpStatus } from '@nestjs/common';

export const throwNewError = (error?: any, customStatus?: HttpStatus) => {
  const status = customStatus ?? HttpStatus.BAD_REQUEST;
  const err = error && Object.values(error).length ? error : 'Bad request';
  throw new HttpException(
    {
      status: status,
      error: err,
    },
    status,
    {
      cause: err,
    },
  );
};
