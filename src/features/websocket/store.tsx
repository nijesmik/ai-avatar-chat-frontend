import { io } from "socket.io-client";
import { create } from "zustand";

import { useMessageStore } from "@/entities/message";
import { WEBSOCKET_BASE_URL } from "@/shared/config";
import { toast } from "@/shared/ui";

import { useAvatarStore } from "../avatar";

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

  socket.io.on("reconnect_failed", () => {
    toast.error("서버 연결에 실패했습니다. 네트워크 상태를 확인해주세요.");
  });

  socket.on("connect", () => {
    set({ isConnected: true });
  });

  socket.on("disconnect", () => {
    set({ isConnected: false });
    useAvatarStore.getState().setGender("male");
  });

  socket.on("message-chunk", (chunk: Chunk) => {
    useMessageStore.getState().addMessageChunk(chunk);
  });

  return {
    socket,
    isConnected: false,
  };
});
