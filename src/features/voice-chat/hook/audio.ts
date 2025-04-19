import { useEffect, useRef } from "react";

import { useVoiceChatStore } from "../store";

export const useVoiceChatAudio = () => {
  const { setAudio } = useVoiceChatStore.getState();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(audioContext.destination);

      setAudio(audioContext, audioRef);
    }
  }, []);

  return { audioRef };
};
