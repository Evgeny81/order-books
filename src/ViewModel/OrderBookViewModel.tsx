import React, { useEffect, cloneElement } from 'react';
import { OrderBook } from '../Model/OrderBook';
import { Changes } from '../shared/types';
import { WebSocketHandler } from '../Model/WebSocketHandler';
import { Observable } from '../shared/Observer';
import { OrderTableProps } from '../View/Table/OrderTable';
import { loggerService } from '../Services/LoggerService';
import {notificationService} from "../Services/NotificationService";

interface OrderBookViewModelProps {
  currencyPair: string;
  children: React.ReactElement<OrderTableProps>;
}
export const OrderBookViewModel = ({ children, currencyPair }: OrderBookViewModelProps) => {
  const orderBook = new OrderBook();
  const orderBookObservable = new Observable<OrderBook>();

  useEffect(() => {
    const subscribeMessage = {
      type: 'subscribe',
      product_ids: [currencyPair],
      channels: ['level2'],
    };

    const unsubscribeMessage = {
      type: 'unsubscribe',
      product_ids: [currencyPair],
      channels: ['level2'],
    };

    const onOpen = () => {
      if (wsHandler) {
        wsHandler.send(JSON.stringify(subscribeMessage));
      }
    };

    const onMessage = (message: MessageEvent) => {
      const data = JSON.parse(message.data);

      if (data.type === 'snapshot') {
        orderBook.bids = data.bids
          .slice(0, 100)
          .sort((a: string, b: string) => parseFloat(b[0]) - parseFloat(a[0]));
        orderBook.asks = data.asks
          .slice(0, 100)
          .sort((a: string, b: string) => parseFloat(a[0]) - parseFloat(b[0]));
        orderBookObservable.notify(orderBook);
      } else if (data.type === 'l2update') {
        data.changes.forEach(([side, price, size]: Changes) => {
          orderBook.add(side, price, size);
        });
        orderBookObservable.notify(orderBook);
      }
    };
    const onClose = () => {
      loggerService.warn('WebSocket closed');
    };
    const onError = (event: Event) => {
      loggerService.error('WebSocket error:', String(event));
      notificationService.showError('Something went wrong. Please try again later.');
    };

    const wsHandler = new WebSocketHandler(
      'wss://ws-feed.exchange.coinbase.com',
      onOpen,
      onMessage,
      onClose,
      onError,
    );

    return () => {
      wsHandler.send(JSON.stringify(unsubscribeMessage));
      wsHandler.close();
      orderBook.clear();
    };
  }, [currencyPair]);

  return cloneElement(children, { orderBookObservable });
};
