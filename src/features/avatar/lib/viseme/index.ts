import { useVisemeStore } from "@/entities/viseme";
import { detectAudioStart } from "@/features/audio";

import { DEFAULT_DURATION } from "../../config";
import { useAvatarStore } from "../../store";
import { shouldApplyViseme } from "./apply-v1";
import { applyViseme } from "./apply-v3";

const setDetectAudio = (audioStartTime: number, lastViseme: Viseme) => {
  const time =
    performance.now() -
    audioStartTime +
    lastViseme.audio_offset +
    DEFAULT_DURATION.hold +
    DEFAULT_DURATION.fall;

  setTimeout(() => detectAudioStart(), time);
};

export const processViseme = () => {
  const start = performance.now();
  const { queue } = useVisemeStore.getState();
  const { avatar, visemeAnimationRef } = useAvatarStore.getState();

  if (!avatar || !visemeAnimationRef) {
    return;
  }

  let prevViseme: VisemeStrict;
  let callback: () => void;

  const process = () => {
    if (queue.isEmpty()) {
      visemeAnimationRef.current = requestAnimationFrame(process);
    } else {
      const viseme = queue.dequeue();
      if (shouldApplyViseme(viseme)) {
        callback = applyViseme({
          avatar,
          current: viseme,
          previous: prevViseme,
          next: queue.peek(),
          audioStartTime: start,
        });
        prevViseme = viseme;
        visemeAnimationRef.current = requestAnimationFrame(process);
      } else {
        queue.clear();
        visemeAnimationRef.current = -1;
        callback();
        // setDetectAudio(start, prevViseme);
      }
    }
  };

  process();
};
