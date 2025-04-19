import { useEffect, useRef } from "react";

import { useAudioStore } from "../store";

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(audioContext.destination);

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const { setAudio } = useAudioStore.getState();
      setAudio({ audioContext, audioRef, analyser });
    }
  }, []);

  return <audio ref={audioRef} controls />;
};
