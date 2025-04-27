import { useCallback } from "react";

import { useWebSocketStore } from "@/features/websocket";
import { toast } from "@/shared/ui";

import { useVoiceChatStore } from "../store";

export const useVoiceChatConnect = () => {
  const socket = useWebSocketStore((state) => state.socket);
  const { disconnectWebRTC } = useVoiceChatStore.getState();

  const disconnect = useCallback(() => disconnectWebRTC(socket), [socket]);

  const connect = useCallback(() => {
    const { isConnected, track, requestStreamAccess, connectWebRTC } =
      useVoiceChatStore.getState();

    if (!track) {
      requestStreamAccess()
        .then(() => {
          connectWebRTC(socket);
        })
        .catch(() => {
          toast.error("마이크 접근 권한을 허용해주세요.");
        });
    } else if (!isConnected) {
      connectWebRTC(socket);
    }
  }, [socket]);

  return { connect, disconnect };
};
