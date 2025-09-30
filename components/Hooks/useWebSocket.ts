// src/components/Hooks/useWebSocket.ts
import { useEffect, useState } from "react";
import webSocketService from "../../services/websocket-service";

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to WebSocket when component mounts
    const connectWebSocket = async () => {
      try {
        await webSocketService.connect();
        setIsConnected(true);
      } catch (error) {
        console.error("WebSocket connection failed:", error);
        setIsConnected(false);
      }
    };

    connectWebSocket();

    // Clean up function to disconnect when component unmounts
    return () => {
      webSocketService.disconnect();
      setIsConnected(false);
    };
  }, []);

  return { isConnected };
}

export default useWebSocket;
