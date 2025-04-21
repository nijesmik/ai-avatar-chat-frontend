import { toast } from "sonner";
import { create } from "zustand";

import { useAudioStore } from "@/features/audio";

import { ontrack } from "./lib/track";
import * as send from "./lib/webrtc";
import { addEventHandler, removeEventHandler } from "./lib/websocket";

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
  isConnected: boolean;
}

type VoiceChatStore = MicrophoneState & WebRTCState;

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
      console.debug("ℹ️ connection state:", peerConnection.connectionState);
      switch (peerConnection.connectionState) {
        case "connected":
          set({ isConnected: true });
          break;
        case "failed":
        case "closed":
          useAudioStore.getState().cancelDetect();
      }
    };

    peerConnection.ontrack = ontrack;

    try {
      await send.offer(socket, peerConnection);
      addEventHandler.answer(socket, peerConnection);
      addEventHandler.icecandidate(socket, peerConnection);
      addEventHandler.renegotiate(socket, peerConnection);
      addEventHandler.viseme(socket);

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
    useAudioStore.getState().cancelDetect();
    const { peerConnection } = get();
    peerConnection?.close();
    set({ peerConnection: null, isConnected: false });
  },
}));
