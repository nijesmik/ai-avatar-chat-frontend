import { io } from "socket.io-client";
import { create } from "zustand";

import { WEBSOCKET_BASE_URL } from "@/shared/config";

interface WebSocketStore {
  socket: Socket;
}

export const useWebSocketStore = create<WebSocketStore>(() => ({
  socket: io(WEBSOCKET_BASE_URL),
}));
