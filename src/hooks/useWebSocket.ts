import { useState, useEffect, useRef } from "react";

interface ExchangeRateData {
  price: number | null;
  timestamp: string | null;
  timestampDate: Date | null;
  isConnected: boolean;
  error: string | null;
}

export function useWebSocket() {
  const [data, setData] = useState<ExchangeRateData>({
    price: null,
    timestamp: null,
    timestampDate: null,
    isConnected: false,
    error: null,
  });
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 10;

    const connect = () => {
      if (!isMounted) return;

      // Prevent infinite reconnection attempts
      if (reconnectAttempts >= maxReconnectAttempts) {
        setData((prev) => ({
          ...prev,
          isConnected: false,
          error: "Unable to connect. Please refresh the page.",
        }));
        return;
      }

      try {
        // Close existing connection if any
        if (wsRef.current) {
          wsRef.current.close();
          wsRef.current = null;
        }

        const ws = new WebSocket(
          "ws://stream.tradingeconomics.com/?client=guest:guest"
        );

        ws.onopen = () => {
          if (!isMounted) {
            ws.close();
            return;
          }
          reconnectAttempts = 0; // Reset on successful connection
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
            // Handle both string and array of messages
            let messages;
            if (typeof event.data === "string") {
              messages = JSON.parse(event.data);
            } else {
              messages = event.data;
            }

            // Handle array of messages or single message
            const messageArray = Array.isArray(messages)
              ? messages
              : [messages];

            for (const message of messageArray) {
              // Check if message contains price and timestamp
              if (
                message &&
                typeof message === "object" &&
                message.price !== undefined &&
                message.dt !== undefined
              ) {
                const price = parseFloat(message.price);
                const utcTimestamp = message.dt;

                // Validate price
                if (isNaN(price)) {
                  continue;
                }

                // Convert UTC timestamp to local time with seconds
                const date = new Date(utcTimestamp);
                const localTime = date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                });

                setData({
                  price,
                  timestamp: localTime,
                  timestampDate: date,
                  isConnected: true,
                  error: null,
                });
                break; // Only process first valid message
              }
            }
          } catch {
            // Silently ignore parsing errors for non-data messages
            // The WebSocket may send keepalive or other non-JSON messages
          }
        };

        ws.onerror = () => {
          // Errors are handled by onclose, don't log here to reduce console noise
          if (isMounted) {
            setData((prev) => ({
              ...prev,
              isConnected: false,
              error:
                reconnectAttempts < maxReconnectAttempts
                  ? "Connecting..."
                  : null,
            }));
          }
        };

        ws.onclose = (event) => {
          if (!isMounted) return;

          setData((prev) => ({
            ...prev,
            isConnected: false,
          }));

          // Only reconnect if it wasn't a manual close (code 1000) and we haven't exceeded max attempts
          if (event.code !== 1000 && reconnectAttempts < maxReconnectAttempts) {
            reconnectAttempts++;
            const delay = Math.min(1000 * reconnectAttempts, 5000); // Exponential backoff, max 5s

            reconnectTimeoutRef.current = window.setTimeout(() => {
              if (isMounted) {
                connect();
              }
            }, delay);
          } else if (reconnectAttempts >= maxReconnectAttempts) {
            setData((prev) => ({
              ...prev,
              error: "Unable to connect. Please refresh the page.",
            }));
          }
        };

        wsRef.current = ws;
      } catch {
        if (!isMounted) return;

        reconnectAttempts++;
        setData((prev) => ({
          ...prev,
          isConnected: false,
          error:
            reconnectAttempts < maxReconnectAttempts
              ? "Connecting..."
              : "Failed to connect to exchange rate feed",
        }));

        // Retry connection with exponential backoff
        if (reconnectAttempts < maxReconnectAttempts) {
          const delay = Math.min(1000 * reconnectAttempts, 5000);
          reconnectTimeoutRef.current = window.setTimeout(() => {
            if (isMounted) {
              connect();
            }
          }, delay);
        }
      }
    };

    connect();

    // Cleanup on unmount
    return () => {
      isMounted = false;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close(1000, "Component unmounting");
        wsRef.current = null;
      }
    };
  }, []);

  return data;
}
