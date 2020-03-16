import { createParamDecorator } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';

export interface PaginationParams {
  _limit: number;
  _start: number;
  _order?: 'ASC' | 'DESC' | 1 | -1;
  _sortBy?: string;
  _filter: ObjectLiteral;
}

export const PgParams = createParamDecorator((data, req): PaginationParams => {
  const {
    _limit,
    _start,
    _order,
    _sortBy,
    ..._filter
  } = req.query;

  return {
    _limit: +_limit,
    _start: +_start,
    _order,
    _sortBy,
    _filter,
  };
});