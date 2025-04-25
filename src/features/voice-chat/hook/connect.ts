import { useWebSocketStore } from "@/features/websocket";
import { toast } from "@/shared/ui";

import { useVoiceChatStore } from "../store";

export const useVoiceChatConnect = () => {
  const socket = useWebSocketStore((state) => state.socket);
  const disconnect = useVoiceChatStore((state) => state.disconnectWebRTC);

  const connect = () => {
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
  };

  return { connect, disconnect };
};
