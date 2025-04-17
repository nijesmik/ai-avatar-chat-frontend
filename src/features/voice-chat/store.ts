import { toast } from "sonner";
import { create } from "zustand";

import { useWebSocketStore } from "@/features/websocket";

import { addEventHandler, removeEventHandler } from "./lib/signaling";
import * as send from "./lib/webrtc";

interface MicrophoneState {
  stream: MediaStream | null;
  requestStreamAccess: () => Promise<MediaStream>;
  isMuted: boolean;
  toggleMute: () => void;
}

interface WebRTCState {
  peerConnection: RTCPeerConnection | null;
  connectWebRTC: (stream: MediaStream, socket: Socket) => void;
  disconnectWebRTC: () => void;
}

interface VoiceChatStore extends MicrophoneState, WebRTCState {
  isConnected: boolean;
}

export const useVoiceChatStore = create<VoiceChatStore>((set, get) => ({
  isConnected: false,

  stream: null,
  requestStreamAccess: async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    set({ stream });
    return stream;
  },
  isMuted: false,
  toggleMute: () =>
    set((state) => {
      const { stream, isMuted: prev } = state;
      if (stream === null) {
        return state;
      }
      const isMuted = !prev;
      stream.getAudioTracks()[0].enabled = !isMuted;
      return { isMuted };
    }),

  peerConnection: null,
  connectWebRTC: async (stream, socket) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    stream.getTracks().forEach((track) => {
      console.debug("Track:", track);
      if (track.kind !== "audio") {
        return;
      }
      peerConnection.addTrack(track, stream);
    });

    peerConnection.onicecandidate = send.icecandidate(socket);

    peerConnection.onconnectionstatechange = () => {
      if (peerConnection.connectionState === "connected") {
        set({ isConnected: true });
      }
    };

    try {
      await send.offer(socket, peerConnection);
      addEventHandler.answer(socket, peerConnection);
      addEventHandler.icecandidate(socket, peerConnection);
      addEventHandler.renegotiate(socket, peerConnection);

      set({ peerConnection });
    } catch (e) {
      console.error("Error connecting to WebRTC", e);
      toast.error("서버와 연결하는 중 오류가 발생했습니다.");
      removeEventHandler(socket);
      peerConnection.close();
      stream.getTracks().forEach((track) => track.stop());
    }
  },
  disconnectWebRTC: () => {
    const { peerConnection } = get();
    peerConnection?.close();
    set({ peerConnection: null, isConnected: false });
  },
}));

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
