import React, { useEffect } from 'react';
import { OrderRow } from './OrderRow';
import { OrderBookViewModel } from '../../ViewModel/OrderBookViewModel';
import { ordersSize } from '../../shared/constants';
import { OrdersData } from '../../ViewModel/OrderData';
import './OrderTable.css';

export interface OrderTableProps {
  currencyPair: string;
}

const emptyRow = ['', ''];

const initialOrders = {
  bids: Array.from({ length: ordersSize - 20 }, () => [...emptyRow]),
  asks: Array.from({ length: ordersSize - 20 }, () => [...emptyRow]),
};

export const OrderTable: React.FC<OrderTableProps> = ({ currencyPair }) => {
  const ordersBookData = new OrdersData();
  const viewModel = new OrderBookViewModel({ currencyPair, ordersSize, ordersBookData });

  useEffect(() => {
    return () => {
      viewModel.destroy();
    };
  });
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
          {initialOrders.bids.map((_, index) => (
            <OrderRow
              key={`bids_${index}`}
              direction="buy"
              index={99 - index}
              ordersBookData={ordersBookData}
            />
          ))}
          {initialOrders.asks.map((_, index) => (
            <OrderRow key={`asks_${index}`} direction="sell" index={index} ordersBookData={ordersBookData} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
