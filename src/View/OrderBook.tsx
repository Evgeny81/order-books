import React from 'react';
import { currencyPairArray } from '../shared/types';
import { OrderTable } from './Table/OrderTable';
import { ErrorBoundary } from '../shared/ErrorBoundary';
import './OrderBook.css';

export const OrderBook = () => {
  return (
    <div className="order-book">
      {currencyPairArray.map(currencyPair => (
        <div key={currencyPair}>
          <h2>{currencyPair}</h2>
          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <OrderTable currencyPair={currencyPair} />
          </ErrorBoundary>
        </div>
      ))}
    </div>
  );
};
