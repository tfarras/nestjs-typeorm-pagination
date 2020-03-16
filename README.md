<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS TypeORM Pagination</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Installation

```bash
npm install @tfarras/nestjs-typeorm-pagination
```


### Pagination Query params

* `_start` - from which row to start on fetch
* `_limit` - how many rows to take
* `_sortBy`? - column for sorting
* `_order`? - order for sorting. Accepted values: `1 | -1 | ASC | DESC`

### Filtration

You can filter your data by passing columns and values as query params.
For the moment we support `Equal` and `In` operator of typeorm.

#### Usage of `Equal`
To filter data with `Equal` operator, you can simply add a parameter like `column=value`

Examples:
<br/>
`id=1` <br/>
`email=farrastaimoor@gmail.com` <br />
`country=MD` 

#### Usage of `In`
To filter data with `In` operator, you can add more than one time parameter like `column=value`

Examples:
<br />
`id=1&&id=2&&id=3` <br />
`country=MD&&country=SE&&country=US`

<hr>

### Usage

Extend your entity from `PaginateableBaseEntity` :
```typescript
@Entity({ name: 'user' })
export class UserEntity extends PaginateableBaseEntity {
```

Add parameter decorator to your controller method :
```typescript
@Get()
getMany(
  @PgParams() pg: PaginationParams,
) {...}
```

And now you're able to use pagination:
```typescript
...
import { PgParams, PaginationParams, Pagination } from '@tfarras/nestjs-typeorm-pagination';

@Get()
getMany(
  @PgParams() pg: PaginationParams,
): Promise<Pagination<UserEntity>> {
  return UserEntity.findAndPaginate(pg);
}
```

Example request:
```
/user?_limit=11&_start=0&_sortBy=id&_order=DESC&id=1&id=2&email=farrastaimoor@gmail.com
```

`Pagination` response: 
```json
{
  "data": [
    {
      "id": 2,
      "email": "farrastaimoor@gmail.com",
      "firstname": "Taimoor",
      "lastname": "Farras",
      "country": "MD",
    }
  ],
  "total": 1,
}
```
