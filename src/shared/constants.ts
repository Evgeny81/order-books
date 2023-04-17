/*
 * To have more orders in the store than we need to display,
 * because we need to have a buffer for the case when the order is deleted from the store.
 * */
export const ordersSize = 120;

type Comparator<T> = (a: T, b: T) => number;

export const binaryInsert = <T>(array: T[], value: T, comparator: Comparator<T>): void => {
  const index = binarySearch(array, value, comparator);
  array.splice(index, 0, value);
};
export const binarySearch = <T>(array: T[], value: T, comparator: Comparator<T>): number => {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const compareResult = comparator(array[mid], value);

    if (compareResult === 0) {
      return mid;
    }

    if (compareResult < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};
