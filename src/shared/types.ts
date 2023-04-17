export type Order = [price: string, size: string];

export type Direction = 'buy' | 'sell';

export type Changes = [side: Direction, price: string, size: string];

export interface OrderBookState {
  bids: Order[];
  asks: Order[];
}

export const currencyPairArray = ['BTC-USD', 'ETH-USD'] as const;
// export const currencyPairArray = ['BTC-USD'] as const;

export type CurrencyPair = (typeof currencyPairArray)[number];

export type OrderBooks = Record<CurrencyPair, OrderBookState>;

export type ProductUpdate = {
  type: 'l2update';
  product_id: keyof OrderBooks;
  time: string;
  changes: Changes[];
};

export type ProductSnapshot = {
  type: 'snapshot';
  product_id: keyof OrderBooks;
  bids: Order[];
  asks: Order[];
};
