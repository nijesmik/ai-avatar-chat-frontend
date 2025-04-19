import { create } from "zustand";

type AudioRef = RefObject<HTMLAudioElement | null>;

interface AudioState {
  audioRef: AudioRef;
  audioContext: AudioContext;
  analyser: AnalyserNode;
}

interface AudioAction {
  setAudio: (state: AudioState) => void;
}

type AudioStore = {
  [K in keyof AudioState]: AudioState[K] | null;
} & AudioAction;

export const useAudioStore = create<AudioStore>((set) => ({
  audioRef: null,
  audioContext: null,
  analyser: null,
  setAudio: ({ audioContext, audioRef, analyser }) =>
    set({ audioContext, audioRef, analyser }),
}));
