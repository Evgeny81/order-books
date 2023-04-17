import React from 'react';
import { TableCell } from './TableCell';
import { Direction } from '../../shared/types';
import { Observable } from '../../shared/Observer';
import { OrderBook } from '../../Model/OrderBook';

interface OrderRowProps {
  direction: Direction;
  index: number;
  orderBookObservable?: Observable<OrderBook>;
}

export const OrderRow = ({ direction, index, orderBookObservable }: OrderRowProps) => {
  return (
    <tr className={direction === 'buy' ? 'bids-row' : 'asks-row'}>
      <TableCell orderBookObservable={orderBookObservable} row={index} col={0} direction={direction} />
      <TableCell orderBookObservable={orderBookObservable} row={index} col={1} direction={direction} />
    </tr>
  );
};
