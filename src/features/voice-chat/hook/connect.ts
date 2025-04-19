import { toast } from "sonner";

import { useWebSocketStore } from "@/features/websocket";

import { useVoiceChatStore } from "../store";

export const useVoiceChatConnect = () => {
  const socket = useWebSocketStore((state) => state.socket);
  const isConnected = useVoiceChatStore((state) => state.isConnected);
  const disconnect = useVoiceChatStore((state) => state.disconnectWebRTC);

  const connect = () => {
    const { stream, requestStreamAccess, connectWebRTC } =
      useVoiceChatStore.getState();

    if (!stream) {
      requestStreamAccess()
        .then((stream) => {
          connectWebRTC(stream, socket);
        })
        .catch(() => {
          toast.error("마이크 접근 권한을 허용해주세요.");
        });
    } else if (!isConnected) {
      connectWebRTC(stream, socket);
    }
  };

  return { isConnected, connect, disconnect };
};
