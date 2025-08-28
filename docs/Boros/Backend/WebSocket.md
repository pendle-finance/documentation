# Boros WebSocket

This guide explains how to directly connect to Boros's WebSocket service using Socket.IO client.

## Basic Usage

Here's a complete example of how to connect to and use the WebSocket:

```typescript
import { io } from 'socket.io-client';

// Initialize the socket connection
const socket = io('wss://secrettune.io/pendle-dapp-v3', {
  path: '/socket.io',
  reconnectionAttempts: 5,
  transports: ['websocket']
});
```

## Connection Events

### Handling Connection

```typescript
socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});
```

## Subscribing to Channels

To receive updates, you need to:

1. Subscribe to a channel
2. Listen for updates on that channel

```typescript
// Subscribe to a channel
socket.emit('subscribe', 'orderbook:MARKET_ID:full');

// Listen for updates
socket.on('orderbook:MARKET_ID:full:update', (data) => {
  console.log('Received orderbook update:', data);
});
```

## Cleanup

Always clean up your WebSocket connections when they're no longer needed:

```typescript
function cleanup() {
  // Unsubscribe from channels
  socket.emit('unsubscribe', 'orderbook:MARKET_ID:full');

  // Remove listeners
  socket.off('orderbook:MARKET_ID:full:update');

  // Disconnect
  socket.disconnect();
}
```

## Channel Types

Common channel patterns:

- `orderbook:MARKET_ID:full` - Full orderbook updates
- `orderbook:MARKET_ID:update` - Incremental orderbook updates
- `market-trade:MARKET_ID` - Market trade updates
- `statistics:MARKET_ID` - Market statistics updates

Replace `MARKET_ID` with your specific market identifier.

## Best Practices

1. **Connection Management**

   - Always handle connection errors
   - Implement reconnection logic if needed
   - Clean up connections when no longer needed

2. **Event Handling**

   - Subscribe to channels after connection is established
   - Remove listeners before disconnecting
   - Handle potential errors in data processing

3. **Resource Management**
   - Unsubscribe from channels you no longer need
   - Don't create multiple connections unnecessarily
   - Clean up resources when your application closes

## Example Implementation

Here's a complete example putting it all together:

```typescript
import { io } from 'socket.io-client';

class PendleWebSocket {
  private socket: any;

  constructor() {
    this.socket = io('wss://secrettune.io/pendle-dapp-v3', {
      path: '/socket.io',
      reconnectionAttempts: 5,
      transports: ['websocket']
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }

  public subscribeToMarket(marketId: string) {
    const channel = `orderbook:${marketId}:full`;
    this.socket.emit('subscribe', channel);

    this.socket.on(`${channel}:update`, (data) => {
      console.log(`Received update for ${marketId}:`, data);
    });
  }

  public unsubscribeFromMarket(marketId: string) {
    const channel = `orderbook:${marketId}:full`;
    this.socket.emit('unsubscribe', channel);
    this.socket.off(`${channel}:update`);
  }

  public disconnect() {
    this.socket.disconnect();
  }
}

// Usage example:
const ws = new PendleWebSocket();
ws.subscribeToMarket('YOUR_MARKET_ID');

// Clean up when done
// ws.unsubscribeFromMarket('YOUR_MARKET_ID');
// ws.disconnect();
```

## Error Handling

Always implement proper error handling:

```typescript
socket.on('connect_error', (error) => {
  console.error('Connection failed:', error);
  // Implement your error handling logic
});

socket.on('error', (error) => {
  console.error('Socket error:', error);
  // Implement your error handling logic
});
```
