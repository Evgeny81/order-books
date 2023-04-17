import React, { useEffect } from 'react';
import { TableCell } from './TableCell';
import { Direction } from '../../shared/types';
import { IOrdersData, Observer } from '../../Model/Observer';

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

    const observer = new Observer(updateData);
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
