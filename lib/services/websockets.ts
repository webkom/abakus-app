import AsyncStorage from '@react-native-async-storage/async-storage';

export const setupWebSocketServer = async () => {
  const token = await AsyncStorage.getItem('session-token');
  const ws = new WebSocket(
    `wss://ws-staging.abakus.no/?jwt=${encodeURIComponent(token?.substring(1, token.length - 1) ?? '')}`
  );

  ws.onopen = () => {
    alert('WebSocket connection established');
  };

  ws.onerror = (error) => {
    console.log('WebSocket error: ' + JSON.stringify(error.target));
  };

  ws.onmessage = (event) => {
    console.log(event.data);
  };

  return ws;
};
