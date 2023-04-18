import { Changes, Direction, IObserver, IOrdersData, Order, OrdersDirection } from '../shared/types';
import { binaryInsert, ordersSize } from '../shared/constants';

export class OrdersData implements IOrdersData {
  private bids: Order[] = [];
  private asks: Order[] = [];
  private observers: IObserver[] = [];

  public attach(observer: IObserver): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observer has been attached already.');
    }
    this.observers.push(observer);
  }

  public detach(observer: IObserver): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.');
    }

    this.observers.splice(observerIndex, 1);
  }

  private notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
  public addInitialOrders(orders: OrdersDirection, data: Order[]): void {
    this[orders] = data;

    this.notify();
  }

  private addOrder(side: Direction, price: string, size: string): void {
    const isBids = side === 'buy';
    const target = isBids ? this.bids : this.asks;
    const index = target.findIndex(([orderPrice]) => orderPrice === price);
    const comparator = isBids
      ? (a: Order, b: Order) => parseFloat(b[0]) - parseFloat(a[0])
      : (a: Order, b: Order) => parseFloat(a[0]) - parseFloat(b[0]);

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

    if (target.length > ordersSize) {
      target.pop();
    }
  }
  public getOrder(ordersDirection: OrdersDirection, row: number): Order {
    const orders = this[ordersDirection];
    if (!orders || !orders[row]) {
      return ['\u00A0', '\u00A0'];
    }
    return orders[row];
  }
  private delete(target: Order[], index: number): void {
    target.splice(index, 1);
  }
  public handleUpdate(data: Changes[]): void {
    data.forEach(([side, price, size]: Changes) => {
      this.addOrder(side, price, size);
    });
    this.notify();
  }
}
