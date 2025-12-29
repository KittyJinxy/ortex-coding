import { useState, useEffect, useRef } from "react";

interface ExchangeRateData {
  price: number | null;
  timestamp: string | null;
  isConnected: boolean;
  error: string | null;
}

export function useWebSocket() {
  const [data, setData] = useState<ExchangeRateData>({
    price: null,
    timestamp: null,
    isConnected: false,
    error: null,
  });
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const connect = () => {
      try {
        const ws = new WebSocket(
          "ws://stream.tradingeconomics.com/?client=guest:guest"
        );

        ws.onopen = () => {
          console.log("WebSocket connected");
          setData((prev) => ({ ...prev, isConnected: true, error: null }));

          // Subscribe to EUR/USD
          const subscribeMessage = {
            topic: "subscribe",
            to: "EURUSD:CUR",
          };
          ws.send(JSON.stringify(subscribeMessage));
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);

            // Check if message contains price and timestamp
            if (message.price !== undefined && message.dt !== undefined) {
              const price = parseFloat(message.price);
              const utcTimestamp = message.dt;

              // Convert UTC timestamp to local time
              const localTime = new Date(utcTimestamp).toLocaleString();

              setData({
                price,
                timestamp: localTime,
                isConnected: true,
                error: null,
              });
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          setData((prev) => ({
            ...prev,
            isConnected: false,
            error: "Connection error. Retrying...",
          }));
        };

        ws.onclose = () => {
          console.log("WebSocket closed");
          setData((prev) => ({
            ...prev,
            isConnected: false,
          }));

          // Attempt to reconnect after 3 seconds
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, 3000);
        };

        wsRef.current = ws;
      } catch (error) {
        console.error("Error creating WebSocket:", error);
        setData((prev) => ({
          ...prev,
          isConnected: false,
          error: "Failed to connect to exchange rate feed",
        }));

        // Retry connection after 3 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 3000);
      }
    };

    connect();

    // Cleanup on unmount
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return data;
}
