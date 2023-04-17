# Order Book

This project is a simple order book viewer for cryptocurrency pairs, 
built using React and TypeScript. It connects to the Coinbase exchange 
WebSocket feed to receive real-time order book updates and displays 
the bid and ask orders in a sorted manner.

## Features

- Connects to the Coinbase exchange WebSocket feed for real-time updates
- Displays bid and ask orders in a sorted manner
- Fast update handling using binary search and insertion

## Prerequisites

- Node.js >= 14.x
- npm >= 6.x

## Installation

1. Clone the repository:
`git clone https://github.com/Evgeny81/order-books.git`
2. Change directory to the project folder:
`cd order-books`
3. Install the dependencies:
```
    npm install
```

## Running the project

Start the development server with:
```
    npm start
```

The application should now be running on [http://localhost:8080](http://localhost:8080).
