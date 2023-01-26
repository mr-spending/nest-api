import { HttpException, HttpStatus } from '@nestjs/common';
import { DirectionEnum } from '../shared/enums/enums';

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

export function sortArrayByProperty(
  arr: any[],
  property: string,
  direction: DirectionEnum,
): any[] {
  const sortedArray = arr.slice();
  return sortedArray.sort((a, b) => {
    if (a[property] < b[property]) {
      return direction === DirectionEnum.Ascending ? -1 : 1;
    }
    if (a[property] > b[property]) {
      return direction === DirectionEnum.Ascending ? 1 : -1;
    }
    return 0;
  });
}
