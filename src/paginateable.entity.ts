import { BadRequestException } from '@nestjs/common';
import { BaseEntity, ObjectType, FindManyOptions, In, Equal } from 'typeorm';
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
      _limit,
      _start,
      _order,
      _sortBy,
      _filter,
    } = pg;
    let query = options;
    const columnExists = entity.getRepository().metadata.findColumnWithPropertyPath(_sortBy);

    if (_order && _sortBy && columnExists) {
      query = {
        ...query,
        order: {
          [_sortBy]: _order,
        }
      }
    }

    if (_start >= 0 && _limit > 0) {
      query = {
        ...query,
        take: _limit,
        skip: _start,
      }
    } else {
      throw new BadRequestException('Invalid pagination query!');
    }

    if (_filter) {
      const toFilter = Object.entries(_filter).filter(([key]) =>
        entity.getRepository().metadata.findColumnWithPropertyPath(key)
      );
      const filterQuery = {};

      toFilter.forEach(([key, value]) => {
        if (Array.isArray(value)) {
          filterQuery[key] = In(value);
        } else {
          filterQuery[key] = Equal(value);
        }
      });

      query = {
        ...query,
        where: {
          ...query.where,
          ...filterQuery,
        }
      }
    }

    const [data, total] = await entity.getRepository().findAndCount(query as any);

    return {
      data,
      total,
    };
  }
}