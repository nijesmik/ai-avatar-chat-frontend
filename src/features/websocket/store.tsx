import { io } from "socket.io-client";
import { toast } from "sonner";
import { create } from "zustand";

import { WEBSOCKET_BASE_URL } from "@/shared/config";

interface WebSocketStore {
  socket: Socket;
}

export const useWebSocketStore = create<WebSocketStore>(() => {
  const socket = io(WEBSOCKET_BASE_URL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 2000,
  });

  socket.io.on("reconnect_failed", () => {
    toast.error("서버 연결에 실패했습니다. 나중에 다시 시도해 주세요.");
  });

  return {
    socket,
  };
});
