import { BadRequestException } from '@nestjs/common';
import { BaseEntity, ObjectType, FindManyOptions } from 'typeorm';
import { PaginationParams } from './pagination.decorator';
import { Pagination } from './pagination.interface';

export abstract class PaginateableBaseEntity extends BaseEntity {

  /**
   * Finds entities that match given find options
   */
  static async findAndPaginate<T extends PaginateableBaseEntity>(
    this: ObjectType<T>,
    pg: PaginationParams,
    options?: FindManyOptions<T> | any,
  ): Promise<Pagination<T>> {
    const entity = this as any;
    const {
      _end,
      _start,
      _order,
      _sort,
    } = pg;
    let query = options;
    const columnExists = entity.getRepository().metadata.findColumnWithPropertyPath(_sort);

    if (_order && _sort && columnExists) {
      query = {
        ...query,
        order: {
          [_sort]: _order,
        }
      }
    }

    if (_start >= 0 && _end > _start) {
      query = {
        ...query,
        take: _end - _start,
        skip: _start,
      }
    } else {
      throw new BadRequestException('Invalid pagination query!');
    }

    const [data, total] = await entity.getRepository().findAndCount(query as any);

    return {
      data,
      total,
    };
  }
}