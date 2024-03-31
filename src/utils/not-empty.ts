// https://stackoverflow.com/a/66316669/4457396

export function notEmpty<TValue>(value: TValue): value is NonNullable<TValue> {
  return value != null;
}

/**
const array: (string | null | undefined)[] = ['foo', 'bar', null, 'zoo', undefined];
const filteredArray: string[] = array.filter(notEmpty);
console.log(filteredArray)
[LOG]: ["foo", "bar", "zoo"]
 */
