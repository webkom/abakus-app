// src/services/websocket-service.ts
import { QueryClient } from "@tanstack/react-query";
import createQueryString from "../utils/createQueryString";
import { getToken } from "./auth-service";

// WebSocket connection class
class WebSocketService {
  private socket: WebSocket | null = null;

  private queryClient: QueryClient | null = null;

  private baseUrl: string = "wss://ws-staging.abakus.no";

  initialize(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  async connect() {
    if (this.socket) {
      return;
    }

    const token = await getToken();
    if (!token) {
      console.warn("Cannot connect to WebSocket: No authentication token");
      return;
    }

    const qs = createQueryString({
      jwt: token,
    });

    try {
      this.socket = new WebSocket(`${this.baseUrl}?${qs}`);

      this.socket.onopen = this.handleOpen;
      this.socket.onmessage = this.handleMessage;
      this.socket.onclose = this.handleClose;
      this.socket.onerror = this.handleError;
    } catch (error) {
      console.error("WebSocket connection failed:", error);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private handleOpen = () => {
    console.log("WebSocket connected");
  };

  // eslint-disable-next-line no-undef
  private handleMessage = (event: MessageEvent) => {
    if (!this.queryClient) {
      console.warn(
        "QueryClient not initialized, cannot process WebSocket message"
      );
      return;
    }

    try {
      const data = JSON.parse(event.data);
      console.log("WebSocket message received:", data);

      // Check for proper structure
      if (!data.type) {
        console.warn("WebSocket message missing 'type' field:", data);
        return;
      }

      const { type, payload, meta } = data;

      switch (type) {
        case "Event.SOCKET_EVENT_UPDATED":
          console.log(
            "Event updated. Invalidating queries for event ID:",
            payload.id
          );
          // Invalidate both with ID and slug to ensure all queries are refreshed
          this.queryClient.invalidateQueries(["event", payload.id]);
          this.queryClient.invalidateQueries(["event"]); // This will refresh your useEventSlug query
          break;

        case "Event.SOCKET_REGISTRATION_SUCCESS":
        case "Event.SOCKET_REGISTRATION.SUCCESS": // Handle both possible formats
          console.log(
            "Registration successful. Invalidating event queries:",
            meta?.eventId
          );
          // Handle case where eventId might be in different locations
          // eslint-disable-next-line no-case-declarations
          const eventId =
            meta?.eventId || payload?.eventId || payload?.event?.id;
          if (eventId) {
            this.queryClient.invalidateQueries(["event", eventId]);
            this.queryClient.invalidateQueries(["event"]); // Refresh all event queries
          } else {
            // If we can't find a specific event ID, refresh all event queries
            console.log(
              "No eventId found in registration success message. Refreshing all event queries."
            );
            this.queryClient.invalidateQueries(["event"]);
          }
          break;

        case "Event.SOCKET_REGISTRATION_FAILURE":
        case "Event.SOCKET_REGISTRATION.FAILURE":
          console.error(
            "Registration failed:",
            meta?.errorMessage || payload?.errorMessage
          );
          // You might want to show an error message to the user here
          break;

        default:
          console.log("Unhandled WebSocket message type:", type);
      }
    } catch (error) {
      console.error(
        "Error processing WebSocket message:",
        error,
        "Raw data:",
        event.data
      );
    }
  };

  private handleClose = () => {
    console.log("WebSocket disconnected");
    // Optionally implement reconnection logic here
    setTimeout(() => this.connect(), 5000);
  };

  // eslint-disable-next-line class-methods-use-this
  private handleError = (error: Event) => {
    console.error("WebSocket error:", error);
  };
}

// Create a singleton instance
export const webSocketService = new WebSocketService();
export default webSocketService;
