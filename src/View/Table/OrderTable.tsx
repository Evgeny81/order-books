import React from 'react';
import { OrderRow } from './OrderRow';
import { Observable } from '../../shared/Observer';
import { OrderBook } from '../../Model/OrderBook';
import './OrderTable.css';

export interface OrderTableProps {
  orderBookObservable?: Observable<OrderBook>;
}

const emptyRow = ['', ''];

const initialOrders = {
  bids: Array.from({ length: 100 }, () => [...emptyRow]),
  asks: Array.from({ length: 100 }, () => [...emptyRow]),
};
export const OrderTable: React.FC<OrderTableProps> = ({ orderBookObservable }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <td>Price</td>
            <td>Volume</td>
          </tr>
        </thead>
        <tbody>
          {initialOrders.bids.map(([price], index) => (
            <OrderRow
              key={`${price}_${index}`}
              direction="buy"
              index={99 - index}
              orderBookObservable={orderBookObservable}
            />
          ))}
          {initialOrders.asks.map(([price], index) => (
            <OrderRow
              key={`${price}_${index}`}
              direction="sell"
              index={index}
              orderBookObservable={orderBookObservable}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
