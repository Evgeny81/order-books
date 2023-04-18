import { IObserver, IOrdersData } from '../shared/types';

export class Observer implements IObserver {
  private readonly callback: (ordersData: IOrdersData) => void;

  constructor(callback: (ordersBookData: IOrdersData) => void) {
    this.callback = callback;
  }

  public update(ordersData: IOrdersData): void {
    this.callback(ordersData);
  }
}
