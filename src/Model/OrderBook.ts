import { Direction, Order } from '../shared/types';

type Comparator<T> = (a: T, b: T) => number;

function binaryInsert<T>(array: T[], value: T, comparator: Comparator<T>): void {
  const index = binarySearch(array, value, comparator);
  array.splice(index, 0, value);
}
function binarySearch<T>(array: T[], value: T, comparator: Comparator<T>): number {
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
}
export class OrderBook {
  bids: Order[] = [];
  asks: Order[] = [];

  public add(side: Direction, price: string, size: string): void {
    const isBids = side === 'buy';
    const target = isBids ? [...this.bids] : [...this.asks];
    const index = target.findIndex(([orderPrice]) => orderPrice === price);
    const comparator = isBids
      ? (a: [string, string], b: [string, string]) => parseFloat(b[0]) - parseFloat(a[0])
      : (a: [string, string], b: [string, string]) => parseFloat(a[0]) - parseFloat(b[0]);

    const volume = parseFloat(size);
    if (index !== -1) {
      if (volume === 0) {
        this.delete(target, index);
      } else {
        target[index] = [price, size];
      }
    } else {
      if (volume !== 0) {
        binaryInsert<Order>(target, [price, size], comparator);
      }
    }

    if (target.length > 120) {
      target.pop();
    }

    if (isBids) {
      this.bids = [...target];
    } else {
      this.asks = [...target];
    }
  }
  public getCellData(direction: 'bids' | 'asks', row: number, col: number): string {
    const orders = this[direction];
    if (!orders || !orders[row]) {
      return '\u00A0';
    }
    return orders[row][col];
  }
  public delete(target: Order[], index: number): void {
    target.splice(index, 1);
  }

  public clear(): void {
    this.bids = [];
    this.asks = [];
  }
}
