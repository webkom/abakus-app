import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocketEvent } from '../types/websockets';

export const setupWebSocketServer = async (messageCallback: (message: SocketEvent) => void) => {
  const token = await AsyncStorage.getItem('session-token');
  console.log(token);
  const ws = new WebSocket(
    `wss://ws-staging.abakus.no/?jwt=${encodeURIComponent(token?.substring(1, token.length - 1) ?? '')}`
  );

  ws.onopen = () => {
    // alert('WebSocket connection established');
  };

  ws.onerror = (error) => {
    // console.log('WebSocket error: ' + JSON.stringify(error.target));
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data) as SocketEvent;
    console.log(message);
    messageCallback(message);
  };

  return ws;
};
