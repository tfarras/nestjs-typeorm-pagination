import { PaginateableBaseEntity } from './paginateable.entity';

export interface Pagination<T extends PaginateableBaseEntity> {
  data: T[];
  total: number;
}
