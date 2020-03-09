import { createParamDecorator } from '@nestjs/common';

export interface PaginationParams {
  _end: number;
  _start: number;
  _order?: 'ASC' | 'DESC' | 1 | -1;
  _sort?: string;
}

export const PgParams = createParamDecorator((data, req): PaginationParams => {
  const {
    _end,
    _start,
    _order,
    _sort,
  } = req.query;

  return {
    _end: +_end,
    _start: +_start,
    _order,
    _sort,
  };
});