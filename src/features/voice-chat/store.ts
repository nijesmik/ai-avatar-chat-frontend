import { create } from "zustand";

import { useAudioStore } from "@/features/audio";
import { getLabel } from "@/features/voice-chat/lib/mic";
import { toast } from "@/shared/ui";

import { ontrack } from "./lib/track";
import * as send from "./lib/webrtc";
import { addEventHandler, removeEventHandler } from "./lib/websocket";

interface MicrophoneState {
  stream: MediaStream | null;
  track: MediaStreamTrack | null;
  label: string;
  requestStreamAccess: () => Promise<void>;
  isMuted: boolean;
  toggleMute: () => void;
}

interface WebRTCState {
  peerConnection: RTCPeerConnection | null;
  connectWebRTC: (socket: Socket) => void;
  disconnectWebRTC: () => void;
  isConnected: boolean;
}

type VoiceChatStore = MicrophoneState & WebRTCState;

export const useVoiceChatStore = create<VoiceChatStore>((set, get) => ({
  isConnected: false,

  stream: null,
  track: null,
  label: "",
  requestStreamAccess: async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const tracks = stream.getAudioTracks();
    console.debug("tracks:", tracks);

    if (!tracks.length) {
      set({ stream });
      toast.error("마이크를 찾을 수 없습니다.");
      return;
    }

    const track = tracks[0];
    track.enabled = false;
    const label = getLabel(track);
    set({ stream, track, label });
  },
  isMuted: true,
  toggleMute: () =>
    set((state) => {
      const { track, isMuted: prev } = state;
      if (track === null) {
        return state;
      }
      const isMuted = !prev;
      track.enabled = !isMuted;
      return { isMuted };
    }),

  peerConnection: null,
  connectWebRTC: async (socket) => {
    const { stream, track } = get();
    if (!stream || !track) {
      toast.error("마이크를 먼저 연결해주세요.");
      return;
    }

    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    peerConnection.addTrack(track, stream);
    peerConnection.onicecandidate = send.icecandidate(socket);
    peerConnection.onconnectionstatechange = () => {
      console.debug("ℹ️ connection state:", peerConnection.connectionState);
      switch (peerConnection.connectionState) {
        case "connected":
          track.enabled = true;
          set({ isConnected: true, isMuted: false });
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
      addEventHandler.message(socket);

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
