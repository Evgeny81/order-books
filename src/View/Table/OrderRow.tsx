import React, { useEffect } from 'react';
import { TableCell } from './TableCell';
import { Direction } from '../../shared/types';
import { Observable } from '../../shared/Observer';
import { OrderBook } from '../../Model/OrderBook';

interface OrderRowProps {
  direction: Direction;
  index: number;
  orderBookObservable?: Observable<OrderBook>;
}

export const OrderRow: React.FC<OrderRowProps> = ({ direction, index, orderBookObservable }) => {
  const [price, setPrice] = React.useState('');
  const [size, setSize] = React.useState('');

  useEffect(() => {
    if (!orderBookObservable) {
      return;
    }
    const observer = orderBookObservable.subscribe(orderBook => {
      const isBids = direction === 'buy';
      const [newPrice, newSize] = orderBook.getCellData(isBids ? 'bids' : 'asks', index);
      if (price !== newPrice) {
        setPrice(newPrice);
      }
      if (size !== newSize) {
        setSize(newSize);
      }
    });

    return () => {
      orderBookObservable.unsubscribe(observer);
    };
  }, []);
  return (
    <tr className={direction === 'buy' ? 'bids-row' : 'asks-row'}>
      <TableCell cellData={price} />
      <TableCell cellData={size} />
    </tr>
  );
};
