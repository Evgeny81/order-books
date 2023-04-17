import React, { StrictMode } from 'react';
import ReactDOMClient from 'react-dom/client';

import { OrderBook } from './View/OrderBook';

const container = document.getElementById('root') as Element;

ReactDOMClient.createRoot(container).render(
  <StrictMode>
    <OrderBook />
  </StrictMode>,
);
