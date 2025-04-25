import { useEffect, useRef } from "react";

import { useAudioStore } from "../store";

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const detectRef = useRef<number>(-1);

  useEffect(() => {
    if (audioRef.current) {
      const { setAudioRef, setDetectRef } = useAudioStore.getState();
      setAudioRef(audioRef);
      setDetectRef(detectRef);
    }

    return () => {
      if (detectRef.current !== -1) {
        cancelAnimationFrame(detectRef.current);
      }
    };
  }, []);

  return <audio ref={audioRef} />;
};
