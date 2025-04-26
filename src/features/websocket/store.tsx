import { io } from "socket.io-client";
import { create } from "zustand";

import { WEBSOCKET_BASE_URL } from "@/shared/config";

interface WebSocketStore {
  socket: Socket;
  isConnected: boolean;
}

export const useWebSocketStore = create<WebSocketStore>((set) => {
  const socket = io(WEBSOCKET_BASE_URL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 2000,
  });

  socket.on("connect", () => {
    set({ isConnected: true });
  });

  socket.on("disconnect", () => {
    set({ isConnected: false });
  });

  return {
    socket,
    isConnected: false,
  };
});
