import React, { useEffect, useState } from 'react';
import { Direction } from '../../shared/types';
import { Observable } from '../../shared/Observer';
import { OrderBook } from '../../Model/OrderBook';

interface TableCellProps {
  orderBookObservable?: Observable<OrderBook>;
  row: number;
  col: number;
  direction: Direction;
}

export const TableCell: React.FC<TableCellProps> = ({ row, col, direction, orderBookObservable }) => {
  const [cellData, setCellData] = useState<string>('');
  useEffect(() => {
    if (!orderBookObservable) {
      return;
    }
    const observer = orderBookObservable.subscribe(orderBook => {
      const newData = orderBook.getCellData(direction === 'buy' ? 'bids' : 'asks', row, col);
      if (newData !== cellData) {
        setCellData(newData);
      }
    });

    return () => {
      orderBookObservable.unsubscribe(observer);
    };
  }, []);

  return <td>{cellData}</td>;
};
