import { Order, ProductUpdate, ProductSnapshot } from '../shared/types';
import { WebSocketHandler } from '../Model/WebSocketHandler';
import { loggerService } from '../Services/LoggerService';
import { notificationService } from '../Services/NotificationService';
import { OrdersData } from './Observer';

interface OrderBookViewModelProps {
  currencyPair: string;
  ordersSize: number;
  ordersBookData: OrdersData;
}

export class OrderBookViewModel {
  private readonly ordersBookData: OrdersData;
  private wsHandler: WebSocketHandler | null;
  private readonly currencyPair: string;
  private readonly ordersSize: number;

  constructor({ currencyPair, ordersSize = 120, ordersBookData }: OrderBookViewModelProps) {
    this.ordersBookData = ordersBookData;
    this.wsHandler = null;
    this.currencyPair = currencyPair;
    this.ordersSize = ordersSize;
    this.init(currencyPair);
  }

  private init(currencyPair: string) {
    const subscribeMessage = {
      type: 'subscribe',
      product_ids: [currencyPair],
      channels: ['level2'],
    };

    const onOpen = () => {
      if (this.wsHandler) {
        this.wsHandler.send(JSON.stringify(subscribeMessage));
      }
    };

    const onMessage = (message: MessageEvent) => {
      const data: ProductUpdate | ProductSnapshot = JSON.parse(message.data);

      if (data.type === 'snapshot') {
        const initialBids = data.bids
          .slice(0, this.ordersSize)
          .sort((a: Order, b: Order) => parseFloat(b[0]) - parseFloat(a[0]));
        const initialAsks = data.asks
          .slice(0, this.ordersSize)
          .sort((a: Order, b: Order) => parseFloat(a[0]) - parseFloat(b[0]));

        this.ordersBookData.addInitialOrders('bids', initialBids);
        this.ordersBookData.addInitialOrders('asks', initialAsks);
      } else if (data.type === 'l2update') {
        this.ordersBookData.handleUpdate(data.changes);
      }
    };

    const onClose = () => {
      loggerService.warn('WebSocket closed');
    };

    const onError = (event: Event) => {
      loggerService.error('WebSocket error:', String(event));
      notificationService.showError('Something went wrong. Please try again later.');
    };

    this.wsHandler = new WebSocketHandler(
      'wss://ws-feed.exchange.coinbase.com',
      onOpen,
      onMessage,
      onClose,
      onError,
    );
  }

  public destroy() {
    if (this.wsHandler) {
      const unsubscribeMessage = {
        type: 'unsubscribe',
        product_ids: [this.currencyPair],
        channels: ['level2'],
      };
      this.wsHandler.send(JSON.stringify(unsubscribeMessage));
      this.wsHandler.close();
    }
  }
}
