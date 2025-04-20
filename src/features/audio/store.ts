import { create } from "zustand";

type AudioRef = RefObject<HTMLAudioElement | null>;

interface AudioState {
  audioRef: AudioRef;
  audioContext: AudioContext;
  analyser: AnalyserNode;
  detectRef: RefObject<number>;
}

interface AudioAction {
  setAudioRef: (audioRef: AudioRef) => void;
  createAudioContext: (stream: MediaStream) => AudioContext;
  setDetectRef: (detectRef: RefObject<number>) => void;
  cancelDetect: () => void;
}

type AudioStore = {
  [K in keyof AudioState]: AudioState[K] | null;
} & AudioAction;

export const useAudioStore = create<AudioStore>((set, get) => ({
  audioRef: null,
  audioContext: null,
  analyser: null,
  detectRef: null,

  setAudioRef: (audioRef) => set({ audioRef }),

  createAudioContext: (stream: MediaStream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    audioContext.createMediaStreamSource(stream).connect(analyser);

    set({ audioContext, analyser });

    return audioContext;
  },

  setDetectRef: (detectRef) => set({ detectRef }),

  cancelDetect: () => {
    const { detectRef } = get();
    if (detectRef && detectRef.current !== -1) {
      cancelAnimationFrame(detectRef.current);
      detectRef.current = -1;
    }
  },
}));
