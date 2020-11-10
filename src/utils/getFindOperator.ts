import { Equal, FindOperator, In, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual } from 'typeorm';

enum ComparatorTypeEnum {
  GREATER_THAN= '>',
  LESS_THAN = '<',
  GREATER_THAN_OR_EQUAL = '>=',
  LESS_THAN_OR_EQUAL = '<=',
  EQUAL = '=',
}

const isCompareSign = char => {
  return Object.values(ComparatorTypeEnum).includes(char as ComparatorTypeEnum);
};

export function getFindOperator(value: any): FindOperator<any> {
  if (Array.isArray(value)) {
    return In(value);
  }

  const compareSign = value
    .substr(0, 2)
    .split('')
    .filter(isCompareSign)
    .join('');

  const realValue = value.substr(compareSign.length);

  switch (compareSign) {
    case ComparatorTypeEnum.GREATER_THAN: {
      return MoreThan(realValue);
    }
    case ComparatorTypeEnum.GREATER_THAN_OR_EQUAL: {
      return MoreThanOrEqual(realValue);
    }
    case ComparatorTypeEnum.LESS_THAN: {
      return LessThan(realValue);
    }
    case ComparatorTypeEnum.LESS_THAN_OR_EQUAL: {
      return LessThanOrEqual(realValue);
    }
    case ComparatorTypeEnum.EQUAL:
    default: {
      return Equal(realValue);
    }
  }
}
