export class Observable<T> {
  private observers: Array<(data: T) => void> = [];

  public subscribe(observer: (data: T) => void): (data: T) => void {
    this.observers.push(observer);
    return observer;
  }

  public unsubscribe(observer: (data: T) => void): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }
  public removeObservers(): void {
    this.observers = [];
  }

  public notify(data: T): void {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i](data);
    }
  }
}
