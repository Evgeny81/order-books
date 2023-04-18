import React, { useEffect } from 'react';
import { TableCell } from './TableCell';
import { Direction, IOrdersData } from '../../shared/types';
import { Observer } from '../../ViewModel/Observer';
import { throttle } from '../../shared/constants';

interface OrderRowProps {
  direction: Direction;
  index: number;
  ordersBookData: IOrdersData;
}

export const OrderRow: React.FC<OrderRowProps> = ({ direction, index, ordersBookData }) => {
  const [price, setPrice] = React.useState('');
  const [size, setSize] = React.useState('');

  useEffect(() => {
    const updateData = (ordersData: IOrdersData) => {
      const [newPrice, newSize] = ordersData.getOrder(direction === 'buy' ? 'bids' : 'asks', index);
      if (price !== newPrice) {
        setPrice(newPrice);
      }
      if (size !== newSize) {
        setSize(newSize);
      }
    };
    const throttledUpdateData = throttle(updateData, 400);
    const observer = new Observer(throttledUpdateData);
    ordersBookData.attach(observer);

    return () => {
      ordersBookData.detach(observer);
    };
  }, []);
  return (
    <tr className={direction === 'buy' ? 'bids-row' : 'asks-row'}>
      <TableCell cellData={price} />
      <TableCell cellData={size} />
    </tr>
  );
};
